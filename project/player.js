class Player {

    constructor(x, radius, display) {

        //---Reference for the display on screen---------------------
        this.display = display;

        //---Fixed position fr the penguin----
        this.x = x;
        this.y = 0;
        this.radius = radius;

        //---Velicity: 1-Positive: goes down / 2:negative, goes up
        this.velocity = 0;
        this.gravity = 0.1;
        this.isGrounded = false;

    }

    fall() {
        this.gravity = 2;
    }
    notFall() {
        this.gravity = 0.5;
    }

    //---Updating position according to velocity and gravity---------
    update() {

        // Establish grounded
        if (this.y > floor.floorY1 - this.radius) {
            this.isGrounded = true;
            this.y = floor.floorY1 - this.radius;
        } else {
            this.isGrounded = false;
        }

        let slope = (floor.floorY1 - floor.floorY2) / (floor.floorX1 - floor.floorX2);
        let theta;

        if (slope > 0) {
            theta = (Math.atan2((floor.floorY1 - floor.floorY2), (floor.floorX1 - floor.floorX2)) * 180 / Math.pi); // no abs()
        }
        if (slope < 0) {
            theta = Math.atan2((floor.floorY1 - floor.floorY2), (floor.floorX1 - floor.floorX2)) * 180 / Math.pi; // no abs()
        }

        // Update velocity and location
        if (this.isGrounded) {
            // Prevent falling through ground
            let a = this.gravity * Math.sin(theta);
            this.velocity += a;
            // Update the x-axis with floor
            floor.speed += Math.cos(theta) * this.velocity;
            this.y += Math.sin(theta) * this.velocity;
        }
        else if (!this.isGrounded) {
            this.velocity += this.gravity;
            this.y += this.velocity;
            floor.speed = this.velocity;
        }

        this.velocity /= 1.05;

        //-----Update Parameter Display------------------------------------------------
        this.display.show(slope, degrees(theta), floor.speed, this.velocity, this.gravity);
    }

    //---This is the method for rendering the penguin/ball--------------------
    show() {
        fill('rgb(104,240,30)');
        ellipse(this.x, this.y, this.radius * 2);
    }

}