// Instruction.js

class Instruction {
    constructor() {
        document.body.classList.add("show-cursor");

        this.continueButton = createButton('');
        this.continueButton.html('<img src="assets/images/penguinClaw(1).png" style="width:100%; height:100%;">');
        this.continueButton.class('instructionButton');
        this.continueButton.mousePressed(() => this.continueButtonPressed());
    }

    draw() {
        background(240, 248, 255);
        imageMode(CORNER);
        image(homeBackground, 0, 0, page.pageWidth, page.pageHeight);

        let boxWidth = page.pageWidth * 0.9;
        let boxHeight = page.pageHeight * 0.9;


        push();
        imageMode(CENTER);
        image(tipsBox, page.pageWidth / 2, page.pageHeight / 2, boxWidth, boxHeight);
        pop();

        this.drawInstructions(boxWidth, boxHeight);


        this.updateButton(boxWidth, boxHeight);
    }

    drawInstructions(boxWidth, boxHeight) {
        push();
        textFont(instructionFont);
        fill(0);
        textAlign(LEFT, TOP);
        textSize(page.pageWidth * 0.018);

        let textMargin = boxWidth * 0.01;
        let textX = page.pageWidth / 2 - boxWidth / 3 + textMargin;
        let textY = page.pageHeight / 2 - boxHeight / 4 + textMargin;
        let textW = boxWidth - textMargin * 2;
        let textH = boxHeight - textMargin * 2;

        let instructionsText =
            "As a penguin majoring in computer science, you don't need a pair of wings\n" +
            "to learn how to fly.\n" +
            "Instead, you'll need to follow commands below: \n\n" +
            "1. When on the ground, press [space] to build up speed\n" +
            "2. When in the air, press [space] to speed up your descent\n" +
            "3. Press [W] to take off (when you feel the time is right) \n" +
            "4. Press [F] to go invincible \n" +
            "5. Press [Esc] to invoke the pause menu  \n\n" +
            "....Well, good luck! Press Penguin Pawprint below to start the game!";

        text(instructionsText, textX, textY, textW, textH);
        pop();
    }

    updateButton(boxWidth, boxHeight) {
        let buttonWidth = page.pageWidth * 0.2;
        let buttonHeight = page.pageHeight * 0.1;

        let tipsBoxCenterX = page.pageWidth / 2;
        let tipsBoxCenterY = page.pageHeight / 2;

        let x = page.xPadding + page.margin + (page.pageWidth - buttonWidth) / 2;
        let y = page.yPadding + page.margin +
            (tipsBoxCenterY + boxHeight / 2 - buttonHeight - 10);

        this.continueButton.position(x, y);
        this.continueButton.size(buttonWidth, buttonHeight);
    }


    continueButtonPressed() {
        this.continueButton.remove();
        Domain = 'game';
        game = new Game();
    }

}

if (typeof MainMenu !== 'undefined') {
    MainMenu.prototype.instructionButtonPressed = function() {
        this.removeButtons();
        Domain = 'instruction';
        instruction = new Instruction();
    }
}
