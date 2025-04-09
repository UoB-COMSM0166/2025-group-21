

class Pause {

    constructor() {
        this.active = false;
        this.fieldsReset = true;
        this.opacity = 0;
        this.buttons = [];
        this.selectedButtonIndex = -1;
        this.backgroundDrawn = false;
        this.countdown = null;
        this.isCountingDown = false;
        this.invPanel = new InvPanel();
    }

    showPauseScreen() {

        if (this.fieldsReset) {
            document.body.classList.add("show-cursor");
            this.createButtons();
            this.fieldsReset = false;
        }

        this.updateButtonPositions();
        if (!this.isCountingDown) {
            this.drawCloth();
        }

        this.invPanel.draw();
        this.backgroundDrawn = true;

    }

    drawCloth() {
        push();
        this.opacity = lerp(this.opacity, 100, 0.2);
        fill(0, 0, 0, this.opacity);
        rect(0, 0, window.innerWidth, window.innerHeight);
        pop();
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
        // If inventory panel is visible, handle its navigation
        if (this.invPanel.isVisible()) {
            if (direction === 1) { // Down arrow
                this.invPanel.setCloseButtonSelected(true);
            }
            // We don't need up arrow logic for inventory panel since there's only one button
            return;
        }
        if (this.buttons.length === 0) return;

        this.selectedButtonIndex = (this.selectedButtonIndex + direction + this.buttons.length) % this.buttons.length;
        this.updateButtonStyles();
    }

    selectCurrentButton() {
        // If inventory panel is visible, check if we need to activate its close button
        if (this.invPanel.isVisible()) {
            this.invPanel.activateCloseButton();
            return;
        }
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
        // If inventory panel is open, close it first
        if (this.invPanel.isVisible()) {
            this.invPanel.hide();
            return;
        }
        this.removeButtonsForCountdown();
        this.countdown = new Countdown();
        this.isCountingDown = true;
    }

    removeButtonsForCountdown() {
        for (let btn of this.buttons) {
            btn.remove();
        }
        this.buttons = [];
        this.opacity = 0;
    }

    inventoryButtonPressed() {
        for (let btn of this.buttons) {
            btn.hide();
            btn.style('z-index', '-1');
        }
        this.invPanel.show();
    }

    settingButtonPressed() {
        for (let btn of this.buttons) {
            btn.remove();
        }
        this.buttons = [];
        this.fieldsReset = true;
        Domain = 'setting';
        setting = new Setting('pause');
    }

    quitButtonPressed() {
        this.reset();
        game = null;
        Domain = 'mainMenu';
    }

    showCountdown() {
        if (this.countdown) {
            this.countdown.display();
            if (this.countdown.completed) {
                this.isCountingDown = false;
                this.active = false;
                this.reset();
                this.countdown = null;
                return false;
            }
            return true;
        }
        return false;
    }

    reset() {
        if (!this.fieldsReset) {
            this.opacity = 0;
            document.body.classList.remove("show-cursor");
            for (let btn of this.buttons) {
                btn.remove();
            }
            this.buttons = [];
            this.invPanel.hide();
            this.selectedButtonIndex = -1;
            this.fieldsReset = true;
            this.backgroundDrawn = false;
        }
    }
}