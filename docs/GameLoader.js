

class GameLoader {
    constructor(gameProgress) {
        document.body.classList.add("show-cursor");
        this.gameProgress = gameProgress;
        this.selectedButtonIndex = 0;

        if (!this.gameProgress) {
            this.initialiseGameState(NEW_GAME_STATE);
            Domain = 'intro';
        }
    }

    showLoadScreen() {
        push();
        image(homeBackground, 0, 0, width, height);
        this.printText();
        this.updateYesButton();
        this.updateNoButton();
        pop();
    }

    handleKeyNavigation(keyCode) {

        if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % 2;
        }
        else if (keyCode === ENTER || keyCode === 32) { // 32 == space
            switch (this.selectedButtonIndex) {
                case 0: this.yesButtonPressed(); break;
                case 1: this.noButtonPressed(); break;
            }
        }
    }

    initialiseGameState(gameState) {
        settings = new Settings(gameState);
        inventory = new Inventory(gameState);
    }

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

    yesButtonPressed() {
        this.initialiseGameState(this.gameProgress);
        Domain = 'intro';
    }

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

    noButtonPressed() {
        this.initialiseGameState(NEW_GAME_STATE);
        localStorage.removeItem(SAVE_KEY);
        Domain = 'intro';
    }

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