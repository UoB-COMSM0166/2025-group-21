let instructionShown = false;
let gameStarted = false;
let okButtonX, okButtonY, okButtonWidth = 120, okButtonHeight = 60;


function preload() {
    gloriaFont = loadFont("gloria.ttf");
}


function setup() {
    createCanvas(windowWidth, windowHeight);
}


//just a sketch
function draw() {
    background(240, 248, 255);

    if (!instructionShown) {
        drawInstructionPage();
    } else if (!gameStarted) {
        drawMenu();
    } else {
        drawGameScreen();
    }
}


function drawInstructionPage() {
    push();
    fill('white');
    stroke('black');
    strokeWeight(4);
    rectMode(CENTER);
    let boxWidth = width * 0.6;
    let boxHeight = height * 0.65;
    let boxX = width / 2;
    let boxY = height / 2;
    rect(boxX, boxY, boxWidth, boxHeight, 20);
    pop();

    // instruction
    push();
    textSize(23);
    textFont(gloriaFont);
    fill('black');
    textAlign(CENTER, TOP);
    let instructions = "* Instruction *\n\nControl the penguin to slide down the icy slope. When you hold down the space bar, the penguin will accelerate downward. Choose the right moment to press the space bar and soar gracefully through the air.Be careful not to crash into the glacier!\n\n\n\n\n\n\n\n\n\n\n[P.S.]\n\nPress ESC to pause the game or enter the shop to purchase items.";
    boxWidth = width * 0.6;
    let lineHeight = 20;
    let textStartY = height / 2 - boxHeight / 2 + 40;
    let lines = instructions.split('\n');
    for (let i = 0; i < lines.length; i++) {
        text(lines[i], width / 2 - boxWidth / 2 + 20, textStartY + i * lineHeight, boxWidth - 40);
    }
    pop();

    // draw ok button
    okButtonX = width / 2;
    okButtonY = height * 0.8 + 20;

    push();
    fill(isMouseOverOkButton() ? 'blue' : 'green');
    stroke('black');
    strokeWeight(3);
    rectMode(CENTER);
    rect(okButtonX, okButtonY, okButtonWidth, okButtonHeight, 15);

    fill('white');
    textSize(28);
    textAlign(CENTER, CENTER);
    textFont(gloriaFont);
    text('OK', okButtonX, okButtonY-8);
    pop();
}


function isMouseOverOkButton() {
    return mouseX > okButtonX - okButtonWidth / 2 && mouseX < okButtonX + okButtonWidth / 2 &&
        mouseY > okButtonY - okButtonHeight / 2 && mouseY < okButtonY + okButtonHeight / 2;
}





// link to other pages...
function mousePressed() {
    // press OK then entering main menu
    if (!instructionShown && isMouseOverOkButton()) {
        instructionShown = true;
    }

    // click start
    if (instructionShown && !gameStarted && mouseY > height / 2 - 50 && mouseY < height / 2 + 50) {
        gameStarted = true;
    }
}

// link to other pages...
function drawMenu() {
    background(200, 220, 255);
    textSize(32);
    fill('black');
    textAlign(CENTER, CENTER);
    text('gameplay...', width / 2, height / 2);
}



