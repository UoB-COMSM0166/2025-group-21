

class Stats {

    constructor() {
        this.maxAirTime = 0;
        this.score = 0;
        this.numJumps = 0;
        this.distanceTraveled = 0;
        this.highestJump = 0;
        this.ufoHits = 0;
        this.backButtonSelected = false;
    }

    gameUpdate() {

        if (domains.game.score.currentAirtime > this.maxAirTime) {
            this.maxAirTime = domains.game.score.currentAirtime
        }
        if (domains.game.score.airtime === 10 && domains.game.player.vel.x > 1) this.numJumps++;

        if (domains.game.score.airtime > 10) {
            let playerHeight = height - domains.game.player.pos.y

            if (playerHeight > this.highestJump) {
                this.highestJump = playerHeight;
            }
        }
    }
    deathUpdate() {
        this.score = domains.game.score.total;
        this.distanceTraveled = domains.game.offset;
    }

    showsStatsScreen() {
        // this.backButtonSelected = false;
        push()
        let size = width/40;
        let d = width - height;
        fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
        rect(0, 0, width, height);
        fill('rgba(0, 0, 0, 0.6)')
        rect(height/6 + d/2, height/6, height*2/3, height*2/3);

        fill(255);
        noStroke();
        textSize(size);
        textAlign(CENTER, CENTER);
        text(`SCORE: ${this.score}`, width/2, height*0.25);
        text(`UFO HITS: ${this.ufoHits}`, width/2, height*0.35);
        text(`MAX AIRTIME: ${round(this.maxAirTime, 3)} s`, width/2, height*0.45);
        text(`TOTAL JUMPS: ${this.numJumps}`, width/2, height*0.55);
        text(`HIGHEST JUMP: ${round(this.highestJump/100)} m`, width/2, height*0.65);
        text(`DISTANCE: ${round(this.distanceTraveled/100, 2)} m`, width/2, height*0.75);

        this.updateBackButton();
        pop();
    }

    updateBackButton() {

        push();
        let scale = 0.0015 * width;
        let size = createVector(backButton.width / scale, backButton.height / scale);
        let pos = createVector(0.5*width, 0.9*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) || this.backButtonSelected) {
            image(backButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                domains.game.death.showStats = false;
                domains.game.death.selectedButtonIndex = -1;
            }
        }
        else {
            image(backButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
}