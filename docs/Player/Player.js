class Player {

    constructor(x, y) {
        this.radius = width*0.01
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.accDownSlope = 0;
        this.gravity = 0.2;
        this.inAir = true;
        this.alive = true;
        this.deathAngle = null;
        this.frameIndex = 0;
        this.deathFrameIndex = 0; // Initialize death frame index only once

        // Player lives
        this.lives = new Lives(this);
        this.lostLife = false;
        this.gainedLife = false;

        this.shooting = false;
        this.headImg   = playerHead;
        this.feetImg = playerFlyFeet;
        this.wingImg = playerPenguinWings;
    }

    update() {

        // keep ball at same x position on the screen
        this.pos.x = 150;
        if (!this.alive && domains.game.death.type === 'UFO') this.pos.y = domains.game.death.currentY;

        if (this.inAir) {
            this.vel.y += this.gravity;
            this.updatePosition();

            let ground = domains.game.terrain.f(this.pos.x);

            if (this.pos.y > ground && this.alive) {
                this.pos.y = ground;
                this.inAir = false;
                this.calculateNormalForce();
            }
        }
        else {
            let slope = domains.game.terrain.slope(this.pos.x);  // Terrain gradient

            // slow speed if in contact with the ground
            if (!domains.game.spacePressed && !mouseIsPressed) { //TODO: remove mouse pressed
                this.vel.x /= 1.05;
            }
            this.updateAcceleration(slope);
            this.updateVelocity();
            this.updatePosition();

            // transfer momentum from x to y direction as curve steepens uphill
            this.updateVerticalVelocityFromSlope();

            if (this.playerIsInAir(slope)) {
                this.inAir = true;
            }
        }
    }


    drawPlayer() {
        this.lives.drawChangeLife();
        if (domains.game.death != null && domains.game.death.type === 'UFO') return;

        const FRAME_WIDTH = 128;
        const FRAME_HEIGHT = 128;
        const NORMAL_FRAME_COUNT = 6;
        const NORMAL_COLUMNS = 2;
        const frameSpeed = 2;
        const scaleFactor = 0.8;
        const headImg = this.headImg;
        const feetImg = this.feetImg;
        const wingImg = this.wingImg;

        imageMode(CENTER);

        let velocityAngle = atan2(this.vel.y, this.vel.x);
        let slopeAngle = atan(domains.game.terrain.slope(this.pos.x));

        if (!this.alive) {
            push();
            translate(domains.game.death.pos.x, domains.game.death.pos.y - this.radius);
            domains.game.death.pos.x += 0.55;
            // Death Animation
            const DEATH_COLUMNS = 4;
            const DEATH_FRAME_COUNT = 27;

            rotate(domains.game.death.slope);

            if (frameCount % 12 === 0 && this.deathFrameIndex < DEATH_FRAME_COUNT - 1) {
                this.deathFrameIndex++;
            }

            let deathCol = this.deathFrameIndex % DEATH_COLUMNS;
            let deathRow = Math.floor(this.deathFrameIndex / DEATH_COLUMNS);

            image(
                playerDeath,
                0, 0,  // Center the image at the origin
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,  // Destination size
                deathCol * FRAME_WIDTH, deathRow * FRAME_HEIGHT,          // Source x, y
                FRAME_WIDTH, FRAME_HEIGHT                                  // Source size
            );
            pop();
        }
        //------- Penguin Flying -------
        else if (domains.game.score.airtime > 3) {
            push();
            translate(150, this.pos.y - this.radius);
            rotate(velocityAngle);

            if (frameCount % frameSpeed === 0
                && !domains.game.pause.active
                && domains.game.fly != null
                && domains.game.fly.active) {
                this.frameIndex = (this.frameIndex + 1) % NORMAL_FRAME_COUNT;

                //---- PLaying different sounds for different flying levels ------
                if (inventory.flyLevel >= 4) {
                    if (!domains.game.boosterSound.isPlaying()) {
                        domains.game.boosterSound.play();
                        domains.game.wingFlapSound.play();
                    }
                } else {
                    if (!domains.game.wingFlapSound.isPlaying()) {
                        domains.game.wingFlapSound.play();
                    }
                }
            }

            let col = this.frameIndex % NORMAL_COLUMNS;
            let row = Math.floor(this.frameIndex / NORMAL_COLUMNS);

            // ----- draw body ------------
            image(
                playerBody,
                0, 0,
                FRAME_WIDTH * scaleFactor,
                FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH,
                row * FRAME_HEIGHT,
                FRAME_WIDTH,
                FRAME_HEIGHT
            );

            //--- Drawing head -------
            const HEAD_FRAME_W = 128;
            const HEAD_FRAME_H = 128;
            let headRow = this.shooting ? 1 : 0;
            image(
                headImg,
                0, 0,
                HEAD_FRAME_W * scaleFactor,
                HEAD_FRAME_H * scaleFactor,
                0, headRow * HEAD_FRAME_H,
                HEAD_FRAME_W,
                HEAD_FRAME_H
            );

            //--- drawing feet -----
            const FEET_FRAME_W = 128;
            const FEET_FRAME_H = 128;
            let feetRow = (domains.game.fly && domains.game.fly.active) ? 1 : 0;
            image(
                feetImg,
                0, 0,
                FEET_FRAME_W * scaleFactor,
                FEET_FRAME_H * scaleFactor,
                0, feetRow * FEET_FRAME_H,
                FEET_FRAME_W,
                FEET_FRAME_H
            );

            //--- Drawing wings ---------
            image(
                wingImg,
                0, 0,
                FRAME_WIDTH * scaleFactor,
                FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH,
                row * FRAME_HEIGHT,
                FRAME_WIDTH,
                FRAME_HEIGHT
            );
            pop();
        }
        // ------- Penguin grounded -------
        else {
            push();
            translate(150, this.pos.y - this.radius);
            rotate(slopeAngle);

            this.frameIndex = 0;  // always 0 on ground
            let col = this.frameIndex % NORMAL_COLUMNS;
            let row = Math.floor(this.frameIndex / NORMAL_COLUMNS);

            // draw body
            image(
                playerBody,
                0, 0,
                FRAME_WIDTH * scaleFactor,
                FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH,
                row * FRAME_HEIGHT,
                FRAME_WIDTH,
                FRAME_HEIGHT
            );

            // **HEAD OVERLAY** (ground)
            const HEAD_FRAME_W = 128;
            const HEAD_FRAME_H = 128;
            let headRow = this.shooting ? 1 : 0;
            image(
                headImg,
                0, 0,
                HEAD_FRAME_W * scaleFactor,
                HEAD_FRAME_H * scaleFactor,
                0, headRow * HEAD_FRAME_H,
                HEAD_FRAME_W,
                HEAD_FRAME_H
            );
            //--- Feet grounded ------------
            const FEET_FRAME_W = 128;
            const FEET_FRAME_H = 128;
            let feetRow = (domains.game.fly && domains.game.fly.active) ? 1 : 0;
            image(
                feetImg,
                0, 0,
                FEET_FRAME_W * scaleFactor,
                FEET_FRAME_H * scaleFactor,
                0, feetRow * FEET_FRAME_H,
                FEET_FRAME_W,
                FEET_FRAME_H
            );


            //----Drawing Wings-------
            image(
                wingImg,
                0, 0,
                FRAME_WIDTH * scaleFactor,
                FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH,
                row * FRAME_HEIGHT,
                FRAME_WIDTH,
                FRAME_HEIGHT
            );
            pop();
        }
    }

    updateAcceleration (slope) {
        // Handle effect of angle of slope on the gravity
        this.accDownSlope = (this.gravity) * sin(atan(slope));

        if (slope <= 0) { // uphill
            this.accDownSlope *= 0.7;
        }

        this.acc.y = this.accDownSlope * sin(atan(slope)) + 0.005 * this.vel.y;
        this.acc.x = this.accDownSlope * cos(atan(slope)) + 0.005 * this.vel.x;

        // if (game.stats.numJumps < 1) {
        //     this.acc.y += 0.02 * this.vel.y;
        //     this.acc.x += 0.02 * this.vel.x;
        // }
    }

    updateVelocity () {

        this.vel.y += this.acc.y;
        this.vel.x += this.acc.x;
    }

    updatePosition () {

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    updateVerticalVelocityFromSlope () {
        let ground = domains.game.terrain.f(this.pos.x);
        let oldY = this.pos.y;

        if (this.pos.y > ground) {
            this.pos.y = ground;
        }
        let dY = this.pos.y - oldY;
        this.vel.y += 1.2 * dY;
    }

    playerIsInAir(slope) {

        let velocityAngle = atan2(this.vel.y, this.vel.x);
        let slopeAngle = atan(slope);
        return velocityAngle < slopeAngle;
    }

    calculateNormalForce () {

        let normalForce = this.vel.y
            - (domains.game.terrain.f(this.pos.x + this.vel.x) - domains.game.terrain.f(this.pos.x));

        // player hits uphill slope at speed
        if (normalForce > 10 && domains.game.terrain.slope(this.pos.x) < -0.5) {

            if (this.vel.x < 1) {
                return;
            }

            if (normalForce > 20 && !domains.game.invincibility) {

                this.lives.removeLife();

                if (this.lives.getLives() === 0) {
                    domains.game.death = new Death('ground');
                    this.vel.x = -0.5;
                    this.vel.y = -2;
                    //this.gravity = 0.02
                }
                else {
                    // domains.game.loseLifeSound.play();
                    // this.lives.playingAnimation = true;
                    this.vel.x = this.vel.y = 0;
                    this.acc.x = this.acc.y = 0;
                }
            }
            else {
                let bounceAngle = this.getBounceAngle();
                this.vel.x = -0.2 * this.vel.y * cos(bounceAngle);
                this.vel.y = -0.2 * this.vel.x * sin(bounceAngle);
            }
        }
    }

    getBounceAngle() {

        let velocityAngle = atan2(this.vel.y, this.vel.x);
        let slopeAngle = atan(domains.game.terrain.slope(this.pos.x));
        return 2 * slopeAngle + velocityAngle;
    }
}