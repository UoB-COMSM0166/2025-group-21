

class Game {

    constructor() {

        this.offset = 0;  // Horizontal movement of screen position
        this.topMargin = 50;
        this.spacePressed = false
        this.zoom = 1;
        this.tx = 0
        this.ty = 0;
        this.initialDrop = true;
        this.invincibility = false;

        this.terrain = new Terrain();
        this.player = new Player(150, 150);
        this.deathTimer = new Clock();
        this.score = new Score();
        this.pause = new Pause();
    }

    runSimulation() {

        this.adjustZoom();

        push();
        // Scale the game size if they resize the window
        scale(page.gameScale);
        translate(this.tx, this.ty); // Change coordinate origin to player position
        scale(this.zoom); // set screen zoom
        background(135, 206, 250);  // Blue sky


        this.player.drawPlayer()
        this.terrain.drawHills();

        if (!this.pause.active) {
            this.offset += this.player.vel.x;  // Move terrain to the left
            this.player.update();
        }

        pop();

        if (this.pause.active) {
            this.pause.showPauseScreen();
        }

        //if (!this.gamePaused) {

            if ((((this.spacePressed || mouseIsPressed) && this.player.alive) || this.initialDrop) && !this.pause.active) {
                this.getPlayerInput();
            }
            if (this.player.alive) {
                this.score.update();
            }
            else {
                this.runPlayerDeathSequence();
            }
        //}
    }

    adjustZoom() {

        if (this.player.pos.y < this.topMargin) {
            this.zoom = 0.94 / (-this.player.pos.y/height + 1);
            this.ty = this.topMargin - this.zoom * (this.player.pos.y);
            this.tx = 160 - this.zoom * (this.player.pos.x); // 160 seems to work better than 150
        }
        else {
            this.zoom = 1;
            this.tx = this.ty = 0;
        }

    }

    getPlayerInput() {

        if (this.player.pos.y < this.terrain.f(this.player.pos.x)) {
            this.player.vel.y += 0.6;
        }
        else {
            this.player.vel.x += 0.2;
        }
    }

    runPlayerDeathSequence() {

        // Death animation
        if (!this.player.alive) {
            this.zoom = lerp(this.zoom, 1.25, 0.01);
            this.ty = this.player.pos.y - this.zoom * (this.player.pos.y);
            this.tx = 160 - this.zoom * (this.player.pos.x);
        }

        this.deathTimer.tick();

        fill('rgba(255, 40, 0, 0.68)'); // overlay red screen tint
        rect(0, 0, width, height);

        fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
        rect(0, height/2 - 280, width, height/1.8);

        this.score.printEndScore();

        if (this.deathTimer.time > 120) {
            game = null;
        }
    }
}