

let Domain = 'shop'; // Determines which part of the game code is executed

let game = null;
let page = null;
let shop = null;
let inventory = null;
let playerImg = null;

function setup() {

    page = new Page();
    inventory = new Attributes();
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
}
