function setup() {

    createCanvas(1000, 500);

    // Create floor and initialise
    floor = new Floor();
    floor.initSinParams();

    //NEW--- Creation of Player----------
    player = new Player(200, 10);
    
}


function draw() {
    
    background('#C4F2FF');



    stroke(1);

    floor.drawFloor();

    //NEW---Updating player-------
    player.update();
    //NEW---Render the player-----
    player.show();

}

//NEW----Jumping function with SpacebaR (DEMO)-----
function keyPressed() {

    if (key === ' ') {
      player.fall();
    }
}