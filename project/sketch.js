let amplitudes = [];
let frequencies = [];
let phases = [];
let speed = 5;
let numWaves = 20; // Num sin waves to sum
let step = 5;


function setup() {

    createCanvas(1000, 500);

    initSinParams();

    //NEW--- Creation of Player----------
    player = new Player(200, 10);
    
}


function draw() {
    
    background('#C4F2FF');

    stroke(1);
    drawFloor();

    //NEW---Updating player-------
    player.update();
    //NEW---Render the player-----
    player.show();

}


//NEW----Jumping function with SpacebaR (DEMO)-----
function keyPressed() {

    if (key === ' ') {
      player.jump();
    }
}