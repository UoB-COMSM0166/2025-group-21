

class Workshop {

    constructor() {
        document.body.classList.add("show-cursor");
        this.playButton = createButton('PLAY');
        this.updatePlayButtonSize();
    }

    openShop() { // Main loop for workshop
        background(228, 221, 159);
        this.updatePlayButtonSize();
        this.printWorkshopTitle();
        this.playButton.mousePressed(() => this.playButtonPressed());
        this.printCoins();
    }

    playButtonPressed() {
        this.playButton.remove();
        shop = null;
        Domain = 'game';
    }

    updatePlayButtonSize() {
        let textSize = page.pageWidth / 400;
        let numString = textSize.toString() + 'rem'

        this.playButton.position(
            page.xPadding + page.margin + 0.78*page.pageWidth,
            page.yPadding + page.margin + 0.85*page.pageHeight);

        this.playButton.size(page.pageWidth/5, page.pageHeight/8);
        this.playButton.class('playButton');
        this.playButton.style('font-size', numString);
    }

    printWorkshopTitle() {
        let size = page.pageWidth/8;
        fill(223, 162, 146);
        textFont('Trebuchet MS');
        textAlign(CENTER, TOP);
        stroke(175, 84, 60);
        strokeWeight(size/10);
        textSize(size);
        text('Workshop', width/2, 0.001*page.margin*page.pageWidth);
        noStroke();
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
        pop()
    }
}