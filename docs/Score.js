

class Score {

    constructor() {

        this.total = 0
        this.airtime = 0

        this.endScore = createVector(width/2 - 400, height/2 - 200); // position of word 'score' at death
        this.numScore = createVector(width/2 - 400, height/2 + 50 ); // position of number at death

        this.currentAirtime = 0;
        this.pauseTime = null;
        this.pauseStart = null;
        this.airStartTime = null;
    }

    update() {

        if (!game.initialDrop) { // Don't increase score during the fall at the start
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
            this.airStartTime = null;
            this.pauseStart = null;
            this.pauseTime = 0;
            this.currentAirtime = 0;
        }
    }


    printAirtime() {

        fill(0);
        textFont('Trebuchet MS');
        textSize(24);
        text(`${round(this.currentAirtime, 3)} s`, width - 350, 40);
    }

    printScore() {

        let formattedScore = String(game.score.total).padStart(10, '0');
        fill(0);
        textFont('Trebuchet MS');
        textSize(24);
        text(`SCORE: ${formattedScore}`, width - 230, 40);
    }

    printEndScore() {

        this.updateEndScorePrintLocation();

        fill(0);
        textFont('Trebuchet MS');
        textSize(50);
        stroke(255);
        strokeWeight(10);
        text('SCORE', this.endScore.x, this.endScore.y);
        textSize(250);
        textStyle(BOLD);
        //textFont('Courier New');
        text(`${this.total}`, this.numScore.x, this.numScore.y);
        strokeWeight(0);
        textStyle(NORMAL);
    }

    updateEndScorePrintLocation() {
        this.endScore.x -= 0.1;
        this.numScore.x += 1;
    }
}