class Lives {

    constructor() {
        this.totalLives = 3;
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
        for (let i = 1; i <= this.totalLives ; i++) {
            image(heartImages[0], -20 + i*50, height-65, 50, 50);
        }
    }
}
