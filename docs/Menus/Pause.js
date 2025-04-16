

class Pause {

    constructor() {
        this.active = false;
        this.fieldsReset = true;
        this.opacity = 0;
        this.selectedButtonIndex = -1;
        this.countdown = null;
        this.isCountingDown = false;
        this.invPanel = new InvPanel();

        this.showButtons = false
        this.returnToShop = false;
        this.showInvPanel = false;

        this.showSettings = false;
        this.buttonCooldownTimer = new Clock();
        this.buttonsActive = true;
    }

    showPauseScreen() {

        if (this.fieldsReset) {
            document.body.classList.add("show-cursor");
            this.showButtons = true;
            this.fieldsReset = false;
        }
        if (this.buttonCooldownTimer.time > 0) {
            this.updateButtonCooldown();
        }
        if (this.showSettings) {
            settings.showSettingsScreen();
        }
        else {
            this.drawCloth();

            if (this.showInvPanel) {
                this.invPanel.draw();
            }
            else this.updateButtons();

            if (this.returnToShop) {
                this.shopButtonPressed();
            }
        }
    }

    updateButtonCooldown() {
        this.buttonCooldownTimer.tick();

        if (this.buttonCooldownTimer.time > 30) {
            this.buttonCooldownTimer.reset();
            this.buttonsActive = true
        }
    }

    startCooldown() {
        this.buttonsActive = false;
        this.buttonCooldownTimer.tick();
    }

    updateButtons() {
        if (!this.showButtons) return;

        // button positions
        let continue_ = createVector(0.5*width, 0.35*height);
        let inventory = createVector(0.5*width, 0.45*height);
        let shop = createVector(0.5*width, 0.55*height);
        let settings = createVector(0.5*width, 0.65*height);

        this.updateButton(0, continue_, continueButton, continueButtonHover, this.continueButtonPressed)
        this.updateButton(1, inventory, inventoryButton, inventoryButtonHover, () => game.pause.showInvPanel = true);
        this.updateButton(2, shop, pauseShopButton, pauseShopButtonHover, () => game.pause.returnToShop = true);
        this.updateButton(3, settings, pauseSettingsButton, pauseSettingsButtonHover, this.settingButtonPressed);
    }

    updateButton(buttonID, pos, buttonDefault, buttonHover, buttonPressed) {
        push();
        let scale = 0.006 * width;
        let size = createVector(buttonDefault.width / scale, buttonDefault.height / scale);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(buttonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && this.buttonsActive) {
                buttonPressed();
            }
        }
        else if (this.selectedButtonIndex === buttonID) {
            image(buttonHover, pos.x, pos.y, size.x, size.y);
        }
        else {
            image(buttonDefault, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    drawCloth() {
        push();
        this.opacity = lerp(this.opacity, 100, 0.4);
        fill(0, 0, 0, this.opacity);
        rect(0, 0, width, height);
        pop();
    }

    // using up and down arrow keys
    moveSelection(direction) {
        this.selectedButtonIndex = (this.selectedButtonIndex + direction + 4) % 4;
    }

    selectCurrentButton() {
        // If inventory panel is visible, check if we need to activate its close button
        if (this.showInvPanel) {
            this.invPanel.isCloseButtonSelected = true;
            return;
        }
        if (this.selectedButtonIndex !== -1) { // && this.selectedButtonIndex < this.buttons.length
            // Execute the appropriate action based on the selected button
            if (this.selectedButtonIndex === 0) {
                this.continueButtonPressed();
            } else if (this.selectedButtonIndex === 1) {
                this.showInvPanel = true;
            } else if (this.selectedButtonIndex === 2) {
                this.shopButtonPressed();
            } else if (this.selectedButtonIndex === 3) {
                this.settingButtonPressed();

            }
        }
    }

    continueButtonPressed() {
        document.body.classList.remove("show-cursor");

        if (settings.difficulty !== settings.currentDifficulty) {
            settings.currentDifficulty = settings.difficulty;
            game = null;
        }
        else {
            game.pause.showButtons = false;
            game.pause.countdown = new Countdown();
            game.pause.isCountingDown = true;
        }
    }

    settingButtonPressed() {
        // console.log(game.pause.buttonsActive);
        // if (!game.pause.buttonsActive) {
        //     return;
        // }
        game.pause.showSettings = true;
        settings.startCooldown();
    }

    shopButtonPressed() {
        game.pause.reset();
        game.disconnectAudio();
        game = null;
        Domain = 'shop';
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
            this.selectedButtonIndex = -1;
            this.fieldsReset = true;
        }
    }
}