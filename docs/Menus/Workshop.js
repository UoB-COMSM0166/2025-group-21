

class Workshop {

    constructor() {
        document.body.classList.add("show-cursor");
        this.selectedItem = null;
        this.buttonsActive = false;
        this.buttonCooldownTimer = new Clock();
        this.buttonCooldownTimer.tick();
        this.updateItemPrices();
        workshopMusic.loop();
    }


    openShop() {
        this.display();
        //this.printTitle();
        this.printCoins();
        this.updateButtonCooldown();
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
        fill('rgb(0,0,0)')
        rect(width*0.11, height*0.416, width/13, width/13, 5);
        textAlign(CENTER, TOP);
        fill('rgb(255,255,255)');
        let size = width/55
        textSize(size);
        text('LEVEL', width*0.148, height*0.425);
        textSize(3*size);
        text(`${abilityLevel}`, width*0.148, height*0.46);
    }

    showLaserDescription(){

        if (inventory.laserLevel < 5) {
            text(`Projectile level ${inventory.laserLevel+1}: ${this.laserUpgradePrice}\n` +
                  '[Upgrade Description]', width/2.15, height/2.37);
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
                workshopMusic.stop();
                shop = null;
                Domain = 'game';
            }
        }
        else {
            image(playButton, pos.x, pos.y, size.x, size.y);
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

    /*------------Others---------------*/
    // printTitle() {
    //     push()
    //     let size = width/15;
    //     fill('rgb(199, 209, 255)');
    //     textFont('Trebuchet MS');
    //     textAlign(CENTER, TOP);
    //     stroke('rgb(199, 209, 255)');
    //     strokeWeight(size/10);
    //     textStyle(BOLD);
    //
    //     textSize(size);
    //     text('Shop', width/2, 0.06*height);
    //     pop();
    // }

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
        image(coin, width*0.04, height*0.07, 0.4*size, 0.4*size);
        //ellipse(width*0.04, height*0.07, size/2.5);
        fill(0);
        stroke(255);
        strokeWeight(size/70);
        textStyle(BOLD);
        text(`×${inventory.coins}`, width*0.075, height*0.073);
        pop();
    }
}