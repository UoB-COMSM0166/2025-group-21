

class Workshop {

    constructor() {
        document.body.classList.add("show-cursor");

        this.selectedItem = null;
        this.purchaseIsValid = false;

        this.playButton = createButton('PLAY');
        this.playButton.class('playButton');
        this.purchaseButton = createButton('BUY!');
        this.purchaseButton.class('purchaseButtonInactive');

        this.laserButton = createButton('Projectile');
        this.laserButton.class('upgradeItemButton');
        this.laserButton.offset = 1;
        this.flyingButton = createButton('Flying');
        this.flyingButton.class('upgradeItemButton');
        this.flyingButton.offset = 4;
        this.forceFieldButton = createButton('Force Field');
        this.forceFieldButton.class('upgradeItemButton');
        this.forceFieldButton.offset = 7;

        // Item Prices
        this.updateItemPrices();

    }


    openShop() {
        this.display();
        this.printTitle();
        this.printCoins();
        this.listenForButtonPresses();

        if (this.playerHasEnoughCoins()) {
            this.purchaseIsValid = true;
            this.purchaseButton.class('purchaseButtonActive');
        }
        else {
            this.purchaseIsValid = false;
            this.purchaseButton.class('purchaseButtonInactive');
        }
    }

    display() {

        // background
        image(workshopBackground, 0, 0, width, height);

        // Update button positions
        this.updatePlayButton();
        this.updatePurchaseButton();
        this.updateUpgradeButton(this.laserButton);
        this.updateUpgradeButton(this.flyingButton);
        this.updateUpgradeButton(this.forceFieldButton);

        // Print colour blocks
        noStroke();
        fill(244,208,255,255);
        rect(width*0.1, height*0.4, page.pageWidth/3.5, page.pageWidth/3.5, 10);
        rect(width*0.45, height*0.4, page.pageWidth/2.2, page.pageWidth/6.5, 10);

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

    listenForButtonPresses(){
        this.playButton.mousePressed(() => this.playButtonPressed());
        this.purchaseButton.mousePressed(() => this.purchaseButtonButtonPressed());
        this.laserButton.mousePressed(() => this.selectedItem = 'laser');
        this.flyingButton.mousePressed(() => this.selectedItem = 'flying');
        this.forceFieldButton.mousePressed(() => this.selectedItem = 'force field');
    }

    purchaseButtonButtonPressed() {

        if (this.purchaseIsValid) {
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
        else illegalPurchaseSound.play();
    }

    updateItemPrices() {
        this.laserUpgradePrice = inventory.getLaserUpgradePrice();
        this.flyingUpgradePrice = inventory.getFlyingUpgradePrice();
        this.forceFieldUpgradePrice = inventory.getForceFieldUpgradePrice();
    }

    showUpgradeDescription(){

        let size = page.pageWidth/70;
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
        rect(width*0.11, height*0.42, page.pageWidth/13, page.pageWidth/13, 5);
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

    updateUpgradeButton(button) {
        button.position(page.xPadding + page.margin + 0.0945*width*button.offset,
                            page.yPadding + page.margin + 0.2*height);

        button.size(width/4, height/12);

        let size = (width / 40).toString() + 'px';
        button.style('font-size', size);
        let lineHeight = (width/100).toString() + 'px';
        button.style('line-height', lineHeight);
    }

    /*------------PurchaseButton--------------*/
    updatePurchaseButton(){
        this.purchaseButton.position(
            page.xPadding + page.margin + 0.45*page.pageWidth,
            page.yPadding + page.margin + 0.75*page.pageHeight);

        this.purchaseButton.size(page.pageWidth/8.2, page.pageHeight/9);

        let size = (page.pageWidth / 40).toString() + 'px';
        this.purchaseButton.style('font-size', size);
        let lineHeight = (width/100).toString() + 'px';
        this.purchaseButton.style('line-height', lineHeight);
        let borderWeight = (width/200).toString() + 'px solid black';
        this.purchaseButton.style('border', borderWeight)
    }

    /*------------PlayButton------------------*/
    updatePlayButton() {
        this.playButton.position(
            page.xPadding + page.margin + 0.8*page.pageWidth,
            page.yPadding + page.margin + 0.8*page.pageHeight);

        this.playButton.size(page.pageWidth/7, page.pageHeight/9);

        let size = (page.pageWidth / 40).toString() + 'px';
        this.playButton.style('font-size', size);
        let lineHeight = (width/100).toString() + 'px'
        this.playButton.style('line-height', lineHeight);
    }

    playButtonPressed() {
        noStroke();
        this.removeAllButtons();
        shop = null;
        Domain = 'game';
    }

    removeAllButtons(){
        this.playButton.remove();
        this.laserButton.remove();
        this.flyingButton.remove();
        this.forceFieldButton.remove();
        this.purchaseButton.remove();
    }

    /*------------Others---------------*/
    printTitle() {
        let size = page.pageWidth/15;
        fill(10,25,87,255);
        textFont('Trebuchet MS');
        textAlign(CENTER, TOP);
        stroke(10,25,87,255);
        strokeWeight(size/8);
        textSize(size);
        text('Shop', width/2, 0.001*page.margin*page.pageWidth);
    }

    printCoins() {

        push()
        let size = page.pageWidth/8;
        fill(228, 221, 0);
        textFont('Courier New');
        textAlign(LEFT, CENTER);
        stroke(0);
        strokeWeight(size/17);
        textSize(size/3);
        ellipse(width*0.04, height*0.07, size/2.5);
        fill(0);
        strokeWeight(size/40);
        text(`×${inventory.coins}`, width*0.075, height*0.073);
        pop();
    }
}