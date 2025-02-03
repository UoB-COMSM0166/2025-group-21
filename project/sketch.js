// sketch.js

//------------FOR BACKGORUNG--------------------------
let bg;
let floor, player;

//---Preloading assets----------------------------------------------
function preload() {
    preloadBackgroundImages();
}

function setup() {
    createCanvas(1000, 500);

    // Initialize your other classes (make sure Floor and Player are defined)
    floor = new Floor();
    floor.initSinParams();
    player = new Player(200, 10);

    //---Creation of backkground------------
    bg = new Background();
}

function draw() {
    // Clear the background with a solid color
    background('#2C2F30');

    // Update and draw the background layers
    bg.update(floor.speed, frameCount, width);
    bg.draw(height);

    // Draw other game elements
    stroke(1);
    floor.drawFloor();
    player.update();
    player.show();
}

function keyPressed() {
    if (key === ' ') {
        player.fall();
    }
    if (key === 's' || key === 'S') {
        floor.increaseSpeed();
    }
}

function keyReleased() {
    if (key === 's' || key === 'S') {
        floor.decreaseSpeed();
    }
}