

let Domain = 'loadGame'; // Determines which part of the game code is executed

let domains = null;
let inventory = null;
let settings = null;
let userIsTyping = false;
let inputCharacter = null;
let soundBoard = null;
let soundsCached = false;
let bg = null;

function onQualityChange(newLevel) {
    signalBackground = newLevel;   // 1=High, 2=Medium, 3=Low, 4=UltraLow
    preloadBackgroundImages();
    bg = new Background();
}

function setup() {
    // remove loading screen gif
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';

    let gameProgress = loadGameProgress();

    // Set up canvas aspect ratio and resize to current window size
    createCanvas(1280, 720).id("myCanvas");
    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
    soundBoard = new SoundBoard();
    domains = new DomainManager(gameProgress);
}

function draw() {

    if (!soundsCached) {
        return;
    }
    domains.run();
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
