

let Domain = 'shop'; // Determines which part of the game code is executed

let game = null;
let page = null;
let shop = null;


function setup() {

    page = new Page();
    //shop = new Workshop();
    // instantiate workshop, main menu, etc objects here
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
