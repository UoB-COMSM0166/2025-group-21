

class Score {

    constructor() {

        this.total = 0
        this.airtime = 0

        this.endScore = createVector(width/2 - 400, height/2 - 200); // position of word 'score' at death
        this.numScore = createVector(width/2 - 400, height/2 + 50 ); // position of number at death

        this.startAirtime = 0;
        this.currentAirtime = 0;

    }

    increment() {

        let airtimeBonus = 0;
        let speedBonus;
        let speed = player.vel.x;

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

        if (player.inAir) {
            this.airtime++;
        }
        else {
            this.airtime = 0;
            this.currentAirtime = 0;
        }

        if (this.airtime === 5) {
            this.startAirtime = Date.now();
        }
        else if (this.airtime > 5) {
            this.currentAirtime = (Date.now() - this.startAirtime) / 1000;
        }
    }

    printAirtime() {

        fill(0);
        textFont('Trebuchet MS');
        textSize(24);
        text(`${this.currentAirtime} s`, width - 350, 40);
    }

    printScore() {

        let formattedScore = String(score.total).padStart(10, '0');
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