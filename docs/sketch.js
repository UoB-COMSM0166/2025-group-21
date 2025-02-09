

let offset = 0;  // Horizontal movement of screen position
let topMargin = 50;
let spacePressed = false
let zoom = 1;
let tx = 0, ty = 0;
let initialDrop = true;
let invincibility = true;

function setup() {

    page = new Page();
    terrain = new Terrain();
    player = new Player(150, 150);
    deathTimer = new Clock();
    score = new Score();
    initialDrop = true;
}

function draw() {

    adjustZoom();

    push();
    // Scale the game size if they resize the window
    scale(page.gameScale);

    translate(tx, ty); // Change coordinate origin to player position
    scale(zoom); // set screen zoom
    background(135, 206, 250);  // Blue sky
    offset += player.vel.x;  // Move terrain to the left
    player.update();
    player.drawPlayer()
    terrain.drawHills();
    pop();

    if (((spacePressed || mouseIsPressed) && player.alive) || initialDrop) {
        getPlayerInput();
    }
    if (player.alive) {

        if (!initialDrop) { // Don't increase score during the fall at the start
            score.increment();
        }
        score.trackAirtime();
        score.printScore();

        if (score.currentAirtime > 1) {
            score.printAirtime();
        }
    }
    else {
        runPlayerDeathSequence();
    }
}


function adjustZoom() {

    if (player.pos.y < topMargin) {
        zoom = 0.94 / (-player.pos.y/height + 1);
        ty = topMargin - zoom * (player.pos.y);
        tx = 160 - zoom * (player.pos.x); // 160 seems to work better than 150
    }
    else {
        zoom = 1;
        tx = ty = 0;
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

    // Death animation
    if (!player.alive) {
        zoom = lerp(zoom, 1.25, 0.01);
        ty = player.pos.y - zoom * (player.pos.y);
        tx = 160 - zoom * (player.pos.x);
    }

    deathTimer.tick();

    fill('rgba(255, 40, 0, 0.68)'); // overlay red screen tint
    rect(0, 0, width, height);

    fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
    rect(0, height/2 - 280, width, height/1.8);

    score.printEndScore();

    if (deathTimer.time > 120) {
        setup();
    }
}
