

class Intro {
    constructor() {
        document.body.classList.remove("show-cursor");
        this.resetAnimation();
    }

    resetAnimation() {
        // penguin attributes
        this.penguinGif = penguinFlyGif;
        this.penguinSize = width * 0.2;
        this.xPos = -this.penguinSize;
        this.yPos = height * 0.4;
        this.xSpeed = width * 0.0025;

        // logo attributes
        this.logoDrawWidth = width * 0.5;
        this.logoDrawHeight = this.logoDrawWidth * (logo.height / logo.width) * 1.2;

        this.logoOffset = -this.penguinSize * 2;
        this.logoX = -this.logoDrawWidth;
        this.logoY = height * 0.4;

        this.penguinOpacity = 1
        this.logoOpacity = 1;
        }

    updatePenguinState() {
        this.xPos += this.xSpeed;

        this.logoX = this.xPos + this.logoOffset;
        if (this.logoX > width * 0.5) {
            this.logoX = width * 0.5;
        }
        this.penguinOpacity = 1;
        this.logoOpacity = 1;

        if(this.xPos > width) {
            Domain = 'mainMenu';
        }
    }

    showIntro() {

        background(240, 248, 255);
        imageMode(CORNER);
        image(homeBackground, 0, 0, width, height);

        push();
        imageMode(CENTER);
        int(255, this.logoOpacity * 255);
        image(logo, this.logoX, this.logoY, this.logoDrawWidth, this.logoDrawHeight);
        pop();

        push();
        imageMode(CENTER);
        tint(255, this.penguinOpacity * 255);
        image(this.penguinGif, this.xPos, this.yPos, this.penguinSize, this.penguinSize);
        pop();

        imageMode(CORNER);

        this.updatePenguinState();
    }

    skipAnimation() {
        Domain = 'mainMenu';
    }
}
