

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
        let textSize = width / 400;
        let numString = textSize.toString() + 'rem'

        this.playButton.position(
            0.78*width,
            0.85*height);

        this.playButton.size(width/5, height/8);
        this.playButton.class('playButton');
        this.playButton.style('font-size', numString);
    }

    printWorkshopTitle() {
        let size = width/8;
        fill(223, 162, 146);
        textFont('Trebuchet MS');
        textAlign(CENTER, TOP);
        stroke(175, 84, 60);
        strokeWeight(size/10);
        textSize(size);
        text('Workshop', width/2, 0.001*width);
        noStroke();
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
            ellipse(width*0.04, height*0.07, size/2.5);
            fill(0);
            strokeWeight(size/40);
            text(`×${inventory.coins}`, width*0.075, height*0.073);
        pop()
    }
}