class MainMenu {
    constructor() {
        document.body.classList.add("show-cursor");

        this.logoDrawWidth = page.pageWidth * 0.7;
        this.logoDrawHeight = this.logoDrawWidth * (logo.height / logo.width) * 1.2;
        this.logoX = page.pageWidth * 0.5;
        this.logoY = page.pageHeight * 0.4;
        this.targetLogoY = page.pageHeight * 0.3;
        this.iconX = page.pageWidth * 0.5;
        this.iconY = page.pageHeight * 0.95;
        this.iconWidth = page.pageWidth * 0.15;
        this.iconHeight = this.iconWidth * (keyboardIcon.height / keyboardIcon.width);

        this.animationStartTime = millis();
        this.animationDuration = 800;
        this.animationComplete = false;

        this.buttons = [];
        this.selectedButtonIndex = -1;
        this.buttonGrid = [
            [0, 1],
            [2, 3]
        ];
        this.currentRow = 0;
        this.currentCol = 0;
        this.anyKeyPressed = false;

        this.setupPenguinAnimation();
        this.createButtons();
        this.hideButtons();
    }

    createButtons() {

        const buttonLabels = ["START GAME", "SHOP", "INSTRUCTION", "SETTING"];
        const buttonActions = [
            () => this.startButtonPressed(),
            () => this.shopButtonPressed(),
            () => this.instructionButtonPressed(),
            () => this.settingButtonPressed()
        ];

        for (let i = 0; i < buttonLabels.length; i++) {
            let btn = createButton(buttonLabels[i]);
            btn.class('menuButton');
            btn.mousePressed(buttonActions[i]);
            this.buttons.push(btn);
            btn.hide(); // Initially hide buttons
        }

    }

    hideButtons() {
        for (let btn of this.buttons) {
            btn.hide();
        }
    }

    showButtons() {
        for (let btn of this.buttons) {
            btn.show();
        }
        this.updateButtonStyles();
    }

    updateAnimation() {
        let elapsed = millis() - this.animationStartTime;
        let progress = min(1, elapsed / this.animationDuration);

        this.logoY = page.pageHeight * 0.4 + progress * (this.targetLogoY - page.pageHeight * 0.4);

        if (progress >= 1 && !this.animationComplete) {
            this.animationComplete = true;
            this.showButtons();
        }
    }

    updateButtonStyles() {
        // Calculate button size based on page size
        let buttonWidth = page.pageWidth * 0.25;
        let buttonHeight = page.pageHeight * 0.1;
        let horizontalSpacing = page.pageWidth * 0.15;
        let verticalSpacing = page.pageHeight * 0.1;


        // Calculate the total width of the button grid
        let totalGridWidth = (2 * buttonWidth) + horizontalSpacing;

        // Calculate left position to center the grid horizontally
        let leftStart = (page.pageWidth - totalGridWidth) / 2;

        let topStart = this.logoY + (this.logoDrawHeight / 2) + (page.pageHeight * 0.1);

        // Calculate appropriate font size relative to button size
        let fontSize = Math.min(buttonWidth * 0.005, buttonHeight * 0.1);
        let fontSizeStr = fontSize.toFixed(2) + 'rem';

        // Set positions for each button in the 2x2 grid
        for (let i = 0; i < this.buttons.length; i++) {
            let row = Math.floor(i / 2);
            let col = i % 2;

            this.buttons[i].position(
                page.xPadding + page.margin + leftStart + (col * (buttonWidth + horizontalSpacing)),
                page.yPadding + page.margin + topStart + (row * (buttonHeight + verticalSpacing))
            );
            this.buttons[i].size(buttonWidth, buttonHeight);
            this.buttons[i].style('font-size', fontSizeStr);

            if (i === this.selectedButtonIndex) {
                this.buttons[i].addClass('selectedButton');
            } else {
                this.buttons[i].removeClass('selectedButton');
            }
        }
    }

    startButtonPressed() {
        this.removeButtons();
        Domain = 'game';
        game = null;
    }

    shopButtonPressed() {
        this.removeButtons();
        Domain = 'shop';
        shop = null;
    }

    instructionButtonPressed() {
        // To be implemented
        console.log("Instruction button pressed");
    }

    settingButtonPressed() {
        // To be implemented
        console.log("Setting button pressed");
    }

    removeButtons() {
        mainMenu = null;
        for (let btn of this.buttons) {
            btn.remove();
        }
        this.buttons = [];
        this.selectedButtonIndex = -1;
        mainMenu = null;
    }

    showMainMenu() {
        // Draw background
        background(240, 248, 255);
        imageMode(CORNER);
        image(homeBackground, 0, 0, page.pageWidth, page.pageHeight);

        this.updateAnimation();
        this.updatePenguinAnimation();

        // Draw logo
        imageMode(CENTER);
        image(logo, this.logoX, this.logoY, this.logoDrawWidth, this.logoDrawHeight);
        if (this.animationComplete) {
            image(keyboardIcon, this.iconX, this.iconY, this.iconWidth, this.iconHeight);
        }
        imageMode(CORNER);

    }

    handleKeyNavigation(keyCode) {
        if (!this.animationComplete)  return;

        if (!this.anyKeyPressed) {
            this.selectedButtonIndex = 0;
            this.currentRow = 0;
            this.currentCol = 0;
            this.anyKeyPressed = true;
            this.updateButtonStyles();
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
                //this.activateSelectedButton();
                this.selectCurrentButton();
                break;
        }

        if (oldRow !== this.currentRow || oldCol !== this.currentCol) {
            this.selectedButtonIndex = this.buttonGrid[this.currentRow][this.currentCol];
            this.updateButtonStyles();
        }
    }

    selectCurrentButton() {
        if (this.selectedButtonIndex !== -1 && this.selectedButtonIndex < this.buttons.length) {
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

    setupPenguinAnimation() {
        this.penguinSize = page.pageWidth * 0.2;
        this.waypoints = [
            {x: -this.penguinSize/2, y: page.pageHeight * 0.5},
            {x: page.pageWidth * 0.5, y: -this.penguinSize/3},
            {x: page.pageWidth + this.penguinSize/2, y: page.pageHeight * 0.5},
            {x: page.pageWidth * 0.5, y: page.pageHeight + this.penguinSize/2}
        ];

        this.currentWaypoint = 0;
        this.nextWaypoint = 1;

        this.penguinX = this.waypoints[0].x;
        this.penguinY = this.waypoints[0].y;

        this.penguinSpeed = page.pageWidth * 0.002;
    }

    updatePenguinAnimation() {
        let targetX = this.waypoints[this.nextWaypoint].x;
        let targetY = this.waypoints[this.nextWaypoint].y;

         // Calculate direction vector
        let dx = targetX - this.penguinX;
        let dy = targetY - this.penguinY;

        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance > this.penguinSpeed) {
            this.penguinX += (dx / distance) * this.penguinSpeed;
            this.penguinY += (dy / distance) * this.penguinSpeed;
        } else {
             this.currentWaypoint = this.nextWaypoint;
             this.nextWaypoint = (this.nextWaypoint + 1) % this.waypoints.length;
        }

        push();
        imageMode(CENTER);
        image(penguinSpinGif, this.penguinX, this.penguinY, this.penguinSize, this.penguinSize);
        pop();
        imageMode(CORNER);
    }

}