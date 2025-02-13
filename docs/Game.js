

class Game {

    constructor() {

        document.body.classList.remove("show-cursor");

        this.offset = 0;  // Horizontal movement of screen position
        this.topMargin = 50;
        this.spacePressed = false // Activates boost
        this.zoom = 1;
        this.tx = 0
        this.ty = 0;
        this.initialDrop = true;
        this.invincibility = false;

        this.terrain = new Terrain();
        this.player = new Player(150, 150);
        this.score = new Score();
        this.pause = new Pause();
        this.death = null;
    }

    runSimulation() { // Main loop for game

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

        if (this.pause.active && this.player.alive) this.pause.showPauseScreen();
        else this.pause.reset();

        if ((((this.spacePressed || mouseIsPressed) && this.player.alive) || this.initialDrop) && !this.pause.active) {
            this.getPlayerInput();
        }
        if (this.player.alive) {
            this.score.update();
        }
        else {
            if (this.death === null) this.death = new Death();
            this.death.runPlayerDeathSequence();
        }
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
}