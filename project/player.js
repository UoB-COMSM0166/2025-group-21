//-------------------- N E W --------------------

//Idea:
//-The ball/penguin should stay fixed in an X position
//-The only thing that being updated is its Y position


class Player {

    constructor(x, radius, display) {
        //---Reference for the display on screen---------------------
        this.display = display;

        //---Fixed position fr the penguin----
        this.x = x;

        //---This will change according to the wave's Y (check floor.js / floorYatX())
        this.y = 0;
        this.radius = radius;

        //---Velicity: 1-Positive: goes down / 2:negative, goes up
        this.velocity = 0;
        this.gravity = 0.1;
        this.isGrounded = true;

        this.fallFaster = false;
    }

    fall() {
        this.gravity = 2;
    }
    notFall() {
        this.gravity = 0.1;
    }


    //---Updating position according to velocity and gravity---------
    update() {

        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.fallFaster) {
            this.velocity += 5;
        }

        ///---Curvature at penguing 'X' position (which is constant)---
        let k = this.calculateCurvature(this.x);

        //---Tetha-----------
        let dy_dx = this.slopeDerivative(this.x, k);
        let theta = Math.atan(dy_dx); // no abs()

        //---Aceleration-----
        let g = this.gravity;
        let a = g * Math.sin(theta) * 2.0;  // Adjust the multiplier as needed


        let slope = (floor.yBelow - floor.yBehind) / floor.step;

        if (this.y >= floor.yBelow - this.radius) {

            this.y = floor.yBelow - this.radius;

            this.velocity = Math.abs(this.velocity) * slope * 0.5;

            this.isGrounded = true;

            this.fallFaster = false;
        }

        //-----Update Parameter Display------------------------------------------------
        this.display.show(slope, degrees(theta), floor.speed, this.velocity, this.gravity);
    }


    //---This is the method for rendering the penguin/ball--------------------
    show() {
        fill('rgb(104,240,30)');
        ellipse(this.x, this.y, this.radius * 2);
    }

    //-----Curvature calculation----------------------------------------------------
    calculateCurvature(screenX) {
        const dx = 0.01;

        //---Converting screen X to floor's world X by adding frameMovement
        const worldX = screenX + floor.frameMovement;

        //----Three points as sample around worldX
        const y1 = floor.floorYatX(worldX - dx); // y at (worldX - dx)
        const y2 = floor.floorYatX(worldX);      // y at worldX
        const y3 = floor.floorYatX(worldX + dx); // y at (worldX + dx)

        // Approximate the second derivative
        const d2y_dx2 = (y1 - 2 * y2 + y3) / (dx * dx);
        // Calculate curvature k
        return -0.5 * d2y_dx2;
    }

    // Derivative of the slope function dy/dx = -2k x
    slopeDerivative(x, k) {
        return -2 * k * x;
    }
}