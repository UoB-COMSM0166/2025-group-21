

class Player {

    constructor(x, y) {
        this.radius = 10
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        //this.momentum = 0;
        this.accDownSlope = 0;
        this.gravity = 0.2;
        this.inAir = true;

    }

    update() {
        // keep ball at same x position on the screen
        this.pos.x = 150; // + 60 * this.acc.x;

        if (this.inAir) {
            this.vel.y += this.gravity;
            this.pos.y += this.vel.y;
            this.pos.x += this.vel.x;

            let ground = terrain.f(this.pos.x);

            if (this.pos.y > ground) {
                //this.momentum = sqrt(pow(this.vel.x, 2) + pow(this.vel.y, 2));
                this.pos.y = ground;
                this.inAir = false;
            }
        }
        else {
            let slope = terrain.slope(this.pos.x);  // Terrain gradient

            // slow speed if in contact with the ground
            if (!spacePressed) {
                this.vel.x /= 1.05;
            }

            //Handle effect of angle of slope on the gravity
            this.accDownSlope = (this.gravity) * sin(atan(slope));

            if (slope <= 0) {
                this.accDownSlope *= 0.7;
            }
            this.acc.y = this.accDownSlope * sin(atan(slope));
            this.acc.x = this.accDownSlope * cos(atan(slope));

            // Update velocity
            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;

            // Update position
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            // Change direction of velocity vector more upwards as gradient of curve increases
            let ground = terrain.f(this.pos.x);
            let oldY = this.pos.y;

            if (this.pos.y > ground) {
                this.pos.y = ground;
            }
            let dY = this.pos.y - oldY;
            this.vel.y += 1.2*dY;

            // inAir = true at the point of inflection of the curve
            let velocityAngle = atan2(this.vel.y, this.vel.x);
            let slopeAngle = atan(slope);

            if (velocityAngle < slopeAngle) {
                this.inAir = true;
            }
        }
    }

    drawPlayer() {
        fill(0);
        ellipse(this.pos.x, this.pos.y - this.radius , this.radius * 2);

    }

    isAlive() {
        let posX = this.pos.x;
        let velocityAngle = atan2(this.vel.y, this.vel.x);
        let slope = terrain.slope(posX);


        if (this.pos.y > terrain.f(posX) && slope < 0 && velocityAngle < 0) {
            return false;
        }
        return true;
    }
}
