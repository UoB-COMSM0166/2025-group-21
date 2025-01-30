class Player {

     constructor() {

        this.x = 200;
        this.y = 10;

        this.radius = 10;

        //---Velicity: 1-Positive: goes down / 2:negative, goes up
        this.velocity = 0;
        this.gravity = 0.1;
        this.isGrounded = true;

        this.fallFaster = false;
    }

    fall() {
        this.fallFaster = true;
    }

    update() {

        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.fallFaster) {
            this.velocity += 5;
        }

        let slope = (floor.yBelow - floor.yBehind) / floor.step;

        if (this.y >= floor.yBelow - this.radius) {

            this.y = floor.yBelow - this.radius;

            this.velocity = Math.abs(this.velocity) * slope * 0.5;

            this.isGrounded = true;

            this.fallFaster = false;
        }
    }

    show() {
        fill('rgb(104,240,30)');
        ellipse(this.x, this.y, this.radius * 2);
    }
}