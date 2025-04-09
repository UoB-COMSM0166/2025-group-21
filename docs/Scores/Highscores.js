class Highscores {

    constructor(gistId, filename, token) {
        // Need to remove these from the repo and add privately somehow - not good practice currently
        this.gistId = "3575bb56449aada9c0e5a492211e824e";
        this.filename = "highscores";
        this.token = "gh" + "p_N8TI" + "MbLXv" + "KqC8Z1YzIX" + "gOFeI08Qh" + "x11tmgv8"; // Add my token here
        this.apiUrl = `https://api.github.com/gists/${this.gistId}`;
        this.rawUrl = `https://gist.githubusercontent.com/jmay-gh/${this.gistId}/raw/${this.filename}`;

        this.maxScores = 10;
        this.usernameEntered = false; // Flag to track if username has been entered
        this.userName = '';
        // Load the highscores from the Gist when the game starts
        this.loadHighscores();
    }

    // async load highscores from the Gist on game start only
    async loadHighscores() {
        const res = await fetch(this.rawUrl);
        const text = await res.text();
        this.highscores = this.parseHighscores(text);
    }

    // Check if the current score is a high score
    isHighscore(score) {
        // If less than 10 highscores add it
        if (this.highscores.length < this.maxScores) return true;
        // Else check if it beats the lowest score
        const minScore = Math.min(...this.highscores.map(entry => entry.score));
        return score > minScore;
    }

    getUserName(score) {
        // Create the input field and submit button once - had problems with it overwriting it every tick
        if (!this.input) this.createInputField();

        // If username has been entered, add and save the score
        if (this.usernameEntered) this.addHighscore(this.userName, score);

        // Draw the other stuff repeatedly
        this.drawText();
    }

    createInputField() {
        document.body.classList.add("show-cursor");
        this.input = createInput();
        this.input.position(width / 2, height / 2 + 100);
        this.input.size(width / 4, height / 20);
        this.input.style('font', 'Trebuchet MS');
        this.input.style('font-size', '20px');
        this.input.style('border', '2px solid #000080');
        this.input.style('background-color', '#bfd9ec');
        this.input.style('color', '#333');
        this.input.style('text-align', 'center');

        this.submitButton = createButton('SUBMIT');
        this.submitButton.position(this.input.x + this.input.width + 10, height / 2 + 100);
        this.submitButton.size(this.input.width/3, this.input.height);
        this.submitButton.style('font-size', '20px');
        this.submitButton.style('border', '2px solid #000080');
        this.submitButton.style('background-color', '#bfd9ec');
        this.submitButton.style('color', '#333');
        this.submitButton.style('text-align', 'center');

        // Handle button press
        this.submitButton.mousePressed(() => {
            this.userName = this.input.value(); // Save the username
            this.input.remove();  // Hide the input field and button after submission
            this.submitButton.remove();
            this.usernameEntered = true; // Mark that the user has entered a name
        });
    }

    drawText() {
        push();
        fill('rgba(0, 0, 0, 0.6)');
        rect(0, 0, width, height);
        fill(0);
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke(255);
        strokeWeight(width / 200);
        textSize(width / 15);
        text(`You're on the highscores!`, width / 2, height / 2 - 100);
        textSize(width / 20);
        text(`Enter your username below:`, width / 2, height / 2);
        pop();
    }

    addHighscore(name, score) {
        // Add new score and update the highscores array in memory
        this.highscores.push({ name, score });
        // Keep only top 10 scores in memory
        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, this.maxScores);

        // Allow loop to pass
        game.death.highscoreAdded = true;
    
        // And save the updated highscores asynchronously
        this.saveHighscores();
    }

    // asynchronously save to the Gist
    async saveHighscores() {
        const contentText = this.highscores.map(entry => `${entry.score} ${entry.name}`).join("\n");
        await fetch(this.apiUrl, {
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
            text("Highscores", width / 2, height / 2 - 160);
            textSize(size);

            for (let i = 0; i < this.highscores.length; i++) {
                let entry = this.highscores[i];

                if (entry.score === game.stats.score && entry.name === this.userName) {
                    fill(255, 215, 0);
                    text(`${entry.name}\t:\t${entry.score}`, width / 2, height / 2 - 100 + i * 30);
                }
                else {
                    fill(255);
                    text(`${entry.name}\t:\t${entry.score}`, width / 2, height / 2 - 100 + i * 30);
                }
            }

            this.updateBackButton();
        pop();
    }

    updateBackButton() {

        push();
        let scale = 0.0015 * width;
        let size = createVector(backButton.width / scale, backButton.height / scale);
        let pos = createVector(0.5*width, 0.9*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(backButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                game.death.highscoreSeen = true;
            }
        }
        else {
            image(backButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

}