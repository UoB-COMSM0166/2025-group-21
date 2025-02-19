

let Domain = 'shop'; // Determines which part of the game code is executed

let game = null;
let page = null;
let shop = null;
let inventory = null;

let playerImg = null;
let spriteSheet = null;
let deathSpriteSheet = null
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
let fishImpactCrash = null;

function setup() {

    page = new Page();
    inventory = new Inventory();
}

function draw() {

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
    playerImg = loadImage('assets/player1.png');
    spriteSheet = loadImage('assets/playerFloor.png');
    deathSpriteSheet = loadImage('assets/playerDeath.png');
    ufo = loadImage('assets/ufo.png');
    explosion = loadImage('assets/explosion.png');
    fish = loadImage('assets/fish.png');
    damagedUfo = loadImage('assets/damagedUfo.png')

    laserSound = loadSound('assets/laser.mp3');
    explosionSound = loadSound('assets/explosionSound.mp3');
    deathSound = loadSound('assets/deathSound.mp3');
    windSound = loadSound('assets/windSound.mp3');
    fishThrow = loadSound('assets/fishThrow.mp3');
    fishImpactSound = loadSound('assets/fishImpactSound.mp3')

}
