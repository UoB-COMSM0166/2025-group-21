

class Workshop {

    constructor() {
        document.body.classList.add("show-cursor");

        // Tab Buttons
        this.tabDiv = createDiv();
        this.tabDiv.id('tabDiv');
        this.tabDiv.position(width*0.2, height*0.25);
        let tabSize = page.pageWidth/35;
        this.toolsButton = createButton('Tools');
        this.toolsButton.style('font-size', tabSize + 'px');
        this.tabDiv.child(this.toolsButton);

        this.playButton = createButton('Play');
        this.purchaseButton = createButton('Purchase');

        // Items Buttons
        this.itemDiv = createDiv();
        this.itemDiv.id('itemDiv');
        this.itemDiv.position(width*0.5, height*0.45);
        let itemSize = page.pageWidth/55;
        this.BDFlyButton = createButton('BDFly');
        this.UFOButton = createButton('UFO');
        this.MountButton = createButton('Mount');
        this.BDFlyButton.style('font-size', itemSize + 'px');
        this.UFOButton.style('font-size', itemSize + 'px');
        this.MountButton.style('font-size', itemSize + 'px');
        this.itemDiv.child(this.BDFlyButton);
        this.itemDiv.child(this.UFOButton);
        this.itemDiv.child(this.MountButton);

        // Item Details
        this.BDFlyDetail = createP("- Click the button Q<br>- Use in segments: The player can use it multiple times within the total duration.<br>- Effect -- Increase height: When the player presses the button, the penguin will be elevated to a fixed Y-axis height and simultaneously move along the X-axis at a fixed low speed.\n");
        this.UFODetail = createP("- Click the button U<br>- One-time use<br>- Speed boost for 5 seconds<br>- Rewind to the starting point<br>- Vertical lift to an extremely high altitude");
        this.MountDetail = createP("- Click the button W<br>- One-time use<br>- Effect -- After summoning, it will assist in flying (at a relatively fast speed) for 7 seconds.");

        // Item Prices
        this.BDFlyPrice = 1;
        this.UFOPrice = 60;
        this.MountPrice = 70;
        this.itemPrice = createElement('h3', this.BDFlyPrice);
        this.currentPrice = this.BDFlyPrice;
        this.purchaseValid = null;

        // Invalid Purchase Popup
        this.invalidPurchasePop = createDiv();
        this.invalidPurchasePop.id('invalidPurchasePop');
        this.invalidPurchasePop.position(width*0.5, height*0.25);
        this.invalidPurchasePop.html("<h3>Insufficient</h3><p>Play more game to earn more coins :D</p>");
        this.closePopupButton = createButton('close');
        let closeButtonSize = page.pageWidth/55;
        this.closePopupButton.style('font-size', closeButtonSize + 'px');
        this.invalidPurchasePop.child(this.closePopupButton);

        // Valid Purchase Popup
        this.validPurchasePop = createDiv();
        this.validPurchasePop.id('validPurchasePop');
        this.validPurchasePop.position(width*0.5, height*0.25);
        this.validPurchasePop.html("<h3>Purchase</h3><p>Make sure you wanna buy this tool!</p>");
        this.confirmPopupButton = createButton('confirm');
        let confirmButtonSize = page.pageWidth/55;
        this.closePopupButton.style('font-size', confirmButtonSize + 'px');
        this.validPurchasePop.child(this.confirmPopupButton);


        this.tools = true;
        this.currentItem = this.BDFlyDetail;
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
        this.toolsContent();

        // Color blocks
        background(89,133,231,255);
        fill(244,208,255,255);
        noStroke();
        rect(width*0.1, height*0.4, page.pageWidth/3.5, page.pageWidth/3.5, 10);
        fill(255,240,255,255);
        noStroke();
        rect(width*0.55, height*0.63, page.pageWidth/2.5, page.pageWidth/6.5, 10);

        // Price
        this.priceDiv = createDiv();
        this.priceDiv.id('priceDiv');
        fill(228, 221, 0);
        stroke(0);
        this.priceIcon = ellipse(width*0.57, height*0.44, 35);
        fill(0);
        strokeWeight(5);
        this.itemPrice.position(width*0.7, height*0.39, 260);
    }

    clickButton(){
        this.playButton.mousePressed(() => this.playButtonPressed());
        this.toolsButton.mousePressed(()=>this.toolsButtonPressed());
        this.purchaseButton.mousePressed(() => this.checkPurchaseValid(this.currentPrice));

        this.BDFlyButton.mousePressed(() => this.showBDFlyDetail());
        this.UFOButton.mousePressed(() => this.showUFODetail());
        this.MountButton.mousePressed(() => this.showMountDetail());

        this.closePopupButton.mousePressed(() => this.closePopup());
        this.confirmPopupButton.mousePressed(() => {
            this.decrementCoin(this.currentPrice);
            this.closePopup()
        });
    }

    updatePrice(item){
        this.itemPrice.html(item);
    }

    /*------------ToolsButton-----------------*/

    toolsButtonPressed(){
        this.tools = true;
        this.toolsContent();
    }

    toolsContent(){
        this.BDFlyDetail.position(width*0.67, height*0.7);
        this.UFODetail.position(width*0.67, height*0.7);
        this.MountDetail.position(width*0.67, height*0.7);
        this.BDFlyDetail.hide(); this.UFODetail.hide(); this.MountDetail.hide();
        this.currentItem.show();

        if(this.tools){
            this.BDFlyButton.show(); this.UFOButton.show(); this.MountButton.show();
        }
    }

    showBDFlyDetail(){
        this.hideAllToolsDetails();
        this.BDFlyDetail.show();
        this.currentItem = this.BDFlyDetail;
        this.updatePrice(this.BDFlyPrice);
        this.currentPrice = this.BDFlyPrice;
    }

    showUFODetail(){
        this.hideAllToolsDetails();
        this.UFODetail.show();
        this.currentItem = this.UFODetail;
        this.updatePrice(this.UFOPrice);
        this.currentPrice = this.UFOPrice;
    }

    showMountDetail(){
        this.hideAllToolsDetails();
        this.MountDetail.show();
        this.currentItem = this.MountDetail;
        this.updatePrice(this.MountPrice);
        this.currentPrice = this.MountPrice;
    }

    hideAllToolsDetails(){
        this.BDFlyDetail.hide();
        this.UFODetail.hide();
        this.MountDetail.hide();
    }

    /*------------PurchaseButton--------------*/
    purchaseButtonDefault(){
        this.purchaseButton.class('purchaseButton');
        this.purchaseButton.position(
            page.xPadding + page.margin + 0.8*page.pageWidth,
            page.yPadding + page.margin + 0.39*page.pageHeight);

        let tabSize = page.pageWidth/40;
        this.purchaseButton.style('font-size', tabSize + 'px');
    }

    checkPurchaseValid(itemPrice){
        if (itemPrice > inventory.coins) {
            this.purchaseValid = false;
        } else {
            this.purchaseValid = true;
        }

        if(this.purchaseValid){
            this.purchaseIsValid();
        }else{
            this.purchaseInValid();
        }
    }

    purchaseIsValid(){
        this.validPurchasePop.style('display','block');
        this.confirmPopupButton.style('display','block');
    }

    purchaseInValid(){
        this.invalidPurchasePop.style('display','block');
        this.closePopupButton.style('display','block');
    }

    closePopup(){
        this.invalidPurchasePop.style('display','none');
        this.validPurchasePop.style('display','none');
    }

    decrementCoin(itemPrice){
        inventory.coins = inventory.coins - itemPrice;
        return inventory.coins;
    }

    /*------------PlayButton------------------*/
    playButtonDefault() {
        let textSize = page.pageWidth / 400;
        let numString = textSize.toString() + 'rem'

        this.playButton.position(
            page.xPadding + page.margin + 0.8*page.pageWidth,
            page.yPadding + page.margin + 0.2*page.pageHeight);

        this.playButton.size(page.pageWidth/7, page.pageHeight/9);
        this.playButton.class('playButton');
        this.playButton.style('font-size', numString);
    }

    playButtonPressed() {
        this.removeAll();
        shop = null;
        Domain = 'game';
    }

    removeAll(){
        this.playButton.remove();
        this.toolsButton.remove();
        this.BDFlyButton.remove();
        this.UFOButton.remove();
        this.MountButton.remove();
        this.BDFlyDetail.remove();
        this.UFODetail.remove();
        this.MountDetail.remove();
        this.itemPrice.remove();
        this.purchaseButton.remove();
        this.invalidPurchasePop.remove();
        this.validPurchasePop.remove();

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