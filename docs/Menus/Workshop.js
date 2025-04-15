

class Workshop {

    constructor() {
        document.body.classList.add("show-cursor");
        this.selectedItem = null;
        this.buttonsActive = false;
        this.buttonCooldownTimer = new Clock();
        this.buttonCooldownTimer.tick();
        this.updateItemPrices();
        this.musicVolume = 0.4*settings.masterVolume*settings.mute;
        workshopMusic.setVolume(this.musicVolume);
        workshopMusic.loop();
        this.fadeOut = false;
        this.screenTint = 0;
        this.fadeOutTimer = new Clock()

    }


    openShop() {
        this.display();
        this.printCoins();
        this.updateButtonCooldown();

        if (this.fadeOut) {
            if (this.fadeOutTimer.time > 20) {
                workshopMusic.stop();
                shop = null;
                Domain = 'game';
            }
            this.musicVolume = lerp(this.musicVolume, 0, 0.04);
            workshopMusic.setVolume(this.musicVolume);
            fill(`rgba(0, 0, 0, ${this.screenTint})`);
            rect(0, 0, width, height);

            if (this.screenTint >= 0.95) {
                this.screenTint = lerp(this.screenTint, 1, 0.5);

                if (this.screenTint >= 0.9999) {
                    ///this.screenTint = 1;
                    this.fadeOutTimer.tick();
                }
            }
            else {
                this.screenTint = lerp(this.screenTint, 1, 0.04);
            }
        }
    }

    updateButtonCooldown() {

        if (this.buttonCooldownTimer.time > 0) {
            this.buttonCooldownTimer.tick();
        }
        if (this.buttonCooldownTimer.time > 30) {
            this.buttonCooldownTimer.reset();
            this.buttonsActive = true
        }
    }

    display() {

        push();
        // background
        image(workshopBackground, 0, 0, width, height);
        // title
        imageMode(CENTER);
        image(shopTitle, width/2, height/10, shopTitle.width/2.5, shopTitle.height/2.5);
        pop();

        // Update button positions
        this.updatePlayButton();
        this.updatePurchaseButton();
        this.updateProjectileButton();
        this.updateFlyingButton();
        this.updateForceFieldButton();
        this.updateMainMenuButton();

        // Print colour blocks
        noStroke();
        fill('rgb(199, 209, 255)');
        //rect(width*0.1, height*0.4, width/3.5, width/3.5, 10);
        image(displayBox, width*0.09, height*0.38, width/3.2, width/3.2);
        rect(width*0.45, height*0.4, width/2.2, width/6.5, 10);

        this.showUpgradeDescription();
    }

    playerHasEnoughCoins() {

        if (this.selectedItem === null) return false;

        switch (this.selectedItem) {
            case 'laser':
                if (inventory.laserLevel < 5) {
                    return inventory.coins >= this.laserUpgradePrice;
                }
                break;
            case 'flying':
                if (inventory.flyLevel < 5) {
                    return inventory.coins >= this.flyingUpgradePrice;
                }
                break;
            case 'force field':
                if (inventory.forceFieldLevel < 5) {
                    return inventory.coins >= this.forceFieldUpgradePrice;
                }
                break;
        }
        return false;
    }

    updateItemPrices() {
        this.laserUpgradePrice = inventory.getLaserUpgradePrice();
        this.flyingUpgradePrice = inventory.getFlyingUpgradePrice();
        this.forceFieldUpgradePrice = inventory.getForceFieldUpgradePrice();
    }

    showUpgradeDescription(){

        let size = width/70;
        fill(10,25,87,255);
        textFont('Trebuchet MS');
        textAlign(LEFT, TOP);
        stroke(10,25,87,255);
        strokeWeight(size);
        textSize(size);
        noStroke();

        switch (this.selectedItem) {
            case 'laser': this.showLaserDescription(); break;
            case 'flying': this.showFlyingDescription(); break;
            case 'force field': this.showForceFieldDescription(); break;
        }
    }

    printAbilityLevel(abilityLevel) {
        push();
        stroke(0);
        strokeWeight(width/1000);
        fill('rgb(246,208,55)');

        for (let i = 0; i < abilityLevel; i++) {
            inventory.drawStar((0.125 + 0.0185*i)*width, 0.44*height, width/60)
        }
        pop();
    }

    showLaserDescription(){

        if (inventory.laserLevel < 5) {
            text(`Projectile level ${inventory.laserLevel+1}: ${this.laserUpgradePrice} coins\n\n` +
                  `${inventory.getProjectileDescription()}`, width/2.15, height/2.37);
            // TODO: add description
        }
        else {
            text('MAX', width/2.15, height/2.37);
        }
        this.printAbilityLevel(inventory.laserLevel);

        push();
        let size = width / 4;
        imageMode(CENTER);
        translate(0.25*width, 0.65*height)

        switch (inventory.laserLevel) {
            case 1:
                rotate(-0.78);
                image(fish, 0, 0, size/1.5, size/1.5);
                break;
            case 2:
                rotate(-0.78);
                image(snowball, 0, 0, size/1.5, size/1.5);
                break;
            case 3:
                rotate(-0.78);
                image(arrow, 0, 0, size/1.5, size/10, 0, 0, 60, 9);
                break;
            case 4:
                rotate(2.357);
                image(greenLaser, 0, 0, size, size/5);
                break;
            case 5:
                rotate(2.357);
                image(purpleLaser, size/10, size/6, size/2, size/6);
                image(purpleLaser, size/3, size/20, size/2, size/6);
                image(purpleLaser, -size/4, -size/30, size/2, size/6);
                break
        }

        pop();


    }

    showFlyingDescription(){

        if (inventory.flyLevel < 5) {
            text(`Flying level ${inventory.flyLevel+1}: ${this.flyingUpgradePrice}\n` +
                  '[Upgrade Description]', width/2.15, height/2.37);
            // TODO: add description
        }
        else {
            text('MAX', width/2.15, height/2.37);
        }
        this.printAbilityLevel(inventory.flyLevel);
    }

    showForceFieldDescription(){

        if (inventory.forceFieldLevel < 5) {
            text(`Force Field level ${inventory.forceFieldLevel+1}: ${this.forceFieldUpgradePrice}\n` +
                  '[Upgrade Description]', width/2.15, height/2.37);
            // TODO: add description
        }
        else {
            text('MAX', width/2.15, height/2.37);
        }
        this.printAbilityLevel(inventory.forceFieldLevel);
    }

    updateProjectileButton() {
        push();
        let scale = 0.002 * width;
        let size = createVector(projectileButton.width / scale, projectileButton.height / scale);
        let pos = createVector(0.2*width, 0.27*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) || this.selectedItem === 'laser') {
            image(projectileButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.selectedItem = 'laser';
            }
        }
        else {
            image(projectileButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateFlyingButton() {
        push();
        let scale = 0.00178 * width;
        let size = createVector(flyingButton.width / scale, flyingButton.height / scale);
        let pos = createVector(0.5*width, 0.27*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) || this.selectedItem === 'flying') {
            image(flyingButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.selectedItem = 'flying';
            }
        }
        else {
            image(flyingButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateForceFieldButton() {
        push();
        let scale = 0.0018 * width;
        let size = createVector(forceFieldButton.width / scale, forceFieldButton.height / scale);
        let pos = createVector(0.8*width, 0.27*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size) || this.selectedItem === 'force field') {
            image(forceFieldButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                this.selectedItem = 'force field';
            }
        }
        else {
            image(forceFieldButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    /*------------PurchaseButton--------------*/
    updatePurchaseButton(){
        push();
        let scale = 0.002 * width;
        let size = createVector(buyButtonYellow.width / scale, buyButtonYellow.height / scale);
        let pos = createVector(0.513*width, 0.8*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            if (this.playerHasEnoughCoins()) {
                image(buyButtonGreen, pos.x, pos.y, size.x, size.y);

                if (mouseIsPressed && this.buttonsActive) {
                    this.buttonsActive = false;
                    this.buttonCooldownTimer.tick();
                    this.upgradeItem();
                }
            }
            else {
                image(buyButtonRed, pos.x, pos.y, size.x, size.y);

                if (mouseIsPressed && this.buttonsActive) {
                    this.buttonsActive = false;
                    this.buttonCooldownTimer.tick();
                    illegalPurchaseSound.play();
                }
            }
        }
        else {
            image(buyButtonYellow, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    /*------------PlayButton------------------*/
    updatePlayButton() {
        push();
        let scale = 0.0018 * width;
        let size = createVector(playButton.width / scale, playButton.height / scale);
        let pos = createVector(0.88*width, 0.89*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(playButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                document.body.classList.remove("show-cursor");
                this.fadeOut = true;
            }
        }
        else {
            image(playButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    updateMainMenuButton() {
        push();
        let scale = 0.008 * width;
        let size = createVector(mainMenuButton.width / scale, mainMenuButton.height / scale);
        let pos = createVector(0.935*width, 0.04*height);
        imageMode(CENTER);

        if (hoveringOverButton(pos, size)) {
            image(mainMenuButtonHover, pos.x, pos.y, size.x, size.y);

            if (mouseIsPressed) {
                workshopMusic.stop();
                shop = null;
                Domain = 'mainMenu';
            }
        }
        else {
            image(mainMenuButton, pos.x, pos.y, size.x, size.y);
        }
        pop();
    }

    upgradeItem() {
        switch (this.selectedItem) {
            case 'laser':
                inventory.laserLevel++;
                inventory.coins -= this.laserUpgradePrice;
                break;
            case 'flying':
                inventory.flyLevel++;
                inventory.coins -= this.flyingUpgradePrice;
                break;
            case 'force field':
                inventory.forceFieldLevel++;
                inventory.coins -= this.forceFieldUpgradePrice;
                break;
        }
        purchaseSound.play();
        this.updateItemPrices();
    }

    printCoins() {

        push()
        let size = width/8;
        fill(228, 221, 0);
        textFont('Courier New');
        textAlign(LEFT, CENTER);
        stroke(0);
        strokeWeight(size/17);
        textSize(size/3);
        imageMode(CENTER);
        image(coinImage, width*0.04, height*0.07, 0.4*size, 0.4*size);
        fill(0);
        stroke(255);
        strokeWeight(size/70);
        textStyle(BOLD);
        text(`×${inventory.coins}`, width*0.075, height*0.073);
        pop();
    }
}