

class Player {

    constructor(x, y) {
        this.radius = 10
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.accDownSlope = 0;
        this.gravity = 0.2;
        this.inAir = true;
        this.alive = true;
        this.deathAngle = null;
        //-------Add a persistent frame index for animation--------
        this.frameIndex = 0;
        this.deathFrameIndex = 0; // Initialize death frame index only once

    }

    update() {
        // keep ball at same x position on the screen
        this.pos.x = 150;

        if (this.inAir) {
            this.vel.y += this.gravity;
            this.updatePosition();

            let ground = game.terrain.f(this.pos.x);

            if (this.pos.y > ground && this.alive) {
                this.pos.y = ground;
                this.inAir = false;
                game.initialDrop = false;
                this.calculateNormalForce();
            }
        }
        else {
            let slope = game.terrain.slope(this.pos.x);  // Terrain gradient

            // slow speed if in contact with the ground
            if (!game.spacePressed && !mouseIsPressed) {
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
        const FRAME_WIDTH = 128;
        const FRAME_HEIGHT = 128;
        const NORMAL_FRAME_COUNT = 6;
        const NORMAL_COLUMNS = 2;
        const frameSpeed = 2;
        const scaleFactor = 0.8;

        push();
        translate(150, this.pos.y - this.radius);
        imageMode(CENTER);


        //
        let velocityAngle = atan2(this.vel.y, this.vel.x);
        let slopeAngle = atan(game.terrain.slope(this.pos.x));

        if (!this.alive) {
            // Death Animation
            const DEATH_COLUMNS = 4;
            const DEATH_FRAME_COUNT = 20;

            if (this.deathAngle === null) this.deathAngle = velocityAngle;
            rotate(this.deathAngle-= 0.03);


            rotate(velocityAngle);

            if (frameCount % frameSpeed === 0 && this.deathFrameIndex < DEATH_FRAME_COUNT - 1) {
                this.deathFrameIndex++;
            }

            let deathCol = this.deathFrameIndex % DEATH_COLUMNS;
            let deathRow = Math.floor(this.deathFrameIndex / DEATH_COLUMNS);

            image(
                deathSpriteSheet,
                0, 0,  // Center the image at the origin
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,  // Destination size
                deathCol * FRAME_WIDTH, deathRow * FRAME_HEIGHT,          // Source x, y
                FRAME_WIDTH, FRAME_HEIGHT                                  // Source size
            );
        }
        else if (game.score.airtime > 3) {

            rotate(velocityAngle);

            if (frameCount % frameSpeed === 0 && !game.pause.active && game.fly.active) {
                this.frameIndex = (this.frameIndex + 1) % NORMAL_FRAME_COUNT;
            }
            let col = this.frameIndex % NORMAL_COLUMNS;
            let row = Math.floor(this.frameIndex / NORMAL_COLUMNS);

            image(
                spriteSheet,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH, row * FRAME_HEIGHT,
                FRAME_WIDTH, FRAME_HEIGHT
            );
        }
        else {

            rotate(slopeAngle);
            this.frameIndex = 0;
            let col = this.frameIndex % NORMAL_COLUMNS;
            let row = Math.floor(this.frameIndex / NORMAL_COLUMNS);

            image(
                spriteSheet,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
                col * FRAME_WIDTH, row * FRAME_HEIGHT,
                FRAME_WIDTH, FRAME_HEIGHT
            );
        }


        pop();
    }

    updateAcceleration (slope) {

        // Handle effect of angle of slope on the gravity
        this.accDownSlope = (this.gravity) * sin(atan(slope));

        if (slope <= 0) { // uphill
            this.accDownSlope *= 0.7;
        }
        this.acc.y = this.accDownSlope * sin(atan(slope));
        this.acc.x = this.accDownSlope * cos(atan(slope));
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
        let ground = game.terrain.f(this.pos.x);
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
            - (game.terrain.f(this.pos.x + this.vel.x) - game.terrain.f(this.pos.x));

        // player hits uphill slope at speed
        if (normalForce > 10 && game.terrain.slope(this.pos.x) < -0.5) {

            if (this.vel.x < 1) {
                return;
            }

            if (normalForce > 20 && !game.invincibility) {
                this.alive = false;
                this.vel.x = -0.5;
                this.vel.y = -2;
                this.gravity = 0.02
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
        let slopeAngle = atan(game.terrain.slope(this.pos.x));
        return 2 * slopeAngle + velocityAngle;
    }
}
