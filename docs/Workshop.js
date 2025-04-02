

class Workshop {

    constructor() {
        document.body.classList.add("show-cursor");

        this.selectedItem = null;

        // Tab Buttons
        // this.tabDiv = createDiv();
        // this.tabDiv.id('tabDiv');
        // this.tabDiv.position(width*0.2, height*0.25);
        // let tabSize = page.pageWidth/35;
        // this.toolsButton = createButton('Tools');
        // this.toolsButton.style('font-size', tabSize + 'px');
        // this.tabDiv.child(this.toolsButton);

        this.playButton = createButton('Play');
        this.purchaseButton = createButton('BUY!');

        // Items Buttons
        // this.itemDiv = createDiv();
        // this.itemDiv.id('itemDiv');
        // this.itemDiv.position(width*0.5, height*0.45);
        let itemSize = page.pageWidth/55;

        this.laser = createButton('Laser');
        this.flying = createButton('Flying');
        this.forceField = createButton('Force Field');
        this.laser.style('font-size', itemSize + 'px');
        this.laser.class('upgradeItemButton');
        this.laser.position(page.xPadding + page.margin + 0.2*page.pageWidth,
                            page.yPadding + page.margin + 0.2*page.pageHeight);
        this.flying.style('font-size', itemSize + 'px');
        this.flying.class('upgradeItemButton');
        this.flying.position(page.xPadding + page.margin + 0.4*page.pageWidth,
                             page.yPadding + page.margin + 0.2*page.pageHeight);
        this.forceField.style('font-size', itemSize + 'px');
        this.forceField.class('upgradeItemButton');
        this.forceField.position(page.xPadding + page.margin + 0.6*page.pageWidth,
                                 page.yPadding + page.margin + 0.2*page.pageHeight);
        // this.itemDiv.child(this.laser);
        // this.itemDiv.child(this.flying);
        // this.itemDiv.child(this.forceField);

        // Item Details
        // this.BDFlyDetail = createP("- Click the button Q<br>- Use in segments: The player can use it multiple times within the total duration.<br>- Effect -- Increase height: When the player presses the button, the penguin will be elevated to a fixed Y-axis height and simultaneously move along the X-axis at a fixed low speed.\n");
        // this.UFODetail = createP("- Click the button U<br>- One-time use<br>- Speed boost for 5 seconds<br>- Rewind to the starting point<br>- Vertical lift to an extremely high altitude");
        // this.MountDetail = createP("- Click the button W<br>- One-time use<br>- Effect -- After summoning, it will assist in flying (at a relatively fast speed) for 7 seconds.");

        // Item Prices
        this.BDFlyPrice = 1;
        this.UFOPrice = 60;
        this.MountPrice = 70;
        //this.itemPrice = createElement('h3', this.BDFlyPrice);
        //this.currentPrice = this.BDFlyPrice;
        this.purchaseValid = null;

        //this.currentItem = this.BDFlyDetail;
    }


    openShop() {
        this.display();
        this.printTitle();
        this.printCoins();
        this.clickButton();
    }

    display() {

        // Buttons
        this.playButtonDefault();
        this.purchaseButtonDefault();
        this.showUpgradeDescription();

        // Color blocks
        //background(89,133,231,255);
        image(workshopBackground, 0, 0, width, height);
        fill(244,208,255,255);
        noStroke();
        rect(width*0.1, height*0.4, page.pageWidth/3.5, page.pageWidth/3.5, 10);
        //fill(244,208,255,255);
        noStroke();
        rect(width*0.45, height*0.4, page.pageWidth/2.2, page.pageWidth/6.5, 10);

        // Price

        // this.priceDiv = createDiv();
        // this.priceDiv.id('priceDiv');
        // fill(228, 221, 0);
        // stroke(0);
        // this.priceIcon = ellipse(width*0.57, height*0.44, 35);
        // fill(0);
        // strokeWeight(5);
        // this.itemPrice.position(width*0.7, height*0.39, 260);
    }

    clickButton(){
        this.playButton.mousePressed(() => this.playButtonPressed());
        //this.purchaseButton.mousePressed(() => this.checkPurchaseValid(this.currentPrice));

        this.laser.mousePressed(() => this.selectedItem = "laser");
        this.flying.mousePressed(() => this.selectedItem = "flying");
        this.forceField.mousePressed(() => this.selectedItem = "force field");

        // this.closePopupButton.mousePressed(() => this.closePopup());
        // this.confirmPopupButton.mousePressed(() => {
        //     this.decrementCoin(this.currentPrice);
        //     this.closePopup()
        // });
    }

    // updatePrice(item){
    //     this.itemPrice.html(item);
    // }

    /*------------ToolsButton-----------------*/

    showUpgradeDescription(){

        let size = page.pageWidth/20;
        fill(10,25,87,255);
        textFont('Trebuchet MS');
        textAlign(CENTER, TOP);
        stroke(10,25,87,255);
        strokeWeight(size/8);
        textSize(size);

        switch (this.selectedItem) {
            case "laser": this.showLaserDescription(); break;
            case "flying": this.showFLyingDescription(); break;
            case "force field": this.showForceFieldDescription(); break;
        }
    }

    showLaserDescription(){
        text('[Laser Description]', width/2, 0.001*page.margin*page.pageWidth);
    }

    showFLyingDescription(){
        text('[Flying Description]', width/2, 0.001*page.margin*page.pageWidth);
    }

    showForceFieldDescription(){
        text('[Force Field Description]', width/2, 0.001*page.margin*page.pageWidth);
    }

    /*------------PurchaseButton--------------*/
    purchaseButtonDefault(){
        this.purchaseButton.class('purchaseButton');
        this.purchaseButton.position(
            page.xPadding + page.margin + 0.55*page.pageWidth,
            page.yPadding + page.margin + 0.75*page.pageHeight);

        let tabSize = page.pageWidth/40;
        this.purchaseButton.style('font-size', tabSize + 'px');
    }

    checkPurchaseValid(itemPrice){
        this.purchaseValid = itemPrice <= inventory.coins;

        if (this.purchaseValid){
            this.purchaseIsValid();
        }
        else {
            this.purchaseInValid();
        }
    }

    // purchaseIsValid(){
    //     this.validPurchasePop.style('display','block');
    //     this.confirmPopupButton.style('display','block');
    // }
    //
    // purchaseInValid(){
    //     this.invalidPurchasePop.style('display','block');
    //     this.closePopupButton.style('display','block');
    // }
    //
    // closePopup(){
    //     this.invalidPurchasePop.style('display','none');
    //     this.validPurchasePop.style('display','none');
    // }
    //
    // decrementCoin(itemPrice){
    //     inventory.coins = inventory.coins - itemPrice;
    //     return inventory.coins;
    // }

    /*------------PlayButton------------------*/
    playButtonDefault() {
        let textSize = page.pageWidth / 400;
        let numString = textSize.toString() + 'rem'

        this.playButton.position(
            page.xPadding + page.margin + 0.8*page.pageWidth,
            page.yPadding + page.margin + 0.8*page.pageHeight);

        this.playButton.size(page.pageWidth/7, page.pageHeight/9);
        this.playButton.class('playButton');
        this.playButton.style('font-size', numString);
    }

    playButtonPressed() {
        noStroke();
        this.removeAll();
        shop = null;
        Domain = 'game';
    }

    removeAll(){
        this.playButton.remove();
        this.laser.remove();
        this.flying.remove();
        this.forceField.remove();
        //this.itemPrice.remove();
        this.purchaseButton.remove();
        //this.invalidPurchasePop.remove();
        //this.validPurchasePop.remove();

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