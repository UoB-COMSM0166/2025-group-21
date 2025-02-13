

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
        rect(0, 0, window.innerWidth, window.innerHeight);
        this.quitButton.mousePressed(() => this.quit());
    }

    reset() {

        if (!this.fieldsReset) {
            this.opacity = 0;
            document.body.classList.remove("show-cursor");
            this.quitButton.remove();
            this.fieldsReset = true;
        }
    }

    quit() {
        this.quitButton.remove();
        game = null;
        Domain = 'shop';

    }

    updateQuitButton() {

        let textSize = page.pageWidth / 300;
        let numString = textSize.toString() + 'rem'

        this.quitButton.position(
            page.xPadding + page.margin + 0.11*page.pageWidth,
            page.yPadding + page.margin + 0.43*page.pageHeight);

        this.quitButton.class('quitButton')
        this.quitButton.style('font-size', numString);
        this.quitButton.size(page.pageWidth*0.8, page.pageHeight/10);
    }
}