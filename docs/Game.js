

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
        this.UFOHandler = new UFOHandler();
        this.wind = new Wind();
        this.death = null;

        this.fly = inventory.flyLevel > 0 ? new FlyingAbility(inventory.flyLevel) : null;
        this.shield = inventory.forceFieldLevel > 0 ? new ForceField(inventory.forceFieldLevel) : null;
        this.projectile = new ProjectileAbility(inventory.laserLevel);

        //---------------------------------------
        this.background = new Background();
        //---------------------------------------
    }

    runSimulation() { // Main loop for game

        //--------------------
        clear();
        //--------------------

        this.adjustZoom();
        this.wind.adjustVolume();



        push();
            //---------------------------------------
            //image(homeBackground, 0, 0, width, height);
            this.background.update(this.player.vel.x, this.zoom);

            // 2) Draw the new parallax layers
            this.background.draw(this.zoom);
            //---------------------------------------
            // Scale the game size if they resize the window
            scale(page.gameScale);
            translate(this.tx, this.ty); // Change coordinate origin to player position
            scale(this.zoom); // set screen zoom

            this.terrain.drawHills();
            this.player.drawPlayer()
            this.projectile.updateProjectiles();
            this.UFOHandler.updateUFOs();
            this.UFOHandler.updateExplosions();

            if (!this.pause.active) {
                this.offset += this.player.vel.x;  // Move terrain to the left
                this.player.update();
            }
            if (this.shield != null && this.shield.active) {
                this.shield.activate();
            }

        pop();

        this.player.lives.drawLives();
        this.stats.gameUpdate();

        if (((this.spacePressed && this.player.alive) || this.initialDrop) && !this.pause.active) {
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
            if (this.shield != null) {
                this.shield.charge();
                this.shield.drawChargeBar();
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
}