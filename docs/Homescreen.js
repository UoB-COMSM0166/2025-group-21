

class Homescreen {
    constructor() {
        document.body.classList.add("show-cursor");

        this.playIfpressed = false;
        this.penguin = null;
        this.state = "flyIn";
        this.xPos = 50;
        this.yPos = height * 0.5;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.waveAmplitude = 40;
        this.waveFrequency = 0.05;
        this.yBase = height * 2.1/ 5;
        this.gravity = 0.1;
        this.stateStartTime = null;
        this.balloonY = null;
        this.balloonX = null;
        this.balloon = null
    }

    showHomescreen() {

        background(240, 248, 255);
        image(homeBackground, 0, 0, width, height);

        let newWidth = width * 0.9;
        let newHeight = newWidth * (logo.height / logo.width);
        imageMode(CENTER);
        image(logo, width / 2, height / 2 - 90, newWidth, newHeight);
        imageMode(CORNER);

        this.drawPlayButton();

        this.updatePenguinState();
        this.penguin.position(this.xPos, this.yPos);
        this.balloon.position(this.balloonX, this.balloonY);

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

            if (this.xPos >= 10) {
                let fadeInProgress = Math.min(1, (this.xPos - 10) / 50);
                this.penguin.style("opacity", fadeInProgress);
            }
            if (this.xPos >= width * 0.8 / 2) {
                this.penguin.attribute("src", "assets/gifs/fall.gif");
                this.state = "fall";
                this.ySpeed = 0.3;
                this.stateStartTime = millis();
            }
        }
        else if (this.state === "fall") {
            this.yPos += this.ySpeed;
            this.ySpeed += this.gravity;

            if (this.yPos >= height - 150) {
                let fadeOutProgress = Math.max(0, 1 - (this.yPos - (height - 150)) / 100);
                this.penguin.style("opacity", fadeOutProgress);
            }
            if (this.yPos >= height) {
                this.penguin.hide();
                this.state = "balloonWait";
                this.stateStartTime = millis();
            }
        }
        else if (this.state === "balloonWait") {
            if (elapsedTime > 1300) {

                this.state = "balloonRise";
                this.penguin.attribute("src", "assets/gifs/spin.gif");
                this.xPos = width/2 + 170;
                this.yPos = height - 70;
                this.stateStartTime = millis();
            }
        }
        else if (this.state === "balloonRise") {
            this.balloon.show();
            this.penguin.show();
            this.ySpeed = -1.5;
            this.xSpeed =1;

            this.yPos += this.ySpeed;
            this.balloonY += this.ySpeed;
            this.xPos += this.xSpeed;
            this.balloonX += this.xSpeed;

            let fadeInProgress = Math.min(1, (millis() - this.stateStartTime) / 800); // 800ms 渐显
            this.penguin.style("opacity", fadeInProgress);
            this.balloon.style("opacity", fadeInProgress);

            if (this.balloonY <= 50) {
                let fadeOutProgress = Math.max(0, this.balloonY / 50);
                this.penguin.style("opacity", fadeOutProgress);
                this.balloon.style("opacity", fadeOutProgress);

                if (fadeOutProgress <= 0) {
                    this.penguin.hide();
                    this.balloon.hide();
                    this.resetAnimation();
                }
            }
        }
    }


    resetAnimation() {
        this.state = "flyIn";
        this.xPos = 50;
        this.yBase = height * 0.5;
        this.yPos = this.yBase;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.balloonX = width / 2 + 190;
        this.balloonY = height - 120;


        if (this.penguin) this.penguin.remove();
        this.penguin = createImg('assets/gifs/fly.gif');
        this.penguin.size(180, 180);
        this.penguin.position(this.xPos, this.yPos);
        this.penguin.style("opacity", "0");
        this.penguin.show();
        this.balloon = createImg('assets/gifs/balloon.gif');
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
