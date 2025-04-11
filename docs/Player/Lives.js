class Lives {

    constructor() {
        this.totalLives = 3;
        this.playingAnimation = false;
        this.tintIntensity = 0;
        this.tintIntensityHasPeaked = false;
    }

    getLives() {
        return this.totalLives;
    }

    addLife() {
        this.totalLives++;
        this.timeLifeGained = millis();
    }

    removeLife() {
        this.totalLives--;
        this.timeLifeLost = millis();
    }

    drawChangeLife() {
        let timeLostDif = millis()-this.timeLifeLost;
        let timeGainedDif = millis()-this.timeLifeGained;

        // Flash on and off for 3 seconds
        if (timeLostDif < 3000 && this.totalLives > 0) game.player.lostLife = (timeLostDif % 1000) < 500;
        else game.player.lostLife = false;

        // Flash on and off for 3 seconds
        if (timeGainedDif < 3000 && this.totalLives > 0) game.player.gainedLife = (timeGainedDif % 1000) < 500;
        else game.player.gainedLife = false;
    }

    drawLives() {
        // Display total lives
        if (game.player.alive) {
            for (let i = 1; i <= this.totalLives ; i++) {
                image(heartImages[0], -20 + i*50, height-65, heartImages[0].width*0.045, heartImages[0].height*0.045);
            }
        }
    }

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
