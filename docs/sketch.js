

let Domain = 'game'; // Determines which part of the game code is executed

let game = null;
let page = null;


function setup() {

    page = new Page();
    // instantiate workshop, main menu, etc objects here
}

function draw() {

    if (Domain === 'game') {

        if (game === null) {
            game = new Game();
        }
        game.runSimulation();
    }
}
