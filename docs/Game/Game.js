

class Game {

    constructor() {

        this.windSound = null;
        this.laserSound = null;
        this.laserAutomaticSound = null;
        this.explosionSound = null;
        this.deathSound = null;
        this.fishThrow = null;
        this.fishImpactSound = null;
        this.forceFieldSound = null;
        this.snowballSound = null;
        this.freezeSound = null;
        this.arrowSound = null;
        this.ufoArrowImpactSound = null;
        this.loseLifeSound = null;
        this.gainLifeSound = null;
        this.collectCoinSound = null;

        // Cheats
        this.invincibility = settings.enableCheats;
        this.infiniteFly = settings.enableCheats;
        this.cheatsEnabled = settings.enableCheats;

        document.body.classList.remove("show-cursor");
        noStroke();

        this.masterVolume = settings.masterVolume*settings.mute;
        this.soundsLoaded = false;
        this.loadAudio().then(() => this.soundsLoaded = true);

        this.offset = 0;  // Horizontal movement of screen position
        this.topMargin = 100; // 50
        this.spacePressed = false // Activates boost
        this.zoom = 1;
        this.tx = 0
        this.ty = 0;

        this.terrain = new Terrain();
        this.player = new Player(150, this.terrain.generateHills(150));
        this.player.headImg = inventory.getHeadImage();
        this.player.feetImg = inventory.getFeetImage();
        this.score = new Score();
        this.pause = new Pause();
        this.stats = new Stats();
        this.hearts = new Hearts();
        this.coins = new Coins();

        this.highscores = new Highscores();
        this.obstacleHandler = new ObstacleHandler();
        this.wind = null;
        this.death = null;

        this.fly = inventory.flyLevel > 0 ? new FlyingAbility(inventory.flyLevel) : null;
        this.shield = inventory.forceFieldLevel > 0 ? new ForceField(inventory.forceFieldLevel) : null;
        this.projectile = new ProjectileAbility(inventory.laserLevel);

        //---------------------------------------
        this.background = new Background();
        //---------------------------------------
    }

    runSimulation() { // Main loop for game
        if (!this.soundsLoaded) return;

        //--------------------
        clear();
        //--------------------

        this.adjustZoom();
        this.wind.adjustVolume();

        //image(homeBackground, 0, 0, width, height);
        //---------------------------------------
        //image(homeBackground, 0, 0, width, height);
        const floorSpeed = this.pause.active ? 0 : this.player.vel.x;
        this.background.update(floorSpeed, this.zoom);
        this.background.draw( this.zoom, floorSpeed );
        //---------------------------------------

        push();
            translate(this.tx, this.ty); // Change coordinate origin to player position
            scale(this.zoom); // set screen zoom

            this.terrain.drawHills();
            this.player.drawPlayer()
            this.projectile.updateProjectiles();
            this.obstacleHandler.updateObstacles();
            this.obstacleHandler.updateExplosions();

            if (!this.pause.active) {
                this.offset += this.player.vel.x;  // Move terrain to the left
                this.player.update();
            }
            if (this.shield != null && this.shield.active) {
                this.shield.activate();
            }

            // Generate lifeup+ hearts
            this.hearts.update(this.offset);
            this.hearts.checkCollision();

            // Generate coins on the floor
            this.coins.update(this.offset);
            this.coins.checkCollision();
            this.coins.playCoinCollection(this.offset);

        pop();

        if (this.player.lives.playingAnimation) {
            this.player.lives.playLoseLifeAnimation();
        }
        this.player.lives.drawLives();
        this.stats.gameUpdate();

        if (this.spacePressed && this.player.alive && !this.pause.active) {
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

        if (this.pause.isCountingDown) {
            this.pause.showCountdown();
        }
    }

    adjustZoom() {

        if (this.player.pos.y < this.topMargin) {
            this.zoom = 0.86 / (-this.player.pos.y/height + 1); // 0.94
            this.ty = this.topMargin - this.zoom * (this.player.pos.y);
            this.tx = 175 - this.zoom * (this.player.pos.x); // 160 seems to work better than 150
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

    updateCheats() {
        this.invincibility = settings.enableCheats;
        this.infiniteFly = settings.enableCheats

        if (!this.cheatsEnabled && settings.enableCheats) {
            this.cheatsEnabled = true;
        }
    }

    async loadAudio() {
        this.windSound = await soundBoard.getSound('windSound');
        this.laserSound = await soundBoard.getSound('laserSound');
        this.laserAutomaticSound = await soundBoard.getSound('laserAutomaticSound');
        this.explosionSound = await soundBoard.getSound('explosionSound');
        this.deathSound = await soundBoard.getSound('deathSound');
        this.fishThrow = await soundBoard.getSound('fishThrow');
        this.fishImpactSound = await soundBoard.getSound('fishImpactSound');
        this.forceFieldSound = await soundBoard.getSound('forceFieldSound');
        this.snowballSound = await soundBoard.getSound('snowballSound');
        this.freezeSound = await soundBoard.getSound('freezeSound');
        this.arrowSound = await soundBoard.getSound('arrowSound');
        this.ufoArrowImpactSound = await soundBoard.getSound('ufoArrowImpactSound');
        this.loseLifeSound = await soundBoard.getSound('loseLifeSound');
        this.gainLifeSound = await soundBoard.getSound('gainLifeSound');
        this.collectCoinSound = await soundBoard.getSound('coinSound');
        this.wingFlapSound = await soundBoard.getSound('wingFlapSound');
        this.boosterSound    = await soundBoard.getSound('boosterSound');

        setMasterVolume(this.masterVolume);
        this.wind = new Wind();
    }

    disconnectAudio() {

        this.windSound.stop();
        this.laserSound.stop();
        this.laserAutomaticSound.stop();
        this.explosionSound.stop();
        this.deathSound.stop();
        this.fishThrow.stop();
        this.fishImpactSound.stop();
        this.forceFieldSound.stop();
        this.snowballSound.stop();
        this.freezeSound.stop();
        this.arrowSound.stop();
        this.ufoArrowImpactSound.stop();
        this.loseLifeSound.stop();
        this.gainLifeSound.stop();
        this.collectCoinSound.stop();

        this.windSound = null;
        this.laserSound = null;
        this.laserAutomaticSound = null;
        this.explosionSound = null;
        this.deathSound = null;
        this.fishThrow = null;
        this.fishImpactSound = null;
        this.forceFieldSound = null;
        this.snowballSound = null;
        this.freezeSound = null;
        this.arrowSound = null;
        this.ufoArrowImpactSound = null;
        this.loseLifeSound = null;
        this.gainLifeSound = null;
        this.collectCoinSound = null;
    }
}