

let Domain = 'loadGame'; // Determines which part of the game code is executed

let domains = null;
let inventory = null;
let settings = null;
let frameCount = 0;
let fps = 0;
let userIsTyping = false;
let inputCharacter = null;
let soundBoard = null;

function setup() {
    let gameProgress = loadGameProgress();

    // if (!gameProgress) {
    //     gameProgress = NEW_GAME_STATE;
    // }

    // Set up canvas aspect ratio and resize to current window size
    createCanvas(1280, 720).id("myCanvas");
    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
    inventory = null; // new Inventory(gameProgress);
    settings = null; // new Settings(gameProgress);
    soundBoard = new SoundBoard();
    domains = new DomainManager(gameProgress);
}

function draw() {

    domains.run();

    frameCount++
    if (frameCount%30 === 0) {
        fps = floor(frameRate());
        frameCount = 0;
    }
    text(fps, 50, 50);

    push();
    if (domains.game !== null) {
        textAlign(LEFT);
        textSize(15);
        text('Projectiles = ' + domains.game.projectile.projectiles.length, 10, 80);
        text('UFOs = ' + domains.game.UFOHandler.UFOs.length, 10, 105);
        text('Explosions = ' + domains.game.UFOHandler.explosions.length, 10, 130);
    }
    pop();
}



function resizeCanvasCSS() {
    let canvas = document.getElementById("myCanvas");

    // Maintain aspect ratio while scaling to fit window
    let aspectRatio = 16 / 9;
    let newWidth = window.innerWidth - 20*2; // Subtract the margin off
    let newHeight = window.innerHeight - 20*2;

    // Pick the larger of two
    if (newWidth / newHeight > aspectRatio) newWidth = newHeight * aspectRatio;
    else newHeight = newWidth / aspectRatio;

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
}

function hoveringOverButton(pos, size) {
    return mouseX > pos.x - size.x/2 && mouseX < pos.x + size.x/2 &&
        mouseY > pos.y - size.y/2 && mouseY < pos.y + size.y/2;
}
