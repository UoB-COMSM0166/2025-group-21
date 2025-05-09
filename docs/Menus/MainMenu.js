class MainMenu {
    constructor() {
        document.body.classList.add("show-cursor");

        this.logoDrawWidth = width * 0.5;
        this.logoDrawHeight = this.logoDrawWidth * (logo.height / logo.width) * 1.2;
        this.logoX = width * 0.5;
        this.logoY = height * 0.4;
        this.targetLogoY = height * 0.3;
        this.iconX = width * 0.5;
        this.iconY = height * 0.95;
        this.iconWidth = height * 0.25;
        this.iconHeight = this.iconWidth * (keyboardIcon.height / keyboardIcon.width);

        this.animationStartTime = millis();
        this.animationDuration = 800;
        this.animationComplete = false;
        this.selectedButtonIndex = -1;
        this.buttonGrid = [
            [0, 1],
            [2, 3]
        ];
        this.currentRow = 0;
        this.currentCol = 0;
        this.anyKeyPressed = false;
        this.showButtons = false;class MainMenu {
            constructor() {
                document.body.classList.add("show-cursor");

                this.logoDrawWidth = width * 0.5;
                this.logoDrawHeight = this.logoDrawWidth * (logo.height / logo.width) * 1.2;
                this.logoX = width * 0.5;
                this.logoY = height * 0.4;
                this.targetLogoY = height * 0.3;
                this.iconX = width * 0.5;
                this.iconY = height * 0.95;
                this.iconWidth = height * 0.25;
                this.iconHeight = this.iconWidth * (keyboardIcon.height / keyboardIcon.width);

                this.animationStartTime = millis();
                this.animationDuration = 800;
                this.animationComplete = false;
                this.selectedButtonIndex = -1;
                this.buttonGrid = [
                    [0, 1],
                    [2, 3]
                ];
                this.currentRow = 0;
                this.currentCol = 0;
                this.anyKeyPressed = false;
                this.showButtons = false;
                this.showSettings = false;
            }

            updateButtons() {
                if (!this.showButtons) return;

                // button positions
                let startGame = createVector(0.38*width, 0.6*height);
                let shop = createVector(0.62*width, 0.6*height);
                let instructions = createVector(0.38*width, 0.7*height);
                let settings = createVector(0.62*width, 0.7*height);

                this.updateButton(0, startGame, startGameButton, startGameButtonHover, this.startButtonPressed)
                this.updateButton(1, shop, shopButton, shopButtonHover, this.shopButtonPressed);
                this.updateButton(2, instructions, instructionsButton, instructionsButtonHover, this.instructionButtonPressed);
                this.updateButton(3, settings, settingsButton, settingsButtonHover, this.settingButtonPressed);
            }

            updateButton(buttonID, pos, buttonDefault, buttonHover, buttonPressed) {
                push();
                let scale = 0.008 * width;
                let size = createVector(buttonDefault.width / scale, buttonDefault.height / scale);
                imageMode(CENTER);

                if (hoveringOverButton(pos, size)) {
                    image(buttonHover, pos.x, pos.y, size.x, size.y);

                    if (mouseIsPressed) {
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

            updateAnimation() {
                let elapsed = millis() - this.animationStartTime;
                let progress = min(1, elapsed / this.animationDuration);

                this.logoY = height * 0.4 + progress * (this.targetLogoY - height * 0.4);

                if (progress >= 1 && !this.animationComplete) {
                    this.animationComplete = true;
                    this.showButtons = true;
                }
            }

            startButtonPressed() {
                domains.mainMenu = null;
                Domain = 'game';
            }

            shopButtonPressed() {
                domains.mainMenu = null;
                Domain = 'shop';
            }

            instructionButtonPressed() {
                domains.mainMenu = null;
                Domain = 'instruction';
            }

            settingButtonPressed() {
                domains.mainMenu.showSettings = true;
                settings.startCooldown();
            }

            showMainMenu() {
                // Draw background
                background(240, 248, 255);
                imageMode(CORNER);
                image(blurredHomeBackground, 0, 0, width, height);

                this.updateAnimation();
                this.updateButtons();

                push();
                // Draw logo
                imageMode(CENTER);
                image(logo, this.logoX, this.logoY, this.logoDrawWidth, this.logoDrawHeight);
                if (this.animationComplete) {
                    image(keyboardIcon, this.iconX, this.iconY, this.iconWidth, this.iconHeight);
                }
                pop();
                imageMode(CORNER);
            }

            handleKeyNavigation(keyCode) {
                if (!this.animationComplete) return;

                if (!this.anyKeyPressed) {
                    this.selectedButtonIndex = 0;
                    this.currentRow = 0;
                    this.currentCol = 0;
                    this.anyKeyPressed = true;
                    return;
                }

                let oldRow = this.currentRow;
                let oldCol = this.currentCol;

                switch(keyCode) {
                    case UP_ARROW:
                        if (this.currentRow > 0) {
                            this.currentRow --;
                        }
                        break;
                    case DOWN_ARROW:
                        if (this.currentRow < 1) {
                            this.currentRow ++;
                        }
                        break;
                    case LEFT_ARROW:
                        if (this.currentCol > 0) {
                            this.currentCol --;
                        }
                        break;
                    case RIGHT_ARROW:
                        if (this.currentCol < 1) {
                            this.currentCol ++;
                        }
                        break;
                    case ENTER:
                        this.selectCurrentButton();
                        break;
                }

                if (oldRow !== this.currentRow || oldCol !== this.currentCol) {
                    this.selectedButtonIndex = this.buttonGrid[this.currentRow][this.currentCol];
                }
            }

            selectCurrentButton() {
                if (this.selectedButtonIndex !== -1) {
                    // Execute the appropriate action based on the selected button
                    if (this.selectedButtonIndex === 0) {
                        this.startButtonPressed();
                    } else if (this.selectedButtonIndex === 1) {
                        this.shopButtonPressed();
                    } else if (this.selectedButtonIndex === 2) {
                        this.instructionButtonPressed();
                    } else if (this.selectedButtonIndex === 3) {
                        this.settingButtonPressed();
                    }
                }
            }
        }
        this.showSettings = false;
    }

    updateButtons() {
        if (!this.showButtons) return;

        // button positions
        let startGame = createVector(0.38*width, 0.6*height);
        let shop = createVector(0.62*width, 0.6*height);
        let instructions = createVector(0.38*width, 0.7*height);
        let settings = createVector(0.62*width, 0.7*height);

        this.updateButton(0, startGame, startGameButton, startGameButtonHover, this.startButtonPressed)
        this.updateButton(1, shop, shopButton, shopButtonHover, this.shopButtonPressed);
        this.updateButton(2, instructions, instructionsButton, instructionsButtonHover, this.instructionButtonPressed);
        this.updateButton(3, settings, settingsButton, settingsButtonHover, this.settingButtonPressed);
    }

    updateButton(buttonID, pos, buttonDefault, buttonHover, buttonPressed) {
        push();
        let scale = 0.008 * width;
        let size = createVector(buttonDefault.width / scale, buttonDefault.height / scale);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(buttonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
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

    updateAnimation() {
        let elapsed = millis() - this.animationStartTime;
        let progress = min(1, elapsed / this.animationDuration);

        this.logoY = height * 0.4 + progress * (this.targetLogoY - height * 0.4);

        if (progress >= 1 && !this.animationComplete) {
            this.animationComplete = true;
            this.showButtons = true;
        }
    }

    startButtonPressed() {
        domains.mainMenu = null;
        Domain = 'game';
    }

    shopButtonPressed() {
        domains.mainMenu = null;
        Domain = 'shop';
    }

    instructionButtonPressed() {
        domains.mainMenu = null;
        Domain = 'instruction';
    }

    settingButtonPressed() {
        domains.mainMenu.showSettings = true;
        settings.startCooldown();
    }

    showMainMenu() {
        // Draw background
        background(240, 248, 255);
        imageMode(CORNER);
        image(blurredHomeBackground, 0, 0, width, height);

        this.updateAnimation();
        this.updateButtons();

        push();
        // Draw logo
        imageMode(CENTER);
        image(logo, this.logoX, this.logoY, this.logoDrawWidth, this.logoDrawHeight);
        if (this.animationComplete) {
            image(keyboardIcon, this.iconX, this.iconY, this.iconWidth, this.iconHeight);
        }
        pop();
        imageMode(CORNER);
    }

    handleKeyNavigation(keyCode) {
        if (!this.animationComplete) return;

        if (!this.anyKeyPressed) {
            this.selectedButtonIndex = 0;
            this.currentRow = 0;
            this.currentCol = 0;
            this.anyKeyPressed = true;
            return;
        }

        let oldRow = this.currentRow;
        let oldCol = this.currentCol;

        switch(keyCode) {
            case UP_ARROW:
                if (this.currentRow > 0) {
                    this.currentRow --;
                }
                break;
            case DOWN_ARROW:
                if (this.currentRow < 1) {
                    this.currentRow ++;
                }
                break;
            case LEFT_ARROW:
                if (this.currentCol > 0) {
                    this.currentCol --;
                }
                break;
            case RIGHT_ARROW:
                if (this.currentCol < 1) {
                    this.currentCol ++;
                }
                break;
            case ENTER:
                this.selectCurrentButton();
                break;
        }

        if (oldRow !== this.currentRow || oldCol !== this.currentCol) {
            this.selectedButtonIndex = this.buttonGrid[this.currentRow][this.currentCol];
        }
    }

    selectCurrentButton() {
        if (this.selectedButtonIndex !== -1) {
            // Execute the appropriate action based on the selected button
            if (this.selectedButtonIndex === 0) {
                this.startButtonPressed();
            } else if (this.selectedButtonIndex === 1) {
                this.shopButtonPressed();
            } else if (this.selectedButtonIndex === 2) {
                this.instructionButtonPressed();
            } else if (this.selectedButtonIndex === 3) {
                this.settingButtonPressed();
            }
        }
    }
}