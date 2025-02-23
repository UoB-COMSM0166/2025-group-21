

class Game {

    constructor() {

        // Cheats
        this.invincibility = false;
        this.infiniteFly = false;

        document.body.classList.remove("show-cursor");

        this.offset = 0;  // Horizontal movement of screen position
        this.topMargin = 100; // 50
        this.spacePressed = false // Activates boost
        this.tx = 0
        this.ty = 0;
        this.initialDrop = true;
        this.menuOpen = false;
        //this.menuPauseActive = false;

        this.page = new Page();
        this.terrain = new Terrain();
        this.player = new Player(150, 150);
        this.score = new Score();
        this.pause = new Pause();
        this.stats = new Stats();
        this.UFOHandler = new UFOHandler();
        this.wind = new Wind();
        this.death = null;
        this.menu = new Menu();

        this.fly = inventory.flyLevel > 0 ? new FlyingAbility(inventory.flyLevel) : null;
        this.shield = inventory.forceFieldLevel > 0 ? new ForceField(inventory.forceFieldLevel) : null;
        this.projectile = new ProjectileAbility(inventory.laserLevel);
    }

    runSimulation() { // Main loop for game

        if(this.menuOpen) {
            this.menu.showMenuScreen();
            return;
        }

        this.wind.adjustVolume();
        image(homeBackground, 0, 0, width, height);
        this.page.updateZoom();

        push();
            translate((this.page.pageWidth/2), (this.page.pageHeight/2));
            scale(this.page.getXScale(), this.page.getYScale());
            translate(0, this.page.translateY);
            //translate(this.tx, this.ty); // Separate death translate?
            this.terrain.drawHills();
            this.player.drawPlayer();
            this.projectile.updateProjectiles();
            // this.UFOHandler.updateUFOs();
            // this.UFOHandler.updateExplosions();

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

        if ((this.spacePressed && this.player.alive) || this.initialDrop) {
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

//        if (this.menuPauseActive) {
//            this.menu.showMenuScreen();
//            return;
//        } else if (this.pause.active && this.player.alive) {
//            this.pause.showPauseScreen();
//        } else {
//            this.pause.reset();
//        }

        if(this.player.alive) {
            this.menu.drawMenuButton();
        }

        //this.menu.drawCountdown();
    }


    applyBoostToPlayer() {

        if (this.player.pos.y < this.terrain.f(this.player.pos.x)) {
            this.player.vel.y += 0.6;
        }
        else {
            this.player.vel.x += 0.2;
        }
    }

    handleMenuClick(mx, my) {
        if (!this.menuOpen && mx > 120 && mx < 220 && my > 20 && my < 60) {
            this.menuOpen = true;
            this.menu.showMenuScreen();
        }
    }
}

function mousePressed() {
    game.handleMenuClick(mouseX, mouseY);
}
