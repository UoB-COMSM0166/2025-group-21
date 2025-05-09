

class Intro {
    constructor() {
        document.body.classList.remove("show-cursor");
        this.resetAnimation();
        this.setupSpriteSheet();
    }

    setupSpriteSheet() {
        this.frameCount = 16;
        this.currentFrame = 0;
        this.frameDelay = 1;
        this.frameStep  = 2;
        this.frameCounter = 0;

        this.penguinColumns = 4;
        this.penguinRows = 4;
        this.penguinFrameWidth = penguinBodyFly.width / this.penguinColumns;
        this.penguinFrameHeight = penguinBodyFly.height / this.penguinRows;

        this.rotorColumns = 4;
        this.rotorRows = 4;
        this.rotorFrameWidth = playerHelicopterRotor.width / this.rotorColumns;
        this.rotorFrameHeight = playerHelicopterRotor.height / this.rotorRows;
    }

    resetAnimation() {
        // penguin attributes
        this.penguinSize = width * 0.15;
        this.xPos = -this.penguinSize;
        this.yPos = height * 0.4;
        this.xSpeed = width * 0.02;

        // logo attributes
        this.logoDrawWidth = width * 0.5;
        this.logoDrawHeight = this.logoDrawWidth * (logo.height / logo.width) * 1.2;

        this.logoOffset = -this.penguinSize * 2.4;
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

        this.frameCounter++;
        if (this.frameCounter >= this.frameDelay) {
            this.currentFrame = (this.currentFrame + this.frameStep) % this.frameCount;
            this.frameCounter = 0;
        }

        if(this.xPos > width + this.penguinSize) {
            Domain = 'mainMenu';
        }
    }

    drawFlyingPenguin() {
        push();
        imageMode(CENTER);

        let row = Math.floor(this.currentFrame / this.penguinColumns);
        let col = this.currentFrame % this.penguinColumns;

        let penguinSx = col * this.penguinFrameWidth;
        let penguinSy = row * this.penguinFrameHeight;

        image(introHelicopterPenguin,
              this.xPos, this.yPos,
              this.penguinSize, this.penguinSize,
              penguinSx, penguinSy,
              this.penguinFrameWidth, this.penguinFrameHeight);
        pop();
    }

    showIntro() {

        background(240, 248, 255);
        imageMode(CORNER);
        image(blurredHomeBackground, 0, 0, width, height);

        push();
        imageMode(CENTER);
        tint(255, this.logoOpacity * 255);
        image(logo, this.logoX, this.logoY, this.logoDrawWidth, this.logoDrawHeight);
        pop();

        push();
        imageMode(CENTER);
        tint(255, this.penguinOpacity * 255);
        //image(this.penguinGif, this.xPos, this.yPos, this.penguinSize, this.penguinSize);
        this.drawFlyingPenguin();
        pop();

        imageMode(CORNER);

        this.updatePenguinState();
    }

    skipAnimation() {
        Domain = 'mainMenu';
    }
}
