class Pause {

    constructor() {
        this.active = false;
        this.fieldsReset = true;
        this.opacity = 0;
    }

    showPauseScreen() {

        if (this.fieldsReset) {
            document.body.classList.add("show-cursor");
            this.fieldsReset = false;
        }
        this.opacity = lerp(this.opacity, 130, 0.2);
        fill(0, 0, 0, this.opacity);
        rect(0, 0, width, height);
        this.updateContinueButton();
        this.updateReturnToWorkshopButton();
    }

    reset() {

        if (!this.fieldsReset) {
            this.opacity = 0;
            document.body.classList.remove("show-cursor");
            this.fieldsReset = true;
        }
    }

    updateReturnToWorkshopButton() {
        push();
        let scale = 0.0015 * width;
        let size = createVector(returnToWorkshopButton.width / scale, returnToWorkshopButton.height / scale);
        let pos = createVector(0.5*width, 0.6*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(returnToWorkshopButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                game = null;
                Domain = 'shop';
            }
        }
        else {
            image(returnToWorkshopButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateContinueButton() {
        push();
        let scale = 0.0015 * width;
        let size = createVector(continueButton.width / scale, continueButton.height / scale);
        let pos = createVector(0.5*width, 0.4*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(continueButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.active = false;
            }
        }
        else {
            image(continueButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }
}
