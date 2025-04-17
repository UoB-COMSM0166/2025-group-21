class Highscores {

    constructor() {
        // Need to remove these from the repo and add privately somehow - not good practice currently
        this.gistId = "3575bb56449aada9c0e5a492211e824e";
        this.filename = "highscores";
        this.token = "gh" + "p_N8TI" + "MbLXv" + "KqC8Z1YzIX" + "gOFeI08Qh" + "x11tmgv8"; // Add my token here
        this.apiUrl = `https://api.github.com/gists/${this.gistId}`;
        this.rawUrl = `https://gist.githubusercontent.com/jmay-gh/${this.gistId}/raw/${this.filename}`;

        this.highscores = [];
        this.maxScores = 10;
        this.usernameEntered = false; // Flag to track if username has been entered
        this.userName = '';
        // Load the highscores from the Gist when the game starts
        this.loadHighscores();

        this.buttonsActive = true;
        this.buttonCooldownTimer = new Clock();
        this.savingScore = false;
    }

    // async load highscores from the Gist on game start only
    async loadHighscores() {
        const res = await fetch(this.rawUrl);
        const text = await res.text();
        this.highscores = this.parseHighscores(text);
    }

    // Check if the current score is a high score
    isHighscore(score) {
        if (domains.game.cheatsEnabled) return false;
        // If less than 10 highscores add it
        if (this.highscores.length < this.maxScores) return true;
        // Else check if it beats the lowest score
        const minScore = Math.min(...this.highscores.map(entry => entry.score));
        return score > minScore;
    }

    getUserName(score) {
        userIsTyping = true;
        this.drawText();
        // Create the input field and submit button once - had problems with it overwriting it every tick
        if (!this.usernameEntered) {
            this.createInputField();
        }
        else {
            userIsTyping = false;
            this.addHighscore(this.userName, score);
        }
        // If username has been entered, add and save the score


    }

    createInputField() {
        this.updateButtonCooldown(4); // limit rate at which backspace is applied when key is held

        document.body.classList.add("show-cursor");
        push();
        imageMode(CENTER);
        let scale = 0.0018 * width;

        image(usernameInputBar, 0.5*width, 0.595*height,
              usernameInputBar.width/scale, usernameInputBar.height/scale);

        if (keyIsDown(BACKSPACE) && this.buttonsActive) {
            this.buttonsActive = false;
            inputCharacter = 'Backspace';
            this.buttonCooldownTimer.tick();
        }
        if (inputCharacter !== null) {
            this.updateUsernameFromInput();
        }
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke(255);
        strokeWeight(width / 400);
        textSize(width / 20);
        textStyle(BOLD);
        text(`${this.userName}`, 0.5*width, 0.6*height);

        this.updateSubmitButton(scale);
        pop();
    }

    updateSubmitButton(scale) {
        let size = createVector(submitButton.width / scale, submitButton.height / scale);
        let pos = createVector(0.5*width, 0.8*height);

        if (hoveringOverButton(pos, size)) {
            image(submitButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && this.userName.length > 0) {
                this.usernameEntered = true;
                userIsTyping = false;
                this.buttonsActive = false;
                this.buttonCooldownTimer.tick();
            }
        }
        else {
            image(submitButton, pos.x, pos.y, size.x, size.y);
        }
    }


    updateUsernameFromInput() {

        if (inputCharacter === 'Backspace') {
            if (this.userName.length > 0) {
                this.userName = this.userName.slice(0, -1);
                inputCharacter = null;
                return;
            }
        }
        else if (inputCharacter === 'Enter') {
            if (this.userName.length > 0) {
                this.usernameEntered = true;
                userIsTyping = false;
                inputCharacter = null;
                return;
            }
        }
        else if (this.userName.length < 15) {
            this.userName = this.userName.concat(inputCharacter);
            this.buttonCooldownTimer.tick();
        }
        inputCharacter = null;
        //console.log(this.userName + ', ' + this.userName.length);
    }

    drawText() {
        push();
        fill('rgba(0, 0, 0, 0.6)');
        rect(0, 0, width, height);
        fill(0);
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke(255);
        strokeWeight(width / 400);
        textStyle(BOLD);
        textSize(width / 15);
        text(`You're on the leaderboard!`, width / 2, height / 3.5);
        textSize(width / 30);
        text(`Enter your username (not your real name)`, width / 2, height / 2.5);
        pop();
    }

    addHighscore(name, score) {
        // Add new score and update the highscores array in memory
        this.highscores.push({ name, score });
        // Keep only top 10 scores in memory
        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, this.maxScores);

        // Allow loop to pass
        domains.game.death.highscoreAdded = true;
    
        // And save the updated highscores asynchronously
        this.saveHighscores();
    }

    // asynchronously save to the Gist
    async saveHighscores() {
        const contentText = this.highscores.map(entry => `${entry.score} ${entry.name}`).join("\n");

        try {
            const response = await fetch(this.apiUrl, {
                method: "PATCH",
                headers: {
                    "Authorization": `token ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    files: {
                        [this.filename]: {
                            content: contentText
                        }
                    }
                })
            });
            if (!response.ok) {
                console.log("SAVE ERROR: ", response.status, response.statusText);
                return;
            }
            const freshUrl = `${this.apiUrl}?cacheBuster=${new Date().getTime()}`;
            fetch(freshUrl).then(response => response.json())
                .then(data => {
                    if (data.files && data.files[this.filename] && data.files[this.filename].content === contentText) {
                        console.log("Score saved successfully");
                    } else {
                        console.log("Error saving score");
                    }
                });
        }
        catch (error) {
            console.error("Error saving score: ", error);
        }
        finally {
            this.savingScore = false;
        }
    }

    parseHighscores(text) {
        return text
            .trim()
            .split("\n")
            .map(line => {
                const [score, ...nameParts] = line.trim().split(" ");
                return {
                    score: parseInt(score),
                    name: nameParts.join(" ")
                };
            })
            .filter(entry => !isNaN(entry.score));
    }

    // Print highscores from in-memory array
    printHighscores() {
        push();
            let size = width/40;
            let d = width - height;
            fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
            rect(0, 0, width, height);
            fill('rgba(0, 0, 0, 0.6)')
            rect(height/6 + d/2, height/6, height*2/3, height*2/3);
            fill(255);
            textSize(size*2);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            text("HIGHSCORES", width / 2, height / 4.2);
            textSize(size);
            textStyle(NORMAL);


        for (let i = 0; i < this.highscores.length; i++) {
                let entry = this.highscores[i];

                if (entry.score === domains.game.stats.score && entry.name === this.userName) {
                    fill(255, 215, 0);
                    text(`${entry.name}\t:\t${entry.score}`, width / 2, height / 2 - 130 + i * 37.5);
                }
                else {
                    fill(255);
                    text(`${entry.name}\t:\t${entry.score}`, width / 2, height / 2 - 130 + i * 37.5);
                }
            }
            this.updateBackButton();
        pop();
    }

    updateBackButton() {

        push();
        this.updateButtonCooldown(30); // necessary as submit button is in same location as back button
        let scale = 0.0015 * width;
        let size = createVector(backButton.width / scale, backButton.height / scale);
        let pos = createVector(0.5*width, 0.9*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(backButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive) {
                domains.game.death.highscoreSeen = true;
            }
        }
        else {
            image(backButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateButtonCooldown(cooldown) {

        if (this.buttonCooldownTimer.time > 0) {
            this.buttonCooldownTimer.tick();
        }
        if (this.buttonCooldownTimer.time > cooldown) {
            this.buttonCooldownTimer.reset();
            this.buttonsActive = true
        }
    }
}
