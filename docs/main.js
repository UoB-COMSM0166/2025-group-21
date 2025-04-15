

let Domain = 'intro'; // Determines which part of the game code is executed

let intro = null;
let mainMenu = null;
let game = null;
let shop = null;
let inventory = null;
let settings = null;
let frameCount = 0;
let fps = 0;
let userIsTyping = false;
let inputCharacter = null;

function setup() {
    // Set up canvas aspect ratio and resize to current window size
    createCanvas(1280, 720).id("myCanvas");
    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
    inventory = new Inventory();
    settings = new Settings();
}

function draw() {

    if (Domain === 'intro') {
        if(intro == null) {
            intro = new Intro();
            intro.resetAnimation();
        }
        intro.showIntro();
    }

    if (Domain === 'mainMenu') {
        if (mainMenu === null) {
            mainMenu = new MainMenu();
        }
        if (mainMenu.showSettings) {
            settings.showSettingsScreen();
        }
        else mainMenu.showMainMenu();
    }

    if (Domain === 'shop') {
        if (shop === null) {
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

    frameCount++
    if (frameCount%30 === 0) {
        fps = floor(frameRate());
        frameCount = 0;
    }
    text(fps, 50, 50);
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
