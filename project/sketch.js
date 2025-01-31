function setup() {

    createCanvas(1000, 500);

    // Create floor and initialise
    floor = new Floor();
    floor.initSinParams();

    //--Display Creation-----
    display = new Display(10, 10); // Position at (10, 10)
    //NEW--- Creation of Player----------
    player = new Player(200, 10,display);
    
}


function draw() {
    
    background('#2C2F30');





    floor.drawFloor();

    //NEW---Updating player-------
    player.update();
    //NEW---Render the player-----
    player.show();

}

function keyPressed() {

    if (key === ' ') {
      player.fall();
    }
    if (key == 's'){
        floor.speed = 15;
    }
}

function keyReleased() {

    if (key == 's'){
        floor.speed = 5;
    }
    if (key == ' '){
        player.notFall();
    }
}