

class Pause {

    constructor() {
        this.active = false;
        this.fieldsReset = true;
        this.opacity = 0;
        this.buttons = [];
        this.selectedButtonIndex = -1;
        this.backgroundDrawn = false;
    }

    showPauseScreen() {

        if (this.fieldsReset) {
            document.body.classList.add("show-cursor");
            this.createButtons();
            this.fieldsReset = false;
        }

        this.updateButtonPositions();

        this.opacity = lerp(this.opacity, 100, 0.2);
        fill(0, 0, 0, this.opacity);
        rect(0, 0, window.innerWidth, window.innerHeight);

        this.backgroundDrawn = true;
    }

    createButtons() {
        const buttonLabels = ["CONTINUE", "INVENTORY", "SETTING", "QUIT"];
        const buttonActions = [
            () => this.continueButtonPressed(),
            () => this.inventoryButtonPressed(),
            () => this.settingButtonPressed(),
            () => this.quitButtonPressed()
        ];

        for (let i = 0; i < buttonLabels.length; i++) {
            let btn = createButton(buttonLabels[i]);
            btn.class('playButton');
            btn.mousePressed(buttonActions[i]);
            this.buttons.push(btn);
            btn.show();
        }
    }

    updateButtonPositions() {
        if (this.buttons.length === 0) return;

        let buttonWidth = page.pageWidth * 0.4;
        let buttonHeight = page.pageHeight / 10;
        let totalHeight = this.buttons.length * buttonHeight + (this.buttons.length - 1) * (page.pageHeight * 0.03);
        let startX = (page.pageWidth - buttonWidth) / 2;
        let startY = (page.pageHeight - totalHeight) / 2;

        let fontSize = buttonHeight * 0.3;
        let fontSizeRem = (fontSize / 16).toFixed(2) + 'rem';

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].position(
                page.xPadding + page.margin + startX,
                page.yPadding + page.margin + startY + i * (buttonHeight + page.pageHeight * 0.03)
            );
            this.buttons[i].size(buttonWidth, buttonHeight);
            this.buttons[i].style('font-size', fontSizeRem);
            this.buttons[i].style('display', 'flex');
            this.buttons[i].style('align-items', 'center');
            this.buttons[i].style('justify-content', 'center');
            this.buttons[i].style('padding', '0');

        }
    }

    updateButtonStyles() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].removeClass('selectedButton');

            if (i === this.selectedButtonIndex) {
                this.buttons[i].addClass('selectedButton');
            }
        }
    }

    // using up and down arrow keys
    moveSelection(direction) {
        if (this.buttons.length === 0) return;

        this.selectedButtonIndex = (this.selectedButtonIndex + direction + this.buttons.length) % this.buttons.length;
        this.updateButtonStyles();
    }

    selectCurrentButton() {
        if (this.selectedButtonIndex !== -1 && this.selectedButtonIndex < this.buttons.length) {
            // Execute the appropriate action based on the selected button
            if (this.selectedButtonIndex === 0) {
                this.continueButtonPressed();
            } else if (this.selectedButtonIndex === 1) {
                this.inventoryButtonPressed();
            } else if (this.selectedButtonIndex === 2) {
                this.settingButtonPressed();
            } else if (this.selectedButtonIndex === 3) {
                this.quitButtonPressed();
            }
        }
    }

    continueButtonPressed() {
        this.reset();
        this.active = false;
    }

    inventoryButtonPressed() {
        console.log("Inventory button pressed - functionality to be implemented");
    }

    settingButtonPressed() {
        console.log("Setting button pressed - functionality to be implemented");
    }

    quitButtonPressed() {
        this.reset();
        game = null;
        Domain = 'mainMenu';
    }

    reset() {
        if (!this.fieldsReset) {
            this.opacity = 0;
            document.body.classList.remove("show-cursor");
            for (let btn of this.buttons) {
                btn.remove();
            }
            this.buttons = [];
            this.selectedButtonIndex = -1;
            this.fieldsReset = true;
            this.backgroundDrawn = false;
        }
    }

//    quitButtonPressed() {
//        this.quitButton.remove();
//        game = null;
//        Domain = 'shop';
//
//    }
//
//    updateQuitButton() {
//
//        let textSize = page.pageWidth / 300;
//        let numString = textSize.toString() + 'rem'
//
//        this.quitButton.position(
//            page.xPadding + page.margin + 0.11*page.pageWidth,
//            page.yPadding + page.margin + 0.43*page.pageHeight);
//
//        this.quitButton.class('quitButton')
//        this.quitButton.style('font-size', numString);
//        this.quitButton.size(page.pageWidth*0.8, page.pageHeight/10);
//    }
}