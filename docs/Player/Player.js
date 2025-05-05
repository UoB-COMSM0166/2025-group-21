class Player {

    constructor(x, y) {
        this.radius = width*0.01
        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0);
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

        const FRAME_WIDTH        = 128;
        const FRAME_HEIGHT       = 128;
        const NORMAL_FRAME_COUNT = 6;
        const NORMAL_COLUMNS     = 2;
        const baseFrameSpeed     = 2;
        const scaleFactor        = 0.8;
        const headImg            = this.headImg;
        const feetImg            = this.feetImg;
        const wingImg            = this.wingImg;

        imageMode(CENTER);

        const velocityAngle = atan2(this.vel.y, this.vel.x);
        const slopeAngle    = atan(domains.game.terrain.slope(this.pos.x));

        // compute wing‐sprite frame coords
        const wingCol = this.frameIndex % NORMAL_COLUMNS;
        const wingRow = Math.floor(this.frameIndex / NORMAL_COLUMNS);

        // —— DEATH ANIMATION ——
        if (!this.alive) {
            push();
            translate(domains.game.death.pos.x, domains.game.death.pos.y - this.radius);
            domains.game.death.pos.x += 0.5;
            rotate(domains.game.death.slope);
            const DEATH_COLUMNS     = 4;
            const DEATH_FRAME_COUNT = 27;
            if (frameCount % 12 === 0 && this.deathFrameIndex < DEATH_FRAME_COUNT - 1) {
                this.deathFrameIndex++;
            }
            const dc = this.deathFrameIndex % DEATH_COLUMNS;
            const dr = Math.floor(this.deathFrameIndex / DEATH_COLUMNS);
            image(
                playerDeath,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                dc * FRAME_WIDTH, dr * FRAME_HEIGHT,
                FRAME_WIDTH, FRAME_HEIGHT
            );
            pop();
            return;
        }

        // —— PENGUIN FLYING ——
        if (domains.game.score.airtime > 3) {
            push();
            translate(150, this.pos.y - this.radius);
            rotate(velocityAngle);

            const frameSpeed = baseFrameSpeed;
            if (
                frameCount % frameSpeed === 0 &&
                !domains.game.pause.active &&
                domains.game.fly != null &&
                domains.game.fly.active
            ) {
                // if helicopter rotor, double the speed
                const step = (inventory.flyLevel === 3) ? 2 : 1;
                this.frameIndex = (this.frameIndex + step) % NORMAL_FRAME_COUNT;

                // non‐overlapping original sound logic
                if (inventory.flyLevel >= 4) {
                    if (!domains.game.boosterSound.isPlaying()) {
                        domains.game.boosterSound.play();
                        domains.game.wingFlapSound.play();
                    }
                } else if (inventory.flyLevel === 3) {
                    if (!domains.game.rotorSound.isPlaying()) {
                        domains.game.rotorSound.play();
                        //domains.game.wingFlapSound.play();
                    }
                } else {
                    if (!domains.game.wingFlapSound.isPlaying()) {
                        domains.game.wingFlapSound.play();
                    }
                }
            }

            const col = this.frameIndex % NORMAL_COLUMNS;
            const row = Math.floor(this.frameIndex / NORMAL_COLUMNS);

            // body
            image(
                playerBody,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH, row * FRAME_HEIGHT,
                FRAME_WIDTH, FRAME_HEIGHT
            );

            // head overlay
            const HEAD_W = 128, HEAD_H = 128;
            const headRow = this.shooting ? 1 : 0;
            image(
                headImg,
                0, 0,
                HEAD_W * scaleFactor, HEAD_H * scaleFactor,
                0, headRow * HEAD_H,
                HEAD_W, HEAD_H
            );

            // feet overlay
            const FEET_W = 128, FEET_H = 128;
            const feetRow = domains.game.fly && domains.game.fly.active ? 1 : 0;
            image(
                feetImg,
                0, 0,
                FEET_W * scaleFactor, FEET_H * scaleFactor,
                0, feetRow * FEET_H,
                FEET_W, FEET_H
            );

            // wings overlay
            image(
                wingImg,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                wingCol * FRAME_WIDTH, wingRow * FRAME_HEIGHT,
                FRAME_WIDTH, FRAME_HEIGHT
            );
            pop();
        }
        // —— PENGUIN GROUNDED ——
        else {
            push();
            translate(150, this.pos.y - this.radius);
            rotate(slopeAngle);

            // body (first frame)
            image(
                playerBody,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                0, 0,
                FRAME_WIDTH, FRAME_HEIGHT
            );

            // head overlay
            const HEAD_W = 128, HEAD_H = 128;
            const headRowG = this.shooting ? 1 : 0;
            image(
                headImg,
                0, 0,
                HEAD_W * scaleFactor, HEAD_H * scaleFactor,
                0, headRowG * HEAD_H,
                HEAD_W, HEAD_H
            );

            // feet overlay
            const FEET_W = 128, FEET_H = 128;
            const feetRowG = domains.game.fly && domains.game.fly.active ? 1 : 0;
            image(
                feetImg,
                0, 0,
                FEET_W * scaleFactor, FEET_H * scaleFactor,
                0, feetRowG * FEET_H,
                FEET_W, FEET_H
            );

            // wings overlay (last flying frame)
            image(
                wingImg,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                wingCol * FRAME_WIDTH, wingRow * FRAME_HEIGHT,
                FRAME_WIDTH, FRAME_HEIGHT
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

// function drawArrowhead(x, y, dx, dy, size = 100, color = 'black') {
//     push();
//     translate(x + dx, y + dy);
//     let angle = atan2(dy, dx);
//     rotate(angle);
//     fill(color);
//     beginShape();
//     strokeWeight(6);
//     vertex(0, 0);
//     vertex(-size, size / 2);
//     vertex(-size, -size / 2);
//     endShape(CLOSE);
//     pop();
// }
