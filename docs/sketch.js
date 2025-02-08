

let offset = 0;  // Horizontal movement of screen position
let topMargin = 50;
let spacePressed = false
let zoom = 1;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    terrain = new Terrain();
    player = new Player(150, 150);
    deathTimer = new Clock();
}

function draw() {

    //zoom = 1;
    let tx = 0, ty = 0;

    if (player.pos.y < topMargin) {
        zoom = getZoom();
        ty = topMargin - zoom * (player.pos.y);
        tx = 160 - zoom * (player.pos.x); // 160 seems to work better than 150
    }
    else {
        zoom = 1;
    }

    push();

    translate(tx, ty);
    scale(zoom);
    background(135, 206, 250);  // Blue sky
    offset += player.vel.x;  // Move terrain to the left
    player.update();
    player.drawPlayer()
    terrain.drawHills();

    pop();

    if (spacePressed && player.alive) {

        if (player.pos.y < terrain.f(player.pos.x)) {
            player.vel.y += 0.6;
        }
        else {
            player.vel.x += 0.2;
        }
    }

    if (!player.alive) {
        deathTimer.tick();
        fill('rgba(255, 50, 0, 0.6)')
        rect(0, 0, width, height);

        if (deathTimer.time > 80) {
            setup();
        }
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
