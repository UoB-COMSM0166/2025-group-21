let offset = 0;
let topMargin = 100;
let spacePressed = false;
let zoom = 1;
let tx = 0, ty = 0;
let initialDrop = true;
let invincibility = false;
let scaleFactor = 3;

function setup() {

    page = new Page();
    terrain = new Terrain();
    player = new Player(150, 150);
    deathTimer = new Clock();
    score = new Score();
    initialDrop = true;
}

function draw() {

    background(135, 206, 250);

    page.updateZoom();

    push();

    translate((page.pageWidth/2), (page.pageHeight/2));
    scale(page.getXScale(), page.getYScale());
    translate(0, page.translateY);

    offset += player.vel.x;
    terrain.drawHills();
    player.update();
    player.drawPlayer();

    pop();

    player.lives.drawLives();

    if (((spacePressed || mouseIsPressed) && player.alive) || initialDrop) {
        getPlayerInput();
    }
    if (player.alive) {
        if (!initialDrop) score.increment();
        score.trackAirtime();
        score.printScore();

        if (score.currentAirtime > 1) score.printAirtime();
    } else {
        runPlayerDeathSequence();
    }
}


function getPlayerInput() {
    if (player.pos.y < terrain.f(player.pos.x)) {
        player.vel.y += 1.0;
    } else {
        player.vel.x += 0.5;
    }
}

function runPlayerDeathSequence() {

    if (!player.alive) {
        zoom = lerp(zoom, 1.25, 0.01);
        ty = player.pos.y - zoom * (player.pos.y);
        tx = 160 - zoom * (player.pos.x);
    }

    deathTimer.tick();

    fill('rgba(255, 40, 0, 0.68)');
    rect(0, 0, width, height);

    fill('rgba(0, 0, 0, 0.6)');
    rect(0, height / 2 - 280, width, height / 1.8);

    score.printEndScore();

    if (deathTimer.time > 120) setup();
}
