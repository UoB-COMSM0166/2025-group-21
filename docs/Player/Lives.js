class Lives {

    constructor() {
        this.totalLives = 3;
        this.playingAnimation = false;
        this.tintIntensity = 0;
        this.tintIntensityHasPeaked = false;
    }

    // Return current lives
    getLives() {
        return this.totalLives;
    }

    // Increment current lives and store time
    addLife() {
        this.totalLives++;
        this.timeLifeGained = millis();
    }

    // Decrement current lives and store time
    removeLife() {
        this.totalLives--;
        this.timeLifeLost = millis();
        this.playingAnimation = true;

        if (!domains.game.loseLifeSound.isPlaying() && this.totalLives > 0) {
            domains.game.loseLifeSound.play();
        }
    }

    // Display the life change animation and sounds
    drawChangeLife() {
        let timeLostDif = millis()-this.timeLifeLost;
        let timeGainedDif = millis()-this.timeLifeGained;
        // Flash on and off for 3 seconds
        if (timeLostDif < 3000 && this.totalLives > 0) domains.game.player.lostLife = (timeLostDif % 1000) < 500;
        else domains.game.player.lostLife = false;
        // Flash on and off for 3 seconds
        if (timeGainedDif < 3000 && this.totalLives > 0) domains.game.player.gainedLife = (timeGainedDif % 1000) < 500;
        else domains.game.player.gainedLife = false;
    }

    // Draw the players lives (hearts) in the bottom left corner
    drawLives() {
        // Display total lives
        if (domains.game.player.alive) {
            for (let i = 1; i <= this.totalLives ; i++) {
                image(heartImages[0], -20 + i*50, height-65, heartImages[0].width*0.045, heartImages[0].height*0.045);
            }
        }
    }

    // Play the lose life animation
    playLoseLifeAnimation() {
        push();
        if (this.tintIntensityHasPeaked) {
            this.tintIntensity = lerp(this.tintIntensity, 0, 0.06);

            if (this.tintIntensity < 0.001) {
                this.tintIntensity = 0;
                this.playingAnimation = false;
                this.tintIntensityHasPeaked = false;
            }
        }
        else {
            this.tintIntensity = lerp(this.tintIntensity, 0.9, 0.3);

            if (this.tintIntensity > 0.8) {
                this.tintIntensityHasPeaked = true;
            }
        }
        fill('rgb(122,33,0)')
        fill(`rgba(180, 15, 0, ${this.tintIntensity})`);
        rect(0, 0, width, height);
        pop();
    }
}

if (typeof module !== 'undefined') { module.exports = Lives; }
