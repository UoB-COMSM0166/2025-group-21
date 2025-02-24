

class Homescreen {
    constructor(page) {
        this.page = page;
        document.body.classList.add("show-cursor");

        this.playIfpressed = false;
        this.penguin = null;
        this.state = "flyIn";
        this.xPos = this.page.xPadding + 50 * this.page.scaleX;
        this.yBase = this.page.yPadding + this.page.pageHeight * 0.42;
        this.yPos = this.yBase;
        this.xSpeed = 1 * this.page.scaleX;
        this.ySpeed = 0;
        this.waveAmplitude = 60 * this.page.scaleY;
        this.waveFrequency = 0.05 / this.page.scaleX;
        this.yBase = this.page.pageHeight * 2.1/ 5;
        this.gravity = 0.1 * this.page.scaleY;
        this.stateStartTime = null;
        this.balloonY = null;
        this.balloonX = null;
        this.balloon = null

        this.resetAnimation();
    }

    showHomescreen() {

        background(240, 248, 255);
        image(homeBackground, 0, 0, width, height);

        let logoWidth = this.page.pageWidth * 0.8;
        let logoHeight = logoWidth * (logo.height / logo.width);
        let logoX = this.page.pageWidth / 2;
        let logoY = this.page.pageHeight / 4;
        imageMode(CENTER);
        image(logo,logoX, logoY, logoWidth, logoHeight);
        imageMode(CORNER);

        this.drawPlayButton();

        this.updatePenguinState();
        this.penguin.position(this.xPos, this.yPos);
        if (this.balloon) this.balloon.position(this.balloonX, this.balloonY);

        if (this.playIfpressed) {
            this.penguin.hide();
            this.penguin = null;
            this.balloon.hide();
            Domain = 'shop';
            homescreen = null;
        }
    }

    updatePenguinState() {
        let elapsedTime = millis() - this.stateStartTime;

        if (this.state === "flyIn") {
            this.xPos += this.xSpeed;
            this.yPos = this.yBase + this.waveAmplitude * sin(frameCount * this.waveFrequency);

            if (this.xPos >= 10 * this.page.scaleX) {
                let fadeInProgress = Math.min(1, (this.xPos - 10 * this.page.scaleX) / (50 * this.page.scaleX));
                this.penguin.style("opacity", fadeInProgress);
            }
            if (this.xPos >= this.page.xPadding + this.page.pageWidth * 0.3) {
                this.penguin.attribute("src", "assets/gifs/penguinFall.gif");
                this.state = "fall";
                this.ySpeed = 0.3 * this.page.scaleY;
                this.stateStartTime = millis();
            }
        }
        else if (this.state === "fall") {
            this.yPos += this.ySpeed;
            this.ySpeed += this.gravity;

            if (this.yPos >= this.page.yPadding + this.page.pageHeight - 150 * this.page.scaleY) {
                let fadeOutProgress = Math.max(0, 1 - (this.yPos - (this.page.yPadding + this.page.pageHeight - 150 * this.page.scaleY)) / (100 * this.page.scaleY));
                this.penguin.style("opacity", fadeOutProgress);
            }
            if (this.yPos >= this.page.yPadding + this.page.pageHeight) {
                this.penguin.hide();
                this.state = "balloonWait";
                this.stateStartTime = millis();
            }
        }
        else if (this.state === "balloonWait") {
            if (elapsedTime > 1300) {
                this.state = "balloonRise";
                this.stateStartTime = millis();

                this.xPos = this.page.xPadding + (this.page.pageWidth / 2) + (20 * this.page.scaleX);
                this.yPos = this.page.yPadding + this.page.pageHeight - 70 * this.page.scaleY;
                this.ySpeed = -1.5 * this.page.scaleY;
                this.xSpeed = 1 * this.page.scaleX;

                this.penguin.attribute("src", "assets/gifs/penguinSpin.gif");
                this.penguin.show();

                if(this.balloon) {
                    this.balloon.show();
                }
            }
        }
        else if (this.state === "balloonRise") {
            let fadeInProgress = Math.min(1, (millis() - this.stateStartTime) / 800);
            this.penguin.style("opacity", fadeInProgress);
            if (this.balloon) this.balloon.style("opacity", fadeInProgress);
            this.yPos += this.ySpeed;
            this.xPos += this.xSpeed;
            this.xPos = constrain(this.xPos, this.page.xPadding, this.page.xPadding + this.page.pageWidth);
            this.yPos = constrain(this.yPos, this.page.yPadding, this.page.yPadding + this.page.pageHeight);

            if(this.balloon) {
                this.balloonX = this.xPos + (40 * this.page.scaleX);
                this.balloonY = this.yPos - (50 * this.page.scaleY);
            }

            if (this.balloonY <= this.page.yPadding + 50 * this.page.scaleY) {
                let fadeOutProgress = Math.max(0, (this.balloonY - this.page.yPadding) / (50 * this.page.scaleY));
                this.penguin.style("opacity", fadeOutProgress);
                if (this.balloon) this.balloon.style("opacity", fadeOutProgress);

                if (fadeOutProgress <= 0) {
                    this.penguin.hide();
                    if (this.balloon) this.balloon.hide();
                    this.resetAnimation();
                    this.state = "flyIn";
                }
            }
        }
    }


    resetAnimation() {
        this.state = "flyIn";
        this.xPos = this.page.xPadding + 50 * this.page.scaleX;
        this.yBase = this.page.yPadding + this.page.pageHeight * 0.42;
        this.yPos = this.yBase;
        this.xSpeed = 1 * this.page.scaleX;
        this.ySpeed = 0;
        if (this.penguin) this.penguin.remove();
        this.penguin = createImg('assets/gifs/penguinFly.gif');
        this.penguin.size(250 * this.page.scaleX, 250 * this.page.scaleY);
        this.penguin.position(this.xPos, this.yPos);
        this.penguin.style("opacity", "0");
        this.penguin.show();

        if(this.balloon) this.balloon.remove();
        this.balloon = createImg('assets/gifs/balloon.gif');
        let balloonWidth = 120 * this.page.scaleX;
        let balloonHeight = 120 * this.page.scaleY;
        this.balloon.size(balloonWidth, balloonHeight);
        this.balloon.style("opacity", "0");
        this.balloon.hide();
        this.stateStartTime = millis();
    }

    drawPlayButton() {
        let buttonWidth = width * 0.15;
        let buttonHeight = buttonWidth * (playNoPressed.height / playNoPressed.width);
        let buttonX = width/2;
        let buttonY = height * 0.8;
        imageMode(CENTER);

        if(mouseX > buttonX-buttonWidth/2 && mouseX < buttonX+buttonWidth/2
            && mouseY > buttonY-buttonHeight/2 && mouseY < buttonY+buttonHeight/2) {
            image(playIsPressed, buttonX, buttonY, buttonWidth, buttonHeight);
            if (mouseIsPressed) this.playIfpressed = true;
        }
        else {
            this.playIfpressed = false;
            image(playNoPressed, buttonX,buttonY, buttonWidth, buttonHeight);
        }
        imageMode(CORNER);
    }
}
