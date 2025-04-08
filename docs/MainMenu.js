class MainMenu {
    constructor() {
        document.body.classList.add("show-cursor");

        this.logoDrawWidth = width * 0.7;
        this.logoDrawHeight = this.logoDrawWidth * (logo.height / logo.width) * 1.2;
        this.logoX = width * 0.5;
        this.logoY = height * 0.4;
        this.targetLogoY = height * 0.3;
        this.iconX = width * 0.5;
        this.iconY = height * 0.95;
        this.iconWidth = width * 0.15;
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

        this.setupPenguinAnimation();
        this.createButtons();
        this.hideButtons();
    }

    createButtons() {

        this.startButton = createButton('START GAME');
        this.shopButton = createButton('SHOP');
        this.instructionButton = createButton('INSTRUCTION');
        this.settingButton = createButton('SETTING');

        this.startButton.class('menuButton');
        this.shopButton.class('menuButton');
        this.instructionButton.class('menuButton');
        this.settingButton.class('menuButton');

        this.startButton.mousePressed(() => this.startButtonPressed());
        this.shopButton.mousePressed(() => this.shopButtonPressed());
        this.instructionButton.mousePressed(() => this.instructionButtonPressed());
        this.settingButton.mousePressed(() => this.settingButtonPressed());

    }

    hideButtons() {
        this.startButton.hide();
        this.shopButton.hide();
        this.instructionButton.hide();
        this.settingButton.hide();
    }

    showButtons() {
        this.startButton.show();
        this.shopButton.show();
        this.instructionButton.show();
        this.settingButton.show();
        this.updateButtonStyles();
    }

    updateAnimation() {
        let elapsed = millis() - this.animationStartTime;
        let progress = min(1, elapsed / this.animationDuration);

        this.logoY = height * 0.4 + progress * (this.targetLogoY - height * 0.4);

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
        // Top row
        this.startButton.position(
            page.xPadding + page.margin + leftStart,
            page.yPadding + page.margin + topStart
        );
        this.shopButton.position(
            page.xPadding + page.margin + leftStart + buttonWidth + horizontalSpacing,
            page.yPadding + page.margin + topStart
        );

        // Bottom row
        this.instructionButton.position(
            page.xPadding + page.margin + leftStart,
            page.yPadding + page.margin + topStart + buttonHeight + verticalSpacing
        );
        this.settingButton.position(
            page.xPadding + page.margin + leftStart + buttonWidth + horizontalSpacing,
            page.yPadding + page.margin + topStart + buttonHeight + verticalSpacing
        );

        // Set size for all buttons
        this.startButton.size(buttonWidth, buttonHeight);
        this.shopButton.size(buttonWidth, buttonHeight);
        this.instructionButton.size(buttonWidth, buttonHeight);
        this.settingButton.size(buttonWidth, buttonHeight);

         // Update font size for all buttons
        this.startButton.style('font-size', fontSizeStr);
        this.shopButton.style('font-size', fontSizeStr);
        this.instructionButton.style('font-size', fontSizeStr);
        this.settingButton.style('font-size', fontSizeStr);
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
        this.startButton.remove();
        this.shopButton.remove();
        this.instructionButton.remove();
        this.settingButton.remove();
        mainMenu = null;
    }

    showMainMenu() {
        // Draw background
        background(240, 248, 255);
        imageMode(CORNER);
        image(homeBackground, 0, 0, width, height);

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
            this.updateSelectedButtonStyle();
            return;
        }

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
                this.activateSelectedButton();
                break;
        }

        this.selectedButtonIndex = this.buttonGrid[this.currentRow][this.currentCol];
        this.updateSelectedButtonStyle();
    }

    updateSelectedButtonStyle() {
        this.startButton.removeClass('selectedButton');
        this.shopButton.removeClass('selectedButton');
        this.instructionButton.removeClass('selectedButton');
        this.settingButton.removeClass('selectedButton');

        switch(this.selectedButtonIndex) {
            case 0:
                this.startButton.addClass('selectedButton');
                break;
            case 1:
                this.shopButton.addClass('selectedButton');
                break;
            case 2:
                this.instructionButton.addClass('selectedButton');
                break;
            case 3:
                this.settingButton.addClass('selectedButton');
                break;
        }
    }

    activateSelectedButton() {
        switch(this.selectedButtonIndex) {
            case 0:
                this.startButtonPressed();
                break;
            case 1:
                this.shopButtonPressed();
                break;
            case 2:
                this.instructionButtonPressed();
                break;
            case 3:
                this.settingButtonPressed();
                break;
        }
    }

    setupPenguinAnimation() {
        this.penguinSize = width * 0.2;
        this.waypoints = [
            {x: -this.penguinSize/2, y: height * 0.5},
            {x: width * 0.5, y: -this.penguinSize/3},
            {x: width + this.penguinSize/2, y: height * 0.5},
            {x: width * 0.5, y: height + this.penguinSize/2}
        ];

        this.currentWaypoint = 0;
        this.nextWaypoint = 1;

        this.penguinX = this.waypoints[0].x;
        this.penguinY = this.waypoints[0].y;

        this.penguinSpeed = width * 0.002;
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