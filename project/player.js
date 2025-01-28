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
        
        //---Here i am handling collision. If the penguin/ball goes "pass(?)" the wave... take it back to wave position...
        if (this.y >= theFloor - this.radius) {
        this.y = theFloor - this.radius;
        this.velocity = 0;
        this.isJumping = false;
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