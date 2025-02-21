

class Score {

    constructor() {

        this.total = 0
        this.airtime = 0

        this.currentAirtime = 0;
        this.pauseTime = null;
        this.pauseStart = null;
        this.airStartTime = null;
    }

    update() {

        if (!game.initialDrop && !game.pause.active) { // Don't increase score during the fall at the start
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
        let speed = game.player.vel.x;

        if (this.airtime > 50 ) {
            airtimeBonus = 0.02 * this.airtime;
        }
        if (speed > 0) {
            speedBonus = speed * 0.1;
        }
        else {
            speedBonus = 0;
        }
        this.total += Math.round(airtimeBonus + speedBonus);
    }

    trackAirtime() {

        if (game.player.inAir) {

            if (!game.pause.active) {
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

        let size = page.pageWidth/50;
        fill(0);
        textFont('Trebuchet MS');
        textSize(size);
        textAlign(LEFT);
        text(`${round(this.currentAirtime, 3)} s`, 0.65*width, 0.02*height);
    }

    printScore() {

        let size = page.pageWidth/50;
        let formattedScore = String(game.score.total).padStart(10, '0');
        fill(0);
        textFont('Trebuchet MS');
        textSize(size);
        textAlign(CENTER);
        text(`SCORE: ${formattedScore}`, 0.9*width, 0.02*height);
    }
}