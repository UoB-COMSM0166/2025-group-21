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
        this.gravity = 0.1;
        this.isGrounded = true;

        this.fallFaster = false;
    }

    fall() {
        this.fallFaster = true;
    }

    //---Updating position according to velocity and gravity---------
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


    //---This is the method for rendering the penguin/ball--------------------
    show() {
        fill('rgb(104,240,30)');
        ellipse(this.x, this.y, this.radius * 2);
    }
}