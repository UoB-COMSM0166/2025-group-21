

class Score {

    constructor() {

        this.total = 0;
        this.airtime = 0

        this.currentAirtime = 0;
        this.pauseTime = null;
        this.pauseStart = null;
        this.airStartTime = null;
    }

    update() {

        if (domains.game.player.alive && !domains.game.pause.active) {
            this.increment();
        }
        this.trackAirtime();
        this.printScore();

        if (this.currentAirtime > 1) {
            this.printAirtime();
        }
    }

    increment() {

        let airtimeBonus = 0;
        let speedBonus;
        let speed = domains.game.player.vel.x;

        if (this.airtime > 50 ) {
            airtimeBonus = 0.002 * this.airtime;
        }
        if (speed > 0) {
            speedBonus = speed * 0.04;
        }
        else {
            speedBonus = 0;
        }
        this.total += Math.round(airtimeBonus + speedBonus);
    }

    trackAirtime() {

        if (domains.game.player.inAir) {

            if (!domains.game.pause.active) {
                this.airtime++;

                // start new airtime
                if (this.airStartTime === null) {
                    this.airStartTime = millis();
                    this.pauseTime = 0;
                }
                // Game un-paused, update pauseTime
                if (this.pauseStart !== null) {
                    this.pauseTime += millis() - this.pauseStart;
                    this.pauseStart = null;
                }
                // DISPLAYED AIRTIME
                this.currentAirtime = (millis() - this.airStartTime - this.pauseTime) / 1000;
            }
            // Game paused, update pauseStart
            else if (this.pauseStart === null) this.pauseStart = millis();
        }
        else {
            this.airtime = 0;
            this.airStartTime = null;
            this.pauseStart = null;
            this.pauseTime = 0;
            this.currentAirtime = 0;
        }
    }

    printAirtime() {

        let size = width/50;
        fill(0);
        textFont('Trebuchet MS');
        textSize(size);
        textAlign(LEFT, TOP);
        text(`${round(this.currentAirtime, 3)} s`, 0.65*width, 0.02*height);
    }

    printScore() {

        let size = width/50;
        let formattedScore = String(domains.game.score.total).padStart(10, '0');
        fill(0);
        textFont('Trebuchet MS');
        textSize(size);
        textAlign(CENTER, TOP);
        text(`SCORE: ${formattedScore}`, 0.9*width, 0.02*height);
    }
}