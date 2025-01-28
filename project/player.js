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
        this.gravity = 0.8;//-------------------- N E W --------------------

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
                this.gravity = 0.8;
                this.isJumping = false;

            }

            //----Jump function is only for testing. I know that the idea is to make the penguin go down faster by increasing the gravity-------
            jump() {
                //--When jump called... only jump if ball is not in the air
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.velocity = -15; //Negative for jumping
                }
            }

            //---Updating position according to velocity and gravity---------
            update() {

                this.y += this.velocity;
                this.velocity += this.gravity;

                //---Find the wave floor at penguin/ball X position (this.x)--------
                let theFloor = floorYatX(this.x);
                //NEW---Find the slope of the wave at this X position---------------
                let slope = floorSlopeAtX(this.x);

                //---NEW: Collision system will change velocity according to the slope measurement
                if (this.y >= theFloor - this.radius) {
                    //---This puts the ball in the required Y position
                    this.y = theFloor - this.radius;

                    //---NEW: This changes tghe velocity according to the slope
                    //---If the slope is downhill (negative -) Ball velocity goes up------
                    //---If the slope is uphill (positive +), Ball velocity goes down------
                    //NOTE: this acceleration has nothing to do with the "real acceleration" of the game
                    //      I'm talking about "vertical accelerations" just for the positioning of the ball/penguin

                    this.velocity += slope * Math.abs(this.velocity);

                    //---NEW: Jumping only when on the ground------------------------------
                    if (this.y >= theFloor - this.radius && this.velocity >= 0) {
                        this.isJumping = false;
                    }
                }
            }


            //---This is the method for rendering the penguin/ball--------------------
            show() {
                // Draw the ball
                fill('rgb(104,240,30)');
                noStroke();
                ellipse(this.x, this.y, this.radius * 2);
            }

        }

//---NEW: The slope function. This is the simplest one, but it works (Haven't tried with very steep waves tho)
        function floorSlopeAtX(x) {
            let dx = 0.01; // A very small change in x
            let y1 = floorYatX(x); // Floor height at x
            let y2 = floorYatX(x + dx); // Floor height at x + dx
            return (y2 - y1) / dx; // Calculate the slope
        }
        this.isJumping = false;

    }
    
    //----Jump function is only for testing. I know that the idea is to make the penguin go down faster by increasing the gravity-------
    jump() {
        //--When jump called... only jump if ball is not in the air
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocity = -15; //Negative for jumping
        }
    }
  
    //---Updating position according to velocity and gravity---------
    update() {
        
        this.y += this.velocity;
        this.velocity += this.gravity;
        
        //---Find the wave floor at penguin/ball X position (this.x)--------
        let theFloor = floorYatX(this.x);
        //NEW---Find the slope of the wave at this X position---------------
        let slope = floorSlopeAtX(this.x);
        
        //---NEW: Collision system will change velocity according to the slope measurement
        if (this.y >= theFloor - this.radius) {
            //---This puts the ball in the required Y position
            this.y = theFloor - this.radius;

            //---NEW: This changes tghe velocity according to the slope
            //---If the slope is downhill (negative -) Ball velocity goes up------
            //---If the slope is uphill (positive +), Ball velocity goes down------
            //NOTE: this acceleration has nothing to do with the "real acceleration" of the game
            //      I'm talking about "vertical accelerations" just for the positioning of the ball/penguin

            this.velocity += slope * Math.abs(this.velocity);

            //---NEW: Jumping only when on the ground------------------------------
            if (this.y >= theFloor - this.radius && this.velocity >= 0) {
                this.isJumping = false;
            }
        }
    }

  
    //---This is the method for rendering the penguin/ball--------------------
    show() {
      // Draw the ball
      fill('rgb(104,240,30)');
      noStroke(); 
      ellipse(this.x, this.y, this.radius * 2);
    }

}

//---NEW: The slope function. This is the simplest one, but it works (Haven't tried with very steep waves tho)
function floorSlopeAtX(x) {
    let dx = 0.01; // A very small change in x
    let y1 = floorYatX(x); // Floor height at x
    let y2 = floorYatX(x + dx); // Floor height at x + dx
    return (y2 - y1) / dx; // Calculate the slope
}