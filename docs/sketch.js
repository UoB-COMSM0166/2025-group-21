

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
    //playerFloor = loadImage('assets/playerFloor.png');
    spriteSheet = loadImage('assets/playerFloor.png');
    deathSpriteSheet = loadImage('assets/playerDeath.png'); // Death animation sprite sheet
    ufo = loadImage('assets/ufo.png');
    explosion = loadImage('assets/explosion.png')
}
