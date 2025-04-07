class Pause {

    constructor() {
        this.active = false;
        this.fieldsReset = true;
        this.opacity = 0;
    }

    showPauseScreen() {

        if (this.fieldsReset) {
            document.body.classList.add("show-cursor");
            this.quitButton = createButton('RETURN TO WORKSHOP');
            this.updateQuitButton();
            this.fieldsReset = false;
        }
        this.updateQuitButton()
        this.opacity = lerp(this.opacity, 100, 0.2);
        fill(0, 0, 0, this.opacity);
        rect(0, 0, width, height);
        this.quitButton.mousePressed(() => this.quitButtonPressed());
    }

    reset() {

        if (!this.fieldsReset) {
            this.opacity = 0;
            document.body.classList.remove("show-cursor");
            this.quitButton.remove();
            this.fieldsReset = true;
        }
    }

    quitButtonPressed() {
        this.quitButton.remove();
        game = null;
        Domain = 'shop';

    }

    updateQuitButton() {

        const rect = canvas.getBoundingClientRect();

        let textSize = rect.width/30;
        let numString = textSize.toString() + 'px'

        this.quitButton.position(
            0.11*rect.width,
            0.43*rect.height);

        this.quitButton.class('quitButton')
        this.quitButton.style('font-size', numString);
        this.quitButton.size(rect.width*0.8, rect.height/10);
    }
}