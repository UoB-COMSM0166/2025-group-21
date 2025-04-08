

let Domain = 'intro'; // Determines which part of the game code is executed

let intro = null;
let mainMenu = null;
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

let homeBackground;
let logo;
let playNoPressed;
let playIsPressed;

//----------------Preload function for assets----------------
function preload() {
    preloadBackgroundImages();
}
//-----------------------------------------------------------


function setup() {

    page = new Page();
    inventory = new Inventory();
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
        mainMenu.showMainMenu();
    }

    if (Domain === 'shop') {
        if (shop === null) shop = new Workshop();
        shop.openShop();
    }

    if (Domain === 'game') {
        if (game === null) game = new Game();
        game.runSimulation();

        if (game.pause.isCountingDown) {
            game.pause.showCountdown();
        }
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
    penguinFlyGif = loadImage('assets/gifs/penguinFly.gif');
    penguinSpinGif = loadImage('assets/gifs/penguinSpin.gif');
    keyboardIcon = loadImage('assets/images/keyboardIcon.png');
}
