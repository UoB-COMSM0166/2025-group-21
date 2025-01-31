

class Player {

    constructor(x, y) {
        this.radius = 10
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.gravity = 0.5;
        this.inAir = true;
    }

    update() {
        // keep ball at same x position on the screen
        this.pos.x = 150;
        //let ground =

        if (this.inAir) {
            this.gravity = 0.5; // 0.4
            this.vel.y += this.gravity;
            this.pos.y += this.vel.y;
            this.pos.x += this.vel.x;

            let ground = terrain.f(this.pos.x);

            if (this.pos.y > ground) {
                this.pos.y = ground;
                //this.vel.y = 0;
                this.inAir = false;
            }
        }
        else {
            this.gravity = 1.2; // 0.5
            let slope = terrain.slope(this.pos.x);  // Terrain gradient
            //let curvature = terrain.secondDerivative(this.pos.x);

            // Simulated gravity pulling along the slope
            //this.acc = slope * 0.5;  // Adjust multiplier to control rolling effect
            this.acc.x = (this.gravity + this.acc.y) * sin(slope); // mg sin(theta)
            this.acc.y = (this.gravity) * cos(slope);
            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;

            // Update position
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            let ground = terrain.f(this.pos.x);

            let oldY = this.pos.y;

            if (this.pos.y > ground) {
                this.pos.y = ground;
            }
            let dY = this.pos.y - oldY;
            this.vel.y += dY;
            let velocityAngle = atan2(this.vel.y, this.vel.x);
            let slopeAngle = atan(slope);

            if (velocityAngle < slopeAngle) {
                this.inAir = true;
            }

            // if (!changeSpeed && !this.inAir) {
            //     this.vel.x *= 0.9;
            // }


            // does the ball leave the ground
            //let trajectory = angleBetween(createVector(0, 0), this.vel);

            // if (this.vel > slope) {
            //     this.inAir = true;
            // }
        }
    }

    drawPlayer() {
        fill(0);
        ellipse(this.pos.x, this.pos.y - this.radius , this.radius * 2)
    }
}
