let okButtonX, okButtonY, okButtonWidth = 120, okButtonHeight = 60;


function drawInstructionPage() {
    background(240, 248, 255);

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


    push();
    textSize(23);
    textFont(gloriaFont || "Arial");  // 备用字体
    fill('black');
    textAlign(CENTER, TOP);
    let instructions = "* Instruction *\n\nControl the penguin to slide down the icy slope. When you hold down the space bar, the penguin will accelerate downward. Choose the right moment to press the space bar and soar gracefully through the air. Be careful not to crash into the glacier!\n\n[P.S.]\nPress ESC to pause the game or enter the shop.";

    let textStartY = boxY - boxHeight / 2 + 40;
    let textX = boxX - boxWidth / 2 + 20;
    text(instructions, textX, textStartY, boxWidth - 40);
    pop();


    drawOkButton();
}


function drawOkButton() {
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
    textFont(gloriaFont || "Arial");
    text('OK', okButtonX, okButtonY - 8);
    pop();
}


function isMouseOverOkButton() {
    return mouseX > okButtonX - okButtonWidth / 2 && mouseX < okButtonX + okButtonWidth / 2 &&
        mouseY > okButtonY - okButtonHeight / 2 && mouseY < okButtonY + okButtonHeight / 2;
}


function mousePressed() {
    if (Domain === 'instruction' && isMouseOverOkButton()) {
        Domain = 'shop';  // 进入 Workshop
    }
}

