

class GameLoader {

    constructor(gameProgress) {
        document.body.classList.remove("show-cursor");
        this.gameProgress = gameProgress;
        this.selectedButtonIndex = 0;

        if (!this.gameProgress || this.gameProgress.version !== CURRENT_VERSION) {
            this.initialiseGameState(NEW_GAME_STATE);
            Domain = 'intro';
        }
    }

    // Display load screen while game loads
    showLoadScreen() {
        push();
        image(blurredHomeBackground, 0, 0, width, height);
        this.printText();
        this.updateYesButton();
        this.updateNoButton();
        pop();
    }

    // Take keyboard navigation for menus
    handleKeyNavigation(keyCode) {
        if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            document.body.classList.remove("show-cursor");
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 2;
        }
        else if (keyCode === ENTER || keyCode === 32) { // 32 == space
            switch (this.selectedButtonIndex) {
                case 0: this.yesButtonPressed(); break;
                case 1: this.noButtonPressed(); break;
            }
        }
    }

    // Set game state to either loaded save data or the default state
    initialiseGameState(gameState) {
        settings = new Settings(gameState);
        inventory = new Inventory(gameState);
        onQualityChange(gameState.bgQuality + 1);
    }

    // Loads the button types for hovering over game load menu
    updateYesButton() {
        let scale = 0.008 * width;
        let size = createVector(yesButton.width / scale, yesButton.height / scale);
        let pos = createVector(0.38*width, 0.55*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(yesButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.yesButtonPressed();
            }
        }
        else if (this.selectedButtonIndex === 0) {
            image(yesButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else {
            image(yesButton, pos.x, pos.y, size.x, size.y);
        }
    }

    // Trigger the game load
    yesButtonPressed() {
        this.initialiseGameState(this.gameProgress);
        Domain = 'intro';
        document.body.classList.remove("show-cursor");
    }

    // Loads the button types for hovering over game load menu
    updateNoButton() {
        let scale = 0.008 * width;
        let size = createVector(noButton.width / scale, noButton.height / scale);
        let pos = createVector(0.62*width, 0.55*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(noButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.noButtonPressed();
            }
        }
        else if (this.selectedButtonIndex === 1) {
            image(noButtonHover, pos.x, pos.y, size.x, size.y);
        }
        else {
            image(noButton, pos.x, pos.y, size.x, size.y);
        }
    }

    // Trigger a new game state
    noButtonPressed() {
        this.initialiseGameState(NEW_GAME_STATE);
        localStorage.removeItem(SAVE_KEY);
        Domain = 'intro';
        document.body.classList.remove("show-cursor");
    }

    // Display the text on screen
    printText() {
        let size = width/20
        fill('rgb(21,37,58)');
        textFont('Trebuchet MS');
        textAlign(CENTER, CENTER);
        stroke('rgb(21,37,58)');
        strokeWeight(size/30);
        textSize(size/1.5);
        text('Continue game?', width/2, 0.45*height);
    }
}