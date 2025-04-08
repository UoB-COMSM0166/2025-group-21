

let Domain = 'home'; // Determines which part of the game code is executed

let homescreen = null;
let game = null;
let page = null;
let shop = null;
let inventory = null;

let playerImg = null;
let playerFly = null;
let playerDeath = null
let ufo = null;
let explosion = null;
let fish = null;
let damagedUfo = null;
let laserSound = null;
let explosionSound = null;
let deathSound = null;
let windSound = null;
let fishThrow = null;
let fishImpactSound = null;
let forceFieldSound = null;
let heart = null;
let homeBackground;
let logo;
let playNoPressed;
let playIsPressed;

function setup() {

    const{x, y} = initialDimensions();
    createCanvas(x, y).id("myCanvas");

    // page = new Page();
    inventory = new Inventory();
    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
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
        if (shop === null) shop = new Workshop();
        shop.openShop();
    }

    if (Domain === 'game') {
        if (game === null) game = new Game();
        game.runSimulation();
    }
}

function preload() {
    playerImg = loadImage('assets/images/player1.png');
    playerFly = loadImage('assets/sprites/playerFly.png');
    playerDeath = loadImage('assets/sprites/playerDeath.png');
    ufo = loadImage('assets/images/ufo.png');
    explosion = loadImage('assets/sprites/explosion.png');
    fish = loadImage('assets/images/fish.png');
    damagedUfo = loadImage('assets/images/damagedUfo.png')
    heartImage = loadImage('assets/images/hearts2.png')
    laserSound = loadSound('assets/sounds/laser.mp3');
    explosionSound = loadSound('assets/sounds/explosionSound.mp3');
    deathSound = loadSound('assets/sounds/deathSound.mp3');
    windSound = loadSound('assets/sounds/windSound.mp3');
    fishThrow = loadSound('assets/sounds/fishThrow.mp3');
    fishImpactSound = loadSound('assets/sounds/fishImpactSound.mp3');
    forceFieldSound = loadSound('assets/sounds/forceFieldSound.mp3');

    homeBackground = loadImage('assets/gifs/background.gif');
    logo = loadImage('assets/images/learnToFly.png');
    playNoPressed = loadImage('assets/images/playButton.png');
    playIsPressed = loadImage('assets/images/playButtonHover.png');
}

function initialDimensions() {
    // Calc maximum dimensions
    let maxWidth = window.innerWidth - 20*2;
    let maxHeight = window.innerHeight - 20*2;

    // Calc maximum dimensions, but still in 16:9
    let widthBasedHeight = maxWidth * 9 / 16;
    let heightBasedWidth = maxHeight * 16 / 9;

    // Use limiting dimension
    if (widthBasedHeight <= maxHeight) return {x: maxWidth, y: widthBasedHeight};
    else return {x: heightBasedWidth, y: maxHeight};
}

function resizeCanvasCSS() {

    let canvas = document.getElementById("myCanvas");
    // Maintain aspect ratio while scaling to fit window
    let aspectRatio = 16 / 9;
    let newWidth = window.innerWidth - 20*2;
    let newHeight = window.innerHeight - 20*2;

    if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
    } else {
        newHeight = newWidth / aspectRatio;
    }

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
    canvas.style.imageRendering = "pixelated"; // Ensures crisp pixels
}