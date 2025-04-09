

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
let laserAutomaticSound = null;
let explosionSound = null;
let deathSound = null;
let windSound = null;
let fishThrow = null;
let fishImpactSound = null;
let forceFieldSound = null;
let heartImages = [];
let purchaseSound = null;
let illegalPurchaseSound = null;
let snowball = null;
let snowballSound = null;
let freezingUfo = null;
let frozenUfo = null;
let freezeSound = null;
let arrow = null;
let arrowSound = null;
let ufoArrowImpact = null;
let ufoArrowImpactSound = null;
let greenLaser = null;
let purpleLaser = null;
let coin = null;

let homeBackground;
let logo;
let playNoPressed;
let playIsPressed;
let workshopBackground;

let continueButton = null;
let continueButtonHover = null;
let returnToWorkshopButton = null;
let returnToWorkshopButtonHover = null;
let playAgainButton = null;
let playAgainButtonHover = null;
let statsButton = null;
let statsButtonHover = null;
let backButton = null;
let backButtonHover = null;
let projectileButton = null
let projectileButtonHover = null;
let flyingButton = null;
let flyingButtonHover = null;
let forceFieldButton = null;
let forceFieldButtonHover = null;
let buyButtonYellow = null;
let buyButtonRed = null;
let buyButtonGreen = null;
let playButton = null;
let playButtonHover = null;

function setup() {
    // Set up canvas aspect ratio and resize to current window size
    createCanvas(1280, 720).id("myCanvas");
    resizeCanvasCSS();
    window.addEventListener("resize", resizeCanvasCSS);
    // Instantiate inventory
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

function preload() {

    returnToWorkshopButton = loadImage('assets/buttons/returnToWorkshopButton.png');
    returnToWorkshopButtonHover = loadImage('assets/buttons/returnToWorkshopButtonHover.png');
    continueButton = loadImage('assets/buttons/continueButton.png');
    continueButtonHover = loadImage('assets/buttons/continueButtonHover.png');
    playAgainButton = loadImage('assets/buttons/playAgainButton.png');
    playAgainButtonHover = loadImage('assets/buttons/playAgainButtonHover.png');
    statsButton = loadImage('assets/buttons/statsButton.png');
    statsButtonHover = loadImage('assets/buttons/statsButtonHover.png');
    backButton = loadImage('assets/buttons/backButton.png');
    backButtonHover = loadImage('assets/buttons/backButtonHover.png');
    projectileButton = loadImage('assets/buttons/projectileButton.png');
    projectileButtonHover = loadImage('assets/buttons/projectileButtonHover.png');
    flyingButton = loadImage('assets/buttons/flyingButton.png');
    flyingButtonHover = loadImage('assets/buttons/flyingButtonHover.png');
    forceFieldButton = loadImage('assets/buttons/forceFieldButton.png');
    forceFieldButtonHover = loadImage('assets/buttons/forceFieldButtonHover.png');
    buyButtonYellow = loadImage('assets/buttons/buyButtonYellow.png');
    buyButtonRed = loadImage('assets/buttons/buyButtonRed.png');
    buyButtonGreen = loadImage('assets/buttons/buyButtonGreen.png');
    playButton = loadImage('assets/buttons/shopPlayButton.png');
    playButtonHover = loadImage('assets/buttons/shopPlayButtonHover.png');

    playerImg = loadImage('assets/images/player1.png');
    playerFly = loadImage('assets/sprites/playerFly.png');
    playerDeath = loadImage('assets/sprites/playerDeath.png');
    ufo = loadImage('assets/images/ufo.png');
    explosion = loadImage('assets/sprites/explosion.png');
    fish = loadImage('assets/images/fish.png');
    damagedUfo = loadImage('assets/images/damagedUfo.png');
    coin = loadImage('assets/images/coin.png');
    // Load variety of hearts

    heartImages[0] = loadImage('assets/images/heart1.png');
    heartImages[1] = loadImage('assets/images/heart2.png');
    heartImages[2] = loadImage('assets/images/heart3.png');
    heartImages[3] = loadImage('assets/images/heart4.png');
    damagedUfo = loadImage('assets/images/damagedUfo.png');
    snowball = loadImage('assets/images/snowball.png');
    freezingUfo = loadImage('assets/sprites/freezingUfo.png');
    frozenUfo = loadImage('assets/images/frozenUfo.png');
    arrow = loadImage('assets/sprites/arrow.png');
    ufoArrowImpact = loadImage('assets/sprites/ufoArrowImpact.png');
    greenLaser = loadImage('assets/images/greenLaser.png');
    purpleLaser = loadImage('assets/images/purpleLaser.png');

    loadSounds();

    homeBackground = loadImage('assets/gifs/background.gif');
    logo = loadImage('assets/images/learnToFly.png');
    playNoPressed = loadImage('assets/images/playButton.png');
    playIsPressed = loadImage('assets/images/playButtonHover.png');
    workshopBackground = loadImage('assets/images/workshop_background.png');
}

function loadSounds() {
    let volume = 0.2;
    windSound = loadSound('assets/sounds/windSound.mp3');
    laserSound = loadSound('assets/sounds/laser.mp3');
    laserSound.setVolume(volume);
    laserAutomaticSound = loadSound('assets/sounds/laserAutomatic.mp3');
    laserAutomaticSound.setVolume(volume);
    explosionSound = loadSound('assets/sounds/explosionSound.mp3');
    explosionSound.setVolume(volume);
    deathSound = loadSound('assets/sounds/deathSound.mp3');
    deathSound.setVolume(volume);
    fishThrow = loadSound('assets/sounds/fishThrow.mp3');
    fishThrow.setVolume(volume);
    fishImpactSound = loadSound('assets/sounds/fishImpactSound.mp3');
    fishImpactSound.setVolume(volume);
    forceFieldSound = loadSound('assets/sounds/forceFieldSound.mp3');
    forceFieldSound.setVolume(volume);
    purchaseSound = loadSound('assets/sounds/purchaseSound.mp3');
    purchaseSound.setVolume(volume);
    illegalPurchaseSound = loadSound('assets/sounds/illegalPurchaseSound.mp3');
    illegalPurchaseSound.setVolume(volume);
    snowballSound = loadSound('assets/sounds/snowballSound.mp3');
    snowballSound.setVolume(volume);
    freezeSound = loadSound('assets/sounds/freezeSound.mp3');
    freezeSound.setVolume(volume/2);
    arrowSound = loadSound('assets/sounds/arrowSound.mp3');
    arrowSound.setVolume(volume/2);
    ufoArrowImpactSound = loadSound('assets/sounds/ufoArrowImpactSound.mp3');
    ufoArrowImpactSound.setVolume(volume);
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
    let newWidth = window.innerWidth - 20*2; // Subtract the margin off
    let newHeight = window.innerHeight - 20*2;

    // Pick the larger of two
    if (newWidth / newHeight > aspectRatio) newWidth = newHeight * aspectRatio;
    else newHeight = newWidth / aspectRatio;

    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
    canvas.style.imageRendering = "pixelated"; // Ensures crisp pixels
}

function hoveringOverButton(pos, size) {
    return mouseX > pos.x - size.x/2 && mouseX < pos.x + size.x/2 &&
        mouseY > pos.y - size.y/2 && mouseY < pos.y + size.y/2;
}
