class MainMenu {
    constructor() {
        this.cursorVisible = false;
        this.hideCursor();

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
            [2, 3],
            [4, 5],
            [6, 6]
        ];
        this.currentRow = 0;
        this.currentCol = 0;
        this.anyKeyPressed = false;
        this.showButtons = false;

        this.instructions = null;
        this.showSettings = false;
        this.highscores = null;
        this.showCredits = false;
        this.creditsMenuButtonSelected = false;

        this.hoverPopSound     = null;
        this.buttonPressedSound = null;
        this.masterVolume      = settings.masterVolume * settings.mute;
        this.soundsLoaded      = false;

        this.wasHoveringButtons = [false, false, false, false, false, false];
        this.wasMousePressed    = false;

        this.loadAudio().then(() => this.soundsLoaded = true);
    }

    async loadAudio() {
        this.hoverPopSound      = await soundBoard.getSound('hoverPopSound');
        this.buttonPressedSound = await soundBoard.getSound('buttonPressedSound');
        setMasterVolume(this.masterVolume);
    }

    // Set main menu buttons
    updateButtons() {
        if (!this.showButtons) return;

        // button positions
        let startGame = createVector(0.38*width, 0.58*height);
        let shop = createVector(0.62*width, 0.58*height);
        let instructions = createVector(0.38*width, 0.68*height);
        let settings = createVector(0.62*width, 0.68*height);
        let highscores = createVector(0.38*width, 0.78*height);
        let credits = createVector(0.62*width, 0.78*height);

        // update buttons
        this.updateButton(0, startGame, startGameButton, startGameButtonHover, this.startButtonPressed)
        this.updateButton(1, shop, shopButton, shopButtonHover, this.shopButtonPressed);
        this.updateButton(2, instructions, instructionsButton, instructionsButtonHover, this.instructionsButtonPressed);
        this.updateButton(3, settings, settingsButton, settingsButtonHover, this.settingButtonPressed);
        this.updateButton(4, highscores, highscoresButton, highscoresButtonHover, this.highscoresButtonPressed);
        this.updateButton(5, credits, creditsButton, creditsButtonHover, this.creditsButtonPressed);
    }

    updateButton(buttonID, pos, buttonDefault, buttonHover, buttonPressed) {
        push();
        let scale = 0.008 * width;
        let size = createVector(buttonDefault.width / scale, buttonDefault.height / scale);
        imageMode(CENTER);

        const isHover = hoveringOverButton(pos, size);

        if (isHover && !this.wasHoveringButtons[buttonID] && this.cursorVisible) {
            this.hoverPopSound?.play();
        }
        this.wasHoveringButtons[buttonID] = isHover;

        if (isHover && this.cursorVisible) {
            image(buttonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed && !this.wasMousePressed) {
                this.buttonPressedSound?.play();
                this.wasMousePressed = true;
                buttonPressed();
            }
        }
        else if (this.selectedButtonIndex === buttonID) {
            image(buttonHover, pos.x, pos.y, size.x, size.y);
        }
        else {
            image(buttonDefault, pos.x, pos.y, size.x, size.y);
        }
        if (!mouseIsPressed) this.wasMousePressed = false;
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

    settingButtonPressed() {
        domains.mainMenu.showSettings = true;
        settings.keyNav.resetSelection();
        settings.startCooldown();
        domains.mainMenu.selectedButtonIndex = -1;
    }

    highscoresButtonPressed() {
        domains.mainMenu.highscores = new Highscores();
        domains.mainMenu.highscores.loadHighscores();
        domains.mainMenu.selectedButtonIndex = -1;
    }

    instructionsButtonPressed() {
        domains.mainMenu.instructions = new Instruction();
        domains.mainMenu.selectedButtonIndex = -1;
    }

    creditsButtonPressed() {
        domains.mainMenu.showCredits = true
        domains.mainMenu.selectedButtonIndex = -1;
    }

    // main loop
    showMainMenu() {
        //this.listenForMouseMove();

        // Draw background
        //background(240, 248, 255);
        imageMode(CORNER);
        image(blurredHomeBackground, 0, 0, width, height);

        // executed if high scores button is pressed
        if (this.highscores) {
            this.highscores.printHighscores();
            return;
        }
        // executed if credits button is pressed
        if (this.showCredits) {
            this.showCreditsScreen();
            return;
        }
        // executed if instructions button is pressed
        if (this.instructions) {
            this.instructions.draw();
            return;
        }

        this.updateAnimation();
        this.updateButtons();
        this.updateDonateButton();

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

    showCreditsScreen() {
        let boxWidth = width * 0.9;
        let boxHeight = height * 0.9;


        push();

        imageMode(CENTER);
        // draw paper box
        image(tipsBox, width / 2, height / 2, boxWidth, boxHeight);

        // print text
        textFont(instructionFont);
        fill(0);
        textAlign(CENTER);
        textSize(width * 0.025);
        text('PengWings Development Team', width/2, 0.35*height);

        let devTeam = 'Tom Raynes\nJack May\nNico Esgeb\nKuan Jung Huang\nJing Yao\nZhiling Liu';
        textSize(width * 0.02);
        text(devTeam, width/2, 0.45*height);

        pop();

        this.updateCreditsMainMenuButton();
    }

    updateCreditsMainMenuButton() {
        push();
        let scale = 0.008 * width;
        let size = createVector(mainMenuButton.width / scale, mainMenuButton.height / scale);
        let pos = createVector(0.935 * width, 0.04 * height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) && this.cursorVisible) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.showCredits = false;
                this.resetButtons();
            }
        }
        else if (this.creditsMenuButtonSelected) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else image(mainMenuButton, pos.x, pos.y, size.x, size.y);
        pop();
    }

    handleCreditsKeyNav(key) {
        if (key === UP_ARROW || key === DOWN_ARROW) {
            this.creditsMenuButtonSelected = true;
            this.hideCursor();
        }
        else if (key === ENTER) {
            this.hideCursor();

            if (this.creditsMenuButtonSelected) {
                this.showCredits = false;
                this.resetButtons();
                this.creditsMenuButtonSelected = false;
            }
            else this.creditsMenuButtonSelected = true;
        }
    }

    resetButtons() {
        this.selectedButtonIndex = -1
        this.currentRow = 0;
        this.currentCol = 0;
        this.anyKeyPressed = false;
    }

    handleKeyNavigation(keyCode) {
        if (!this.animationComplete) return;

        if (this.showCredits) {
            this.handleCreditsKeyNav(keyCode);
            return;
        }
        else if (this.instructions !== null) {
            this.instructions.handleKeyNav(keyCode);
            return;
        }
        else if (this.highscores != null) {
            this.highscores.handleKeyNav(keyCode);
            return;
        }

        if (!this.anyKeyPressed) {
            this.hideCursor();
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
                if (this.currentRow < 3) {
                    this.currentRow ++;
                }
                break;
            case LEFT_ARROW:
                if (this.currentCol > 0 && this.currentRow < 3) {
                    this.currentCol --;
                }
                break;
            case RIGHT_ARROW:
                if (this.currentCol < 1 && this.currentRow < 3) {
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
                this.instructions = new Instruction();
            } else if (this.selectedButtonIndex === 3) {
                this.settingButtonPressed();
            } else if (this.selectedButtonIndex === 4) {
                this.highscoresButtonPressed();
            } else if (this.selectedButtonIndex === 5) {
                this.showCredits = true;
            } else if (this.selectedButtonIndex === 6) {
                window.open("https://www.globalpenguinsociety.org/", "_blank");
            }
        }
    }

    updateDonateButton() {
        if (!this.showButtons) return;

        push();
        let scale = 0.005 * width;
        let size = createVector(donateButton.width / scale, donateButton.height / scale);
        let pos = createVector(0.5*width, 0.88*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) && this.cursorVisible) {
            image(donateButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                window.open("https://www.globalpenguinsociety.org/", "_blank");
            }
        }
        else if (this.selectedButtonIndex === 6) {
            image(donateButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else {
            image(donateButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    showCursor() {
        document.body.classList.add("show-cursor");
        this.cursorVisible = true;
    }

    hideCursor() {
        document.body.classList.remove("show-cursor");
        this.cursorVisible = false;
    }
}
