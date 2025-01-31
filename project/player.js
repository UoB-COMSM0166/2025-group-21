//-------------------- N E W --------------------

//Idea:
//-The ball/penguin should stay fixed in an X position
//-The only thing that being updated is its Y position


class Player {

    constructor(x, radius) {

        //---Fixed position fr the penguin----
        this.x = x;

        //---This will change according to the wave's Y (check floor.js / floorYatX())
        this.y = 0;
        this.radius = radius;

        //---Velicity: 1-Positive: goes down / 2:negative, goes up
        this.velocity = 0;
        this.gravity = 0.9;
        this.isGrounded = true;

        this.fallFaster = false;

        // Variables to store current state for display
        this.currentSlope = 0;
        this.currentTheta = 0;
        this.currentFloorSpeed = 0;
    }

    fall() {
        this.fallFaster = true;
    }

    update() {
        let scalingFactor = 100;
        let minSpeed = 10;
        let maxSpeed = 20;

        // 1) Gravity
        this.velocity += this.gravity;
        if (this.fallFaster) {
            this.velocity += 5;
        }
        this.y += this.velocity;

        // 2) Calculate curvature at player's screen X
        let k = this.calculateCurvature(this.x);

        // 3) Get slope derivative (dy/dx) and preserve sign
        let dy_dx = this.slopeDerivative(this.x, k);
        let theta = atan(dy_dx); // note: no abs()

        // 4) slope-based acceleration
        //    a = (5/7)*g*sin(theta)
        let g = this.gravity;
        let a = g * sin(theta) * 2.0;  // double, triple, etc.


        // 5) Time step
        let dt = deltaTime / 6000;

        // 6) We have a purely vertical velocity in "this.velocity".
        //    The floor's horizontal speed depends on 'a'.
// After calculating slope
        let slope = (floor.yBelow - floor.yBehind) / floor.step;
        if (slope < 0) {
            // Downhill: increase floor speed
            floor.speed -= a * dt * scalingFactor;
        } else if (slope > 0) {
            // Uphill: decrease floor speed
            floor.speed += a * dt * scalingFactor;
        }

// Optionally, clamp the speed to prevent excessive values
        floor.speed = constrain(floor.speed, 0, maxSpeed);

        // 7) Optional friction or clamp
        floor.speed *= 0.99;
        floor.speed = constrain(floor.speed, minSpeed, maxSpeed);

        // 8) Check floor collision
        let worldX = this.x + floor.frameMovement;
        let floorY = floor.floorYatX(worldX);

        if (this.y >= floorY - this.radius) {
            // Snap onto floor
            this.y = floorY - this.radius;
            // Damp or zero out vertical velocity

            this.fallFaster = false;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
        // Store current slope and theta for display
        this.currentSlope = slope;
        this.currentTheta = degrees(theta); // Convert to degrees for readability
        this.currentFloorSpeed = floor.speed;
    }


    //---This is the method for rendering the penguin/ball--------------------
    show() {
        fill('rgb(104,240,30)');
        ellipse(this.x, this.y, this.radius * 2);
        this.showInfo();
    }

    showInfo() {
        fill(255); // White color for text
        textSize(16);
        textAlign(LEFT, TOP);
        text("Slope: " + this.currentSlope.toFixed(2), 10, 10);
        text("Theta: " + this.currentTheta.toFixed(2) + "°", 10, 30);
        text("Floor Speed: " + this.currentFloorSpeed.toFixed(2), 10, 50);
        text("Vertical Velocity: " + this.velocity.toFixed(2), 10, 70);
    }
    //----NICO NEW: Curvature calcultion------------------------------------------
    calculateCurvature(screenX) {
        const dx = 0.1; // Small step size for numerical differentiation

        // Convert screen X to floor's world X by adding frameMovement
        const worldX = screenX + floor.frameMovement;

        // Sample three points around worldX
        const y1 = floor.floorYatX(worldX - dx); // y at (worldX - dx)
        const y2 = floor.floorYatX(worldX);      // y at worldX
        const y3 = floor.floorYatX(worldX + dx); // y at (worldX + dx)

        // Approximate the second derivative
        const d2y_dx2 = (y1 - 2 * y2 + y3) / (dx * dx);

        // Calculate curvature k
        return -0.5 * d2y_dx2;
    }

    // Derivative of the slope function dy/dx = -2k x
    slopeDerivative(x,k) {
        return -2 * k * x;
    }

    //----------------------------------------------------------------------------
}