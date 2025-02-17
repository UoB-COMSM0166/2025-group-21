

class Game {

    constructor() {

        // Cheats
        this.invincibility = false;
        this.infiniteFly = false;

        document.body.classList.remove("show-cursor");

        this.offset = 0;  // Horizontal movement of screen position
        this.topMargin = 100; // 50
        this.spacePressed = false // Activates boost
        this.zoom = 1;
        this.tx = 0
        this.ty = 0;
        this.initialDrop = true;

        this.terrain = new Terrain();
        this.player = new Player(150, 150);
        this.score = new Score();
        this.pause = new Pause();
        this.stats = new Stats();
        this.death = null;
        this.UFOs = [];
        this.explosions = [];

        this.fly = inventory.flyLevel > 0 ? new FlyingAbility(inventory.flyLevel) : null;
        this.laser = inventory.laserLevel > 0 ?  new LaserAbility(inventory.laserLevel) : null;
    }

    runSimulation() { // Main loop for game

        this.adjustZoom();

        push();
            // Scale the game size if they resize the window
            scale(page.gameScale);
            translate(this.tx, this.ty); // Change coordinate origin to player position
            scale(this.zoom); // set screen zoom
            background(135, 206, 250);  // Blue sky

            this.terrain.drawHills();
            this.player.drawPlayer()
            if (this.laser != null) this.laser.updateLasers();

            if (!this.pause.active) {
                this.offset += this.player.vel.x;  // Move terrain to the left
                this.player.update();
                this.updateUFOs();
                this.updateExplosions();
            }
        pop();

        this.stats.gameUpdate();

        if ((((this.spacePressed || mouseIsPressed) && this.player.alive) || this.initialDrop) && !this.pause.active) {
            this.applyBoostToPlayer();
        }

        if (this.death === null) {
            this.score.update();

            if (this.fly != null) {
                this.fly.charge();

                if (this.fly.active) {
                    //this.fly.glide(); // apply upward force equal to gravity
                    this.fly.applyUpwardForce(); // greater then gravity
                }
            }
        }
        else {
            this.death.runPlayerDeathSequence();
        }

        if (this.pause.active && this.player.alive) this.pause.showPauseScreen();
        else this.pause.reset();
    }

    adjustZoom() {

        if (this.player.pos.y < this.topMargin) {
            this.zoom = 0.86 / (-this.player.pos.y/height + 1); // 0.94
            this.ty = this.topMargin - this.zoom * (this.player.pos.y);
            this.tx = 160 - this.zoom * (this.player.pos.x); // 160 seems to work better than 150
        }
        else {
            this.zoom = 1;
            this.tx = this.ty = 0;
        }
    }

    applyBoostToPlayer() {

        if (this.player.pos.y < this.terrain.f(this.player.pos.x)) {
            this.player.vel.y += 0.6;
        }
        else {
            this.player.vel.x += 0.2;
        }
    }

    updateUFOs() {

        if (this.zoom < 0.8 && Math.random() > 0.975) {
            this.UFOs.push(new UFO(this.player.pos.y + 0.3*(height - this.player.pos.y)*Math.random() + 50));
        }

        for (let i=0; i<this.UFOs.length; i++) {
            this.UFOs[i].updatePosition();
            this.UFOs[i].drawUFO();

            // UFO crosses barrier slightly beyond edge of screen
            if (this.UFOs[i].pos.x < -200/game.zoom || this.UFOs[i].pos.x > width/game.zoom ||
                (this.UFOs[i].pos.y < game.player.pos.y - 10*game.topMargin/game.zoom && game.zoom < 1) ||
                (this.UFOs[i].pos.y < -500 && game.zoom === 1) ||
                this.UFOs[i].pos.y > height/game.zoom) {

                this.UFOs.splice(i, 1);
            }
        }
        this.checkForPlayerUFOCollision();
    }
    checkForPlayerUFOCollision() {

        for (let u=0; u<game.UFOs.length; u++) {

            if (game.UFOs[u] !== undefined) {

                let dx = abs(game.player.pos.x - game.UFOs[u].pos.x);
                let dy = abs(game.player.pos.y - game.UFOs[u].pos.y);

                if (Math.sqrt(dx**2 + dy**2) < 50) {
                    game.explosions.push(new Explosion(game.UFOs[u].pos));
                    game.UFOs.splice(u, 1);
                    game.death = new Death('UFO');
                    game.player.vel.x = -0.5;
                    game.player.vel.y = 0;
                }
            }
        }
    }

    updateExplosions() {

        for (let i=0; i<this.explosions.length; i++) {

            if (this.explosions[i].explosionComplete) {
                this.explosions.splice(i, 1);
            }
            else this.explosions[i].explode();
        }
    }
}