

class Stats {

    constructor() {
        this.maxAirTime = 0;
        this.score = 0;
        this.numJumps = 0;
        this.distanceTraveled = 0;
        this.highestJump = 0;

        this.backButton = null;
    }

    gameUpdate() {

        if (game.score.currentAirtime > this.maxAirTime) {
            this.maxAirTime = game.score.currentAirtime
        }
        if (game.score.airtime === 10 && game.player.vel.x > 1) this.numJumps++;

        if (game.score.airtime > 10) {
            let playerHeight = height - game.player.pos.y

            if (playerHeight > this.highestJump) {
                this.highestJump = playerHeight;
            }
        }
    }
    deathUpdate() {
        this.score = game.score.total;
        this.distanceTraveled = game.offset;
    }

    showsStatsScreen() {
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
        text(`SCORE: ${this.score}`, width/2, height*0.3);
        text(`MAX AIRTIME: ${round(this.maxAirTime, 3)} s`, width/2, height*0.4);
        text(`TOTAL JUMPS: ${this.numJumps}`, width/2, height*0.5);
        text(`HIGHEST JUMP: ${round(this.highestJump/100)} m`, width/2, height*0.6);
        text(`DISTANCE TRAVELED: ${round(this.distanceTraveled/100, 2)} m`, width/2, height*0.7);

        if (this.backButton === null) this.backButton = createButton('BACK');

        this.updateBackButton();
        this.backButton.mousePressed(() => this.backButtonPressed());
        pop();
    }

    backButtonPressed() {
        this.backButton.remove();
        this.backButton = null;
        game.death.showStats = false;
    }

    updateBackButton() {

        let textSize = width / 300;
        let numString = textSize.toString() + 'rem'

        this.backButton.position(
            0.1*width,
            0.84*height);

        this.backButton.class('quitButton')
        this.backButton.style('font-size', numString);
        this.backButton.size(width*0.8, height/10);
    }
}