

let offset = 0;  // Horizontal movement of screen position
let topMargin = 50;
let spacePressed = false
let zoom = 1;
let tx = 0, ty = 0;
let initialDrop = true;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    terrain = new Terrain();
    player = new Player(150, 150);
    deathTimer = new Clock();
    score = new Score();
    initialDrop = true;
}

function draw() {

    adjustZoom();

    push();

    translate(tx, ty);
    scale(zoom);
    background(135, 206, 250);  // Blue sky
    offset += player.vel.x;  // Move terrain to the left
    player.update();
    player.drawPlayer()
    terrain.drawHills();

    pop();



    if ((spacePressed && player.alive) || initialDrop) {
        getPlayerInput();
    }
    if (player.alive) {

        if (!initialDrop) { // Don't increase score during the fall at the start
            score.increment();
        }
        score.trackAirtime();
        score.printScore();
    }
    else {
        runPlayerDeathSequence();
    }
}

function adjustZoom() {

    if (player.pos.y < topMargin) {
        zoom = getZoom();
        ty = topMargin - zoom * (player.pos.y);
        tx = 160 - zoom * (player.pos.x); // 160 seems to work better than 150
    }
    else if (!player.alive) {
        zoom = lerp(zoom, 1.25, 0.01);
        ty = player.pos.y - zoom * (player.pos.y);
        tx = 160 - zoom * (player.pos.x);
    }
    else {
        zoom = 1;
        tx = 0;
        ty = 0;
    }
}

function getZoom() {
    if(player.pos.y < topMargin) {
        return 0.94 / (-player.pos.y/height + 1);
    }
    else{
        return 1;
    }
}

function getPlayerInput() {

    if (player.pos.y < terrain.f(player.pos.x)) {
        player.vel.y += 0.6;
    }
    else {
        player.vel.x += 0.2;
    }
}

function runPlayerDeathSequence() {

    deathTimer.tick();
    // overlay red screen tint
    fill('rgba(255, 40, 0, 0.68)')
    rect(0, 0, width, height);
    // overlay black tint under score
    fill('rgba(0, 0, 0, 0.6)')
    rect(0, height/2 - 280, width, height/1.8);
    score.printEndScore();

    if (deathTimer.time > 120) {
        setup();
    }

}
