

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

let homeBackground;
let logo;
let playNoPressed;
let playIsPressed;
let workshopBackground;

function setup() {

    page = new Page();
    inventory = new Inventory();
}

function draw() {
    if (Domain === 'home') {
        if (homescreen === null) {
            //loadSounds();
            homescreen = new Homescreen();
            homescreen.resetAnimation();
        }
        homescreen.showHomescreen();
    }

    if (Domain === 'shop') {
        if (shop === null) {
            loadSounds();
            shop = new Workshop();
        }
        shop.openShop();
    }

    if (Domain === 'game') {
        if (game === null) {
            //loadSounds();
            game = new Game();
        }
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
    damagedUfo = loadImage('assets/images/damagedUfo.png');
    snowball = loadImage('assets/images/snowball.png');
    freezingUfo = loadImage('assets/sprites/freezingUfo.png');
    frozenUfo = loadImage('assets/images/frozenUfo.png');
    arrow = loadImage('assets/sprites/arrow.png');
    ufoArrowImpact = loadImage('assets/sprites/ufoArrowImpact.png')

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
