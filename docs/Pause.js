

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
            this.continueButton = createButton('CONTINUE');
            //this.updateQuitButton();
            this.fieldsReset = false;
        }
        this.updateQuitButton();
        this.updateContinueButton();
        this.opacity = lerp(this.opacity, 100, 0.2);
        fill(0, 0, 0, this.opacity);
        rect(0, 0, window.innerWidth, window.innerHeight);
        this.quitButton.mousePressed(() => this.quitButtonPressed());
        this.continueButton.mousePressed(() => this.continueButtonPressed());
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
        this.continueButton.remove();
        inventory.coins += Math.round(game.score.total / 11);
        game = null;
        Domain = 'shop';

    }

    updateQuitButton() {

        let textSize = page.pageWidth / 300;
        let numString = textSize.toString() + 'rem'

        this.quitButton.position(
            page.xPadding + page.margin + 0.11*page.pageWidth,
            page.yPadding + page.margin + 0.53*page.pageHeight);

        this.quitButton.class('quitButton')
        this.quitButton.style('font-size', numString);
        this.quitButton.size(page.pageWidth*0.8, page.pageHeight/10);
    }

    continueButtonPressed() {
        this.continueButton.remove();
        this.quitButton.remove();
        this.active = false;
    }

    updateContinueButton() {

        let textSize = page.pageWidth / 300;
        let numString = textSize.toString() + 'rem'

        this.continueButton.position(
            page.xPadding + page.margin + 0.11*page.pageWidth,
            page.yPadding + page.margin + 0.33*page.pageHeight);

        this.continueButton.class('quitButton')
        this.continueButton.style('font-size', numString);
        this.continueButton.size(page.pageWidth*0.8, page.pageHeight/10);
    }
}