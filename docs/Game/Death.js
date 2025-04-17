

class Death {

    constructor(type) {
        if (domains.game.laserAutomaticSound.isPlaying()) {
            domains.game.laserAutomaticSound.stop();
        }
        domains.game.deathSound.play();
        domains.game.player.alive = false;
        domains.game.stats.deathUpdate();
        this.type = type;
        this.deathTimer = new Clock();
        this.showStats = false;
        this.coinsEarned = null;
        this.coinsAddedToInventory = false;
        this.skipCoinCount = false;
        this.currentY = domains.game.player.pos.y;
        this.pos = createVector(domains.game.player.pos.x - width/100, domains.game.player.pos.y - width/100);
        this.slope = atan2(domains.game.player.vel.y, domains.game.player.vel.x);

        this.redTint = 0.68;
        this.blackTintHeight = null;
        this.blackTintY = null;

        this.endScore = createVector(width/5, height/5 + height/30); // position of word 'score' at death
        this.numScore = createVector(width/7.5, height/2.8); // position of number at death

        this.progressSaved = false;
    }

    runPlayerDeathSequence() {

        // Death animation
        if (this.deathTimer.time < 180) {
            this.showFinalScore();
        }
        else if (this.deathTimer.time < 230) {
            this.displayCoinReward();
        }
        // Check if they broke a highscore, then add them and display highscores
        else if (!this.highscoreAdded) {
            // Check if they got a highscore, get username if so, else break out
            if (domains.game.highscores.isHighscore(domains.game.stats.score)) {
                domains.game.highscores.savingScore = true;
                domains.game.highscores.getUserName(domains.game.stats.score);
            }
            else {
                this.highscoreAdded = true;
                this.highscoreSeen = true;
            }
        }
        else if (domains.game.highscores.savingScore) {
            push();
            textAlign(CENTER, CENTER);
            textSize(width/20);
            strokeWeight(width/120);
            stroke(0);
            fill(255);
            text('SAVING SCORE...', width/2, height/2);
            pop();
        }
        else if (!this.highscoreSeen) {
            // If they did get a highscore, show where they are on the list
            domains.game.highscores.printHighscores();
        }
        else if (!this.showStats) {

            if (!this.coinsAddedToInventory) {
                this.coinsAddedToInventory = true;
                inventory.coins += Math.round(this.coinsEarned);
            }
            this.showDeathScreen();
        }
        else domains.game.stats.showsStatsScreen();
    }

    displayCoinReward() {

        push();
            fill('rgba(0, 0, 0, 0.6)');
            rect(0, 0, width, height);
            fill(0);

            if (this.skipCoinCount) {
                this.skipCoinCount = false;
                this.coinsEarned = domains.game.score.total/11 + domains.game.coins.totalCoinsCollected;
            }
            else this.coinsEarned = lerp(this.coinsEarned,
                            domains.game.score.total/11 + domains.game.coins.totalCoinsCollected, 0.02);

            let size = width/8;
            fill(228, 221, 0);
            textFont('Trebuchet MS');
            textAlign(CENTER, CENTER);
            stroke(0);
            strokeWeight(size/10);
            textSize(size);
            text(`+ ${round(this.coinsEarned)} coins`, width/2, height/2);
            noStroke();
        pop();

        if (this.coinsEarned * 11 >= domains.game.score.total-0.5) {
            this.deathTimer.tick();
        }
    }

    showFinalScore() {

        push();
        domains.game.zoom = lerp(domains.game.zoom, 1.25, 0.01);
        domains.game.ty = domains.game.player.pos.y - domains.game.zoom * (domains.game.player.pos.y);
        domains.game.tx = 160 - domains.game.zoom * (domains.game.player.pos.x);

            this.deathTimer.tick();

            if (this.deathTimer.time > 110) {
                this.redTint = lerp(this.redTint, 0, 0.05);
            }
            fill(`rgba(255, 40, 0, ${this.redTint})`); // overlay red screen tint
            rect(0, 0, width, height);

            if (this.blackTintHeight === null) {
                this.blackTintHeight = height*3/5;
                this.blackTintY = height/5;
            }
            if (this.deathTimer.time > 110) {
                this.blackTintY = lerp(this.blackTintY, 0, 0.1);
                this.blackTintHeight = lerp(this.blackTintHeight, height, 0.1);
            }
            fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
            rect(0, this.blackTintY, width, this.blackTintHeight);

            this.printScore();
        pop();
    }

    printScore() {
        let size = width/4;

        this.updateEndScorePrintLocation();

        fill(0);
        textFont('Trebuchet MS');
        textSize(size/5);
        stroke(255);
        strokeWeight(size/25);
        text('SCORE', this.endScore.x, this.endScore.y);
        textSize(size);
        textStyle(BOLD);
        textAlign(LEFT);
        //textFont('Courier New');
        text(`${domains.game.score.total}`, this.numScore.x, this.numScore.y);
        strokeWeight(0);
        textStyle(NORMAL);
    }

    updateEndScorePrintLocation() {
        let size = width;

        if (this.deathTimer.time < 110) {
            this.endScore.x -= 0.0001*size;
            this.numScore.x += 0.001*size;
        }
        else {
            this.endScore.x -= 0.05*size;
            this.numScore.x += 0.07*size;
        }
    }

    showDeathScreen() {
        if (!this.progressSaved) {
            saveGameProgress();
            this.progressSaved = true;
        }
        fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
        rect(0, 0, width, height);

        document.body.classList.add("show-cursor");
        this.updateShopButton();
        this.updatePlayButton();
        this.updateStatsButton();
    }

    updateShopButton() {

        push();
        let scale = 0.0015 * width;
        let size = createVector(returnToWorkshopButton.width / scale, returnToWorkshopButton.height / scale);
        let pos = createVector(0.5*width, 0.5*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(returnToWorkshopButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                domains.game.disconnectAudio();
                //game.dispose();
                domains.game = null;
                Domain = 'shop';
            }
        }
        else {
            image(returnToWorkshopButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
    updatePlayButton() {

        push();
        let scale = 0.0015 * width;
        let size = createVector(playAgainButton.width / scale, playAgainButton.height / scale);
        let pos = createVector(0.5*width, 0.3*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(playAgainButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                domains.game.disconnectAudio();
                //soundBoard.disposeAll();
                //game.dispose();
                domains.game = null;
            }
        }
        else {
            image(playAgainButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
    updateStatsButton() {

        push();
        let scale = 0.0015 * width;
        let size = createVector(statsButton.width / scale, statsButton.height / scale);
        let pos = createVector(0.5*width, 0.7*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(statsButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.showStats = true;
            }
        }
        else {
            image(statsButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
}