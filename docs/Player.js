

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

    }

    update() {
        // keep ball at same x position on the screen
        this.pos.x = 150;

        if (this.inAir) {
            this.vel.y += this.gravity;
            this.updatePosition()

            let ground = terrain.f(this.pos.x);

            if (this.pos.y > ground) {
                this.pos.y = ground;
                this.inAir = false;
                this.calculateNormalForce();
            }
        }
        else {
            let slope = terrain.slope(this.pos.x);  // Terrain gradient

            // slow speed if in contact with the ground
            if (!spacePressed) {
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
        fill(0);
        ellipse(150, this.pos.y - this.radius , this.radius * 2);
    }

    updateAcceleration (slope) {

        //Handle effect of angle of slope on the gravity
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
        let ground = terrain.f(this.pos.x);
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

        let normalForce = this.vel.y - (terrain.f(this.pos.x + this.vel.x) - terrain.f(this.pos.x));

        if (normalForce > 10 && terrain.slope(this.pos.x) < -0.5) { // player hits uphill slope

            if (this.vel.x < 1) {
                return;
            }

            if (normalForce > 20) {
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
        let slopeAngle = atan(terrain.slope(this.pos.x));
        return 2 * slopeAngle + velocityAngle;
    }
}
