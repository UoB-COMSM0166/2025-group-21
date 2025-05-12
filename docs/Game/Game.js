class Game {

    constructor() {
        this.bgMusic = null;
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
        this.highscores = new Highscores();
        this.wingFlapSound = null;

        // Cheats
        this.invincibility = settings.enableCheats;
        this.infiniteFly = settings.enableCheats;
        this.cheatsEnabled = settings.enableCheats;

        document.body.classList.remove("show-cursor");
        noStroke();

        this.wind = null;
        this.music = null;
        this.masterVolume = settings.masterVolume*settings.mute;
        this.soundsLoaded = false;

        this.loadAudio().then(() => {
            this.soundsLoaded = true
            setMasterVolume(this.masterVolume);
            this.wind = new Wind();
            this.music = new BackgroundMusic();
        });

        this.offset = 0;  // Horizontal movement of screen position
        this.topMargin = 100; // 50
        this.spacePressed = false // Activates boost
        this.zoom = 1;
        this.tx = 0
        this.ty = 0;

        this.terrain = new Terrain();
        this.player = new Player(150, this.terrain.generateHills(150), width);
        this.player.headImg = inventory.getHeadImage();
        this.player.feetImg = inventory.getFeetImage();
        this.player.wingImg = inventory.getWingImage();
        this.score = new Score();
        this.pause = new Pause();
        this.stats = new Stats();
        this.hearts = new Hearts();
        this.coins = new Coins();

        this.obstacleHandler = new ObstacleHandler();
        this.wind = null;
        this.death = null;

        this.fly = inventory.currentFlyItem > 0 ? new FlyingAbility(inventory.currentFlyItem) : null;
        this.shield = inventory.forceFieldLevel > 0 ? new ForceField(inventory.forceFieldLevel) : null;
        // Equip shooter only when a projectile is unlocked (index ≥ 0)
        if (inventory.currentProjectileItem >= 0) {
            // index 0‑4  → type 1‑5 for ProjectileAbility
            this.projectile = new ProjectileAbility(inventory.currentProjectileItem + 1);
        } else {
            this.projectile = null;   // no projectile until the player buys Fish
        }

        //---------------------------------------
        this.background = new Background();
        //---------------------------------------
    }

    // Main loop to run the game
    runSimulation() {
        if (!this.soundsLoaded) return;

        clear();

        this.adjustZoom();
        this.wind.adjustVolume();
        this.music.adjustVolume();

        const floorSpeed = this.pause.active ? 0 : this.player.vel.x;
        this.background.update(floorSpeed, this.zoom);
        this.background.draw( this.zoom, floorSpeed );
        //---------------------------------------

        push();
            translate(this.tx, this.ty); // Change coordinate origin to player position
            scale(this.zoom); // set screen zoom

            // Update the main things on the screen each frame
            this.terrain.drawHills(width);
            this.player.drawPlayer()
            if (this.projectile) this.projectile.updateProjectiles();
            this.obstacleHandler.updateObstacles();
            this.obstacleHandler.updateExplosions();

            // Move terrain to the left and update player positions
            if (!this.pause.active) {
                this.offset += this.player.vel.x;
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

        // Lose life animation
        if (this.player.lives.playingAnimation) {
            this.player.lives.playLoseLifeAnimation();
        }
        // Draw hearts on the screen
        this.player.lives.drawLives();
        this.stats.gameUpdate();
        // Trigger player boost
        if (this.spacePressed && this.player.alive && !this.pause.active) {
            this.applyBoostToPlayer();
        }
        // Update the score each frame
        if (this.death === null) {
            this.score.update();

            if (this.fly != null) {
                this.fly.charge();

                if (this.fly.active) {
                    this.fly.applyUpwardForce(); // greater than gravity
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
        // Pause the game
        if (this.pause.active && this.player.alive) this.pause.showPauseScreen();
        else this.pause.reset();
        // Countdown after pausing
        if (this.pause.isCountingDown) {
            this.pause.showCountdown();
        }
    }

    // Calculate the zoom when the player goes above the zoom threshold
    adjustZoom() {
        if (this.player.pos.y < this.topMargin) {
            this.zoom = 0.86 / (-this.player.pos.y/height + 1);
            this.ty = this.topMargin - this.zoom * (this.player.pos.y);
            this.tx = 175 - this.zoom * (this.player.pos.x); // 175 seems to work better than 150
        }
        else {
            this.zoom = 1;
            this.tx = this.ty = 0;
        }
    }

    // Trigger player boost
    applyBoostToPlayer() {
        if (this.player.pos.y < this.terrain.f(this.player.pos.x)) {
            this.player.vel.y += 0.6;
        }
        else {
            this.player.vel.x += 0.2;
        }
    }

    // Cheats for invincibility and flight
    updateCheats() {
        this.invincibility = settings.enableCheats;
        this.infiniteFly = settings.enableCheats

        if (!this.cheatsEnabled && settings.enableCheats) {
            this.cheatsEnabled = true;
        }
    }

    // Audio loading for caching
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
        this.rotorSound    = await soundBoard.getSound('rotorSound');
        this.bgMusic = await soundBoard.getSound('mainSoundtrack1');
    }

    // Clearing the audio cache
    disconnectAudio() {
        const stopSound = (sound) => {
            if (sound) {
                sound.stop();
            }
        };
                                           // Dereference the variables for garbage collection

        stopSound(this.bgMusic);            this.bgMusic = null;

        stopSound(this.windSound);          this.windSound = null;
        stopSound(this.laserSound);         this.laserSound = null;
        stopSound(this.laserAutomaticSound); this.laserAutomaticSound = null;
        stopSound(this.explosionSound);     this.explosionSound = null;
        stopSound(this.deathSound);         this.deathSound = null;
        stopSound(this.fishThrow);          this.fishThrow = null;
        stopSound(this.fishImpactSound);    this.fishImpactSound = null;
        stopSound(this.forceFieldSound);    this.forceFieldSound = null;
        stopSound(this.snowballSound);      this.snowballSound = null;
        stopSound(this.freezeSound);        this.freezeSound = null;
        stopSound(this.arrowSound);         this.arrowSound = null;
        stopSound(this.ufoArrowImpactSound); this.ufoArrowImpactSound = null;
        stopSound(this.loseLifeSound);      this.loseLifeSound = null;
        stopSound(this.gainLifeSound);      this.gainLifeSound = null;
        stopSound(this.collectCoinSound);   this.collectCoinSound = null;
        stopSound(this.wingFlapSound);      this.wingFlapSound = null;
        stopSound(this.boosterSound);       this.boosterSound = null;
        stopSound(this.rotorSound);         this.rotorSound = null;
    }
}