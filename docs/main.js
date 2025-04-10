

let Domain = 'home'; // Determines which part of the game code is executed

let homescreen = null;
let game = null;
let shop = null;
let inventory = null;

function setup() {
    // Set up canvas aspect ratio and resize to current window size
    createCanvas(1280, 720).id("myCanvas");

    // let ctx = canvas.getContext('2d');
    // ctx.imageSmoothingEnabled = false;
    // pixelDensity(1);

    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
    inventory = new Inventory();
}

function draw() {

    if (Domain === 'home') {
        if (homescreen === null) {
            homescreen = new Homescreen();
            homescreen.resetAnimation();
        }
        homescreen.showHomescreen();
    }

    if (Domain === 'shop') {
        if (shop === null) {
            //loadSounds();
            shop = new Workshop();
        }
        shop.openShop();
    }

    if (Domain === 'game') {
        if (game === null) {
            game = new Game();
        }
        game.runSimulation();
    }
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
    // canvas.style.imageRendering = "crisp-edges"; // Ensures crisp pixels
}

function hoveringOverButton(pos, size) {
    return mouseX > pos.x - size.x/2 && mouseX < pos.x + size.x/2 &&
        mouseY > pos.y - size.y/2 && mouseY < pos.y + size.y/2;
}
