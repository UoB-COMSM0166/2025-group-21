let offset = 0;
let topMargin = 100;
let spacePressed = false;
let zoom = 1;
let tx = 0, ty = 0;
let initialDrop = true;
let invincibility = true;
let scaleFactor = 3;

function setup() {
    // createCanvas(window.innerWidth * 0.8, (window.innerWidth * 0.8) * 9 / 16); // Keep 16:9 ratio
    page = new Page();
    terrain = new Terrain();
    player = new Player(150, 150);
    deathTimer = new Clock();
    score = new Score();
    initialDrop = true;
}

function draw() {

    background(135, 206, 250);
    adjustZoom();

    push();
    // Translate
    translate((page.pageWidth/2), (page.pageHeight/2) + ty);
    scale(page.scaleX * zoom, page.scaleY * zoom);

    offset += player.vel.x;
    terrain.drawHills();
    player.update();
    player.drawPlayer();

    pop();

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

function adjustZoom() {
    let topmargin = ((-page.pageHeight / 2) * 0.90);

    if (player.pos.y < topmargin) {

        zoom = min(1, page.pageHeight / (Math.abs(player.pos.y - terrain.floorLevel)));

        let midPoint = (player.pos.y + terrain.floorLevel) / 2;

        // Parameters for
        ty = -midPoint * page.scaleY * zoom;

    } else {
        zoom = 1;
        tx = 0;
        ty = 0;
    }
}

// function adjustZoom() {
//
//     let topmargin = (-page.pageHeight/2) + 50
//
//     if (player.pos.y < topmargin) {
//         zoom = 0.94; /// (-player.pos.y / height + 1);
//         ty = topmargin + zoom * (player.pos.y);
//         tx = player.pos.x;
//     } else {
//         zoom = 1;
//         tx = ty = 1;
//     }
// }

function getPlayerInput() {
    if (player.pos.y < terrain.f(player.pos.x)) {
        player.vel.y += 1.0;
    } else {
        player.vel.x += 0.6;
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

// Resize the canvas dynamically while keeping the aspect ratio
function windowResized() {
    let newWidth = window.innerWidth * 0.8;
    let newHeight = newWidth * 9 / 16;  // Maintain 16:9 aspect ratio

    resizeCanvas(newWidth, newHeight);

    // Update scale factor for consistency
    scaleFactor = newWidth / 800;  // Assuming your base resolution is 800x450
}
