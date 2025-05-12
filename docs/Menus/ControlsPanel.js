

class ControlsPanel {

    constructor() {
        this.key = null;
        this.keyboardActive = false;
        this.selectedButtonIndex = -1;
        this.buttonCount = 5; // boost, shoot, fly, shield, back
    }

    resetNavigation() {
        this.keyboardActive = false;
        this.selectedButtonIndex = -1;
    }

    handleKeyNavigation(keyCode) {
        // If waiting for a new key input, don't process navigation
        if (this.key !== null) return;

        if (keyCode === UP_ARROW) {
            this.moveSelection(-1);
        } else if (keyCode === DOWN_ARROW) {
            this.moveSelection(1);
        } else if (keyCode === ENTER) {
            this.activateSelectedButton();
        }
    }

    // Run keyboard navigation movement
    moveSelection(direction) {
        if (!this.keyboardActive) {
            this.keyboardActive = true;
            // Set initial control on first activation
            if (direction > 0) {
                this.selectedButtonIndex = 0;
            } else {
                this.selectedButtonIndex = this.buttonCount - 1;
            }
            return;
        }

        this.selectedButtonIndex = (this.selectedButtonIndex + direction + this.buttonCount) % this.buttonCount;
    }

    // Run keyboard navigation button selection
    activateSelectedButton() {
        if (this.selectedButtonIndex === -1) {
            return;
        }
        if (this.selectedButtonIndex === 4) {
            settings.changeControls = false;
            settings.startCooldown();
            this.resetNavigation();
        } else {
            const controlNames = ['boost', 'shoot', 'fly', 'shield'];
            userIsTyping = true;
            this.key = controlNames[this.selectedButtonIndex];
        }
    }

    // Show button controls
    showPanel() {
        push();
        this.drawLabels();
        let scale = 0.006 * width;
        let size = createVector(changeButton.width / scale, changeButton.height / scale);
        this.updateChangeButton('boost', 0, size);
        this.updateChangeButton('shoot', 1, size);
        this.updateChangeButton('fly', 2, size);
        this.updateChangeButton('shield', 3, size);
        this.updateBackButton()

        if (settings.buttonCooldownTimer.time > 0) {
            settings.updateButtonCooldown();
        }

        if (this.key !== null) {
            this.getNewKeyFromUser();
        }
        pop();
    }

    // Update the controls from the keys selected via user input
    getNewKeyFromUser() {
        push();
        fill('rgba(0,0,0,0.8)');
        rect(0, 0, width, height);
        let size = width/10
        fill('rgb(209,232,255)');
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke('rgb(21,37,58)');
        strokeWeight(size/15);
        textSize(size/1.5);
        text('Select key', width/2, height/2); // title
        pop();

        if (inputCharacter !== null) {
            switch (this.key) {
                case 'boost':
                    if (settings.keyIsAvailable(inputCharacter)) {
                        settings.boostKey = inputCharacter;
                    }
                    break;
                case 'shoot':
                    if (settings.keyIsAvailable(inputCharacter)) {
                        settings.shootKey = inputCharacter;
                    }
                    break;
                case 'fly':
                    if (settings.keyIsAvailable(inputCharacter)) {
                        settings.flyKey = inputCharacter;
                    }
                    break;
                case 'shield':
                    if (settings.keyIsAvailable(inputCharacter)) {
                        settings.shieldKey = inputCharacter;
                    }
                    break;
            }
            this.key = null;
            settings.buttonsActive = true;
            inputCharacter = null;
            userIsTyping = false;
            this.resetNavigation();
        }
    }

    // Update display for change button
    updateChangeButton(name, id, size) {
        imageMode(CENTER);
        let pos = createVector(0.63*width, (0.35 + 0.1*id)*height);

        if (hoveringOverButton(pos, size)) {
            image(changeButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && settings.buttonsActive) {
                settings.buttonsActive = false;
                userIsTyping = true;
                this.key = name;
            }
        }
        else if (this.key === name) {
            image(changeButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else if (this.keyboardActive && this.selectedButtonIndex === id) {
            image(changeButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else image(changeButton, pos.x, pos.y, size.x, size.y);
    }

    // Update display for back button
    updateBackButton() {
        let scale = 0.002 * width;
        let size = createVector(backButton.width / scale, backButton.height / scale);
        let pos = createVector(0.5*width, 0.8*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(backButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && settings.buttonsActive) {
                settings.changeControls = false;
                settings.startCooldown();
                this.resetNavigation();
            }
        }
        else if (this.keyboardActive && this.selectedButtonIndex === 4) {
            image(backButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else image(backButton, pos.x, pos.y, size.x, size.y);
    }

    // print the current controls to the screen
    drawLabels() {
        let size = width/10
        fill('rgb(21,37,58)');
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke('rgb(21,37,58)');
        strokeWeight(size/30);
        textSize(size/1.5);
        text('Controls', width/2, 0.2*height); // title

        size = width/25
        textAlign(LEFT);
        strokeWeight(size/30);
        textSize(size/1.5);
        let boostKey = settings.boostKey === ' ' ? 'Spacebar' : settings.boostKey;
        let shootKey = settings.shootKey === ' ' ? 'Spacebar' : settings.shootKey;
        let flyKey = settings.flyKey === ' ' ? 'Spacebar' : settings.flyKey;
        let shieldKey = settings.shieldKey === ' ' ? 'Spacebar' : settings.shieldKey;
        text(`Boost: ${boostKey}`, 0.315*width, 0.35*height);
        text(`Shoot: ${shootKey}`, 0.315*width, 0.45*height);
        text(`Fly: ${flyKey}`, 0.315*width, 0.55*height);
        text(`Shield: ${shieldKey}`, 0.315*width, 0.65*height);
    }
}