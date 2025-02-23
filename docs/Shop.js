

class Shop {

    constructor() {
        document.body.classList.add("show-cursor");
        this.playButton = createButton('Play');
        this.toolsButton = createButton('Tools');
        this.outfitsButton = createButton('Outfits');
        this.BDFlyButton = createButton('BDFly');
        this.UFOButton = createButton('UFO');
        this.MountButton = createButton('Mount');
        this.outfits1Button = createButton('outfits1');
        this.outfits2Button = createButton('outfits2');
        this.outfits3Button = createButton('outfits3');
        this.BDFlyDetail = createP("- Click the button Q<br>- Use in segments: The player can use it multiple times within the total duration.<br>- Effect -- Increase height: When the player presses the button, the penguin will be elevated to a fixed Y-axis height and simultaneously move along the X-axis at a fixed low speed.\n");
        this.UFODetail = createP("- Click the button U<br>- One-time use<br>- Speed boost for 5 seconds<br>- Rewind to the starting point<br>- Vertical lift to an extremely high altitude");
        this.MountDetail = createP("- Click the button W<br>- One-time use<br>- Effect -- After summoning, it will assist in flying (at a relatively fast speed) for 7 seconds.");
        this.outfits1Detail = createP("outfits1Detail");
        this.outfits2Detail = createP("outfits2Detail");
        this.outfits3Detail = createP("outfits3Detail");
        this.tools = true;
        this.outfits = false;
        this.currentDetail = this.BDFlyDetail;
    }


    openShop() { // Main loop for workshop
        this.display();
        this.PlayButtonDefault();
        this.toolsButtonDefault();
        this.outfitsButtonDefault();
        this.toolsContent();
        this.outfitsContent();
        this.printWorkshopTitle();
        this.printCoins();
        this.playButton.mousePressed(() => this.playButtonPressed());
        this.toolsButton.mousePressed(()=>this.toolsButtonPressed());
        this.outfitsButton.mousePressed(()=>this.outfitsButtonPressed());
    }

    /*------------PlayButton------------------*/
    PlayButtonDefault() {
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
        this.outfitsButton.remove();
        this.BDFlyButton.remove();
        this.UFOButton.remove();
        this.MountButton.remove();
        this.outfits1Button.remove();
        this.outfits2Button.remove();
        this.outfits3Button.remove();
        this.BDFlyDetail.remove();
        this.UFODetail.remove();
        this.MountDetail.remove();
        this.outfits1Detail.remove();
        this.outfits2Detail.remove();
        this.outfits3Detail.remove();
    }

    /*------------ToolsButton-----------------*/

    display() {
        background(89,133,231,255);
        fill(244,208,255,255);
        noStroke();
        rect(100, 250, 300, 300);
        fill(255,240,255,255);
        noStroke();
        rect(650, 350, 500, 200);
    }

    toolsButtonDefault() {
        this.toolsButton.class('tabButton');
        this.toolsButton.position(200, 200);
    }

    toolsButtonPressed(){
        this.tools = true;
        this.outfits = false;
        this.toolsContent();
    }

    toolsContent(){
        this.BDFlyButton.class('OptionButton');
        this.BDFlyButton.position(550, 300);
        this.UFOButton.class('OptionButton');
        this.UFOButton.position(550, 400);
        this.MountButton.class('OptionButton');
        this.MountButton.position(550, 500);

        this.BDFlyDetail.position(800, 400);
        this.UFODetail.position(800, 400);
        this.MountDetail.position(800, 400);
        this.BDFlyDetail.hide();
        this.UFODetail.hide();
        this.MountDetail.hide();
        this.currentDetail.show();

        if(this.tools){
            this.BDFlyButton.show();
            this.UFOButton.show();
            this.MountButton.show();
        }

        if(!this.outfits){
            this.outfits1Button.hide();
            this.outfits2Button.hide();
            this.outfits3Button.hide();
        }

        this.BDFlyButton.mousePressed(() => this.showBDFlyDetail());
        this.UFOButton.mousePressed(() => this.showUFODetail());
        this.MountButton.mousePressed(() => this.showMountDetail());
    }

    showBDFlyDetail(){
        this.hideAllToolsDetails();
        this.BDFlyDetail.show();
        this.currentDetail = this.BDFlyDetail;
    }

    showUFODetail(){
        this.hideAllToolsDetails();
        this.UFODetail.show();
        this.currentDetail = this.UFODetail;
    }

    showMountDetail(){
        this.hideAllToolsDetails();
        this.MountDetail.show();
        this.currentDetail = this.MountDetail;
    }

    hideAllToolsDetails(){
        this.BDFlyDetail.hide();
        this.UFODetail.hide();
        this.MountDetail.hide();
    }

    /*------------outfitsButton---------------*/
    outfitsButtonDefault() {
        this.outfitsButton.class('tabButton');
        this.outfitsButton.position(320, 200);
    }

    outfitsButtonPressed(){
        this.tools = false;
        this.outfits = true;
        this.outfitsContent();
    }

    outfitsContent(){
        this.outfits1Button.class('OptionButton');
        this.outfits1Button.position(550, 300);
        this.outfits2Button.class('OptionButton');
        this.outfits2Button.position(550, 400);
        this.outfits3Button.class('OptionButton');
        this.outfits3Button.position(550, 500);

        this.outfits1Detail.position(800, 400);
        this.outfits2Detail.position(800, 400);
        this.outfits3Detail.position(800, 400);
        this.outfits1Detail.hide();
        this.outfits2Detail.hide();
        this.outfits3Detail.hide();
        this.currentDetail.show();

        if(!this.tools){
            this.BDFlyButton.hide();
            this.UFOButton.hide();
            this.MountButton.hide();
        }

        if(this.outfits){
            this.outfits1Button.show();
            this.outfits2Button.show();
            this.outfits3Button.show();
        }

        this.outfits1Button.mousePressed(() => this.showOutfits1Detail());
        this.outfits2Button.mousePressed(() => this.showOutfits2Detail());
        this.outfits3Button.mousePressed(() => this.showOutfits3Detail());
    }

    showOutfits1Detail(){
        this.hideAllOutfitsDetails();
        this.outfits1Detail.show();
        this.currentDetail = this.outfits1Detail;
    }

    showOutfits2Detail(){
        this.hideAllOutfitsDetails();
        this.outfits2Detail.show();
        this.currentDetail = this.outfits2Detail;
    }

    showOutfits3Detail(){
        this.hideAllOutfitsDetails();
        this.outfits3Detail.show();
        this.currentDetail = this.outfits3Detail;
    }

    hideAllOutfitsDetails(){
        this.outfits1Detail.hide();
        this.outfits2Detail.hide();
        this.outfits3Detail.hide();
    }

    /*------------Others---------------*/
    printWorkshopTitle() {
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
    }
}