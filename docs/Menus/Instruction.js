class Instruction {
    constructor() {
        document.body.classList.remove("show-cursor");
        this.selectedButtonIndex = -1;

    }

    draw() {
        background(240, 248, 255);
        imageMode(CORNER);
        image(blurredHomeBackground, 0, 0, width, height);

        let boxWidth = width * 0.9;
        let boxHeight = height * 0.9;


        push();
        imageMode(CENTER);
        image(tipsBox, width / 2, height / 2, boxWidth, boxHeight);
        pop();

        this.drawInstructions(boxWidth, boxHeight);

        this.drawClawButton(boxWidth, boxHeight);
        this.updateMainMenuButton();
    }

    drawInstructions(boxWidth, boxHeight) {
        push();
        textFont(instructionFont);
        fill(0);
        textAlign(LEFT, TOP);
        textSize(width * 0.018);

        let textMargin = boxWidth * 0.01;
        let textX = width / 2 - boxWidth / 3 + textMargin;
        let textY = height / 2 - boxHeight / 4 + textMargin;
        let textW = boxWidth - textMargin * 2;
        let textH = boxHeight - textMargin * 2;

        let instructionsText =
            "As a penguin studying computer science, you don't need a pair of wings\n" +
            "to learn how to fly. Instead, you'll need to follow the commands below: \n\n" +
            "1. When on the ground, press [space] to build up speed\n" +
            "2. When in the air, press [space] to speed up your descent\n" +
            "3. Press [W] to take off (when you feel the time is right) \n" +
            "4. Press [F] to go invincible \n" +
            "5. Press [D] to launch laser\n" +
            "6. Press [Esc] to invoke the pause menu  \n\n" +
            "...Well, good luck! Press penguin paw print below to start the game!";

        text(instructionsText, textX, textY, textW, textH);
        pop();
    }

    drawClawButton(boxWidth, boxHeight) {
        const buttonWidth = boxWidth  * 0.15;
        const buttonHeight = boxHeight * 0.08;

        const boxX = (width  - boxWidth)  / 2;
        const boxY = (height - boxHeight) / 2;

        const gap  = -70;

        const x = boxX + (boxWidth - buttonWidth) / 2;
        const y = boxY +  boxHeight + gap;

        let isHover = mouseX > x && mouseX < x + buttonWidth
                              && mouseY > y && mouseY < y + buttonHeight;
        if (isHover || this.selectedButtonIndex === 0) {
            push();
            noStroke();
            fill(135, 206, 235, 127);
            rect(x, y, buttonWidth, buttonHeight, 8);
            pop();
        }
        image(penguinClaw, x, y, buttonWidth, buttonHeight);

        if (isHover && mouseIsPressed && domains.mainMenu.cursorVisible) {
            this.continueButtonPressed();
        }

    }

    moveSelection(direction) {
        this.selectedButtonIndex = direction > 0 ? 0 : -1;
    }

    selectCurrentButton() {
        if (this.selectedButtonIndex === 0) {
            this.continueButtonPressed();
        }
    }

    continueButtonPressed() {
        domains.mainMenu = null;
        Domain = 'game';
    }

    updateMainMenuButton() {
        push();
        let scale = 0.008 * width;
        let size = createVector(mainMenuButton.width / scale, mainMenuButton.height / scale);
        let pos = createVector(0.935 * width, 0.04 * height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) && domains.mainMenu.cursorVisible) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                domains.mainMenu.instructions = null;
                domains.mainMenu.resetButtons();
            }
        }
        else if (this.selectedButtonIndex === 1) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else image(mainMenuButton, pos.x, pos.y, size.x, size.y);
        pop();
    }

    handleKeyNav(key) {
        if (key === UP_ARROW || key === DOWN_ARROW) {
            domains.mainMenu.hideCursor();

            if (this.selectedButtonIndex === -1) {
                this.selectedButtonIndex = 0;
            }
            else this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 2;
        }
        else if (key === ENTER) {
            domains.mainMenu.hideCursor();

            if (this.selectedButtonIndex === 0) {
                this.continueButtonPressed();
            }
            else {
                domains.mainMenu.instructions = null;
                domains.mainMenu.resetButtons();
            }
        }
    }
}
