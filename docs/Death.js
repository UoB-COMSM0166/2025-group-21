

class Death {

    constructor() {
        this.deathTimer = new Clock();
        this.showStats = false;
        this.shopButton = null;
        this.playButton = null;
        this.statsButton = null;

        this.endScore = createVector(width/5, height/5 + height/30); // position of word 'score' at death
        this.numScore = createVector(width/7.5, height/2.8); // position of number at death
    }

    runPlayerDeathSequence() {

        // Death animation
        if (this.deathTimer.time < 120) {
            this.showFinalScore();
        }
        else if (!this.showStats) {
            this.showDeathScreen();
        }
        else game.stats.showsStatsScreen();
    }

    showFinalScore() {
        push()
        game.zoom = lerp(game.zoom, 1.25, 0.01);
        game.ty = game.player.pos.y - game.zoom * (game.player.pos.y);
        game.tx = 160 - game.zoom * (game.player.pos.x);

        this.deathTimer.tick();

        fill('rgba(255, 40, 0, 0.68)'); // overlay red screen tint
        rect(0, 0, width, height);

        fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
        rect(0, height/5, width, height*3/5);

        this.printScore();
        pop();
    }

    printScore() {
        let size = page.pageWidth/4;

        this.updateEndScorePrintLocation();

        fill(0);
        textFont('Trebuchet MS');
        textSize(size/5);
        stroke(255);
        strokeWeight(size/25);
        text('SCORE', this.endScore.x, this.endScore.y);
        textSize(size);
        textStyle(BOLD);
        textAlign(LEFT);
        //textFont('Courier New');
        text(`${game.score.total}`, this.numScore.x, this.numScore.y);
        strokeWeight(0);
        textStyle(NORMAL);
    }

    updateEndScorePrintLocation() {
        let size = page.pageWidth;
        this.endScore.x -= 0.0001*size;
        this.numScore.x += 0.001*size;
    }

    showDeathScreen() {
        fill('rgba(0, 0, 0, 0.6)') // overlay black tint under score
        rect(0, 0, width, height);

        document.body.classList.add("show-cursor");
        if (this.shopButton === null) this.shopButton = createButton('RETURN TO WORKSHOP');
        if (this.playButton === null) this.playButton = createButton('PLAY AGAIN');
        if (this.statsButton === null) this.statsButton = createButton('STATS');
        this.updateShopButton();
        this.updatePlayButton();
        this.updateStatsButton();
        this.shopButton.mousePressed(() => this.shopButtonPressed());
        this.playButton.mousePressed(() => this.playButtonPressed());
        this.statsButton.mousePressed(() => this.statsButtonPressed());
    }
    shopButtonPressed() {
        this.shopButton.remove();
        this.playButton.remove();
        this.statsButton.remove();
        game = null;
        Domain = 'shop';
    }
    playButtonPressed() {
        this.shopButton.remove();
        this.playButton.remove();
        this.statsButton.remove();
        game = null;
    }
    statsButtonPressed() {
        this.shopButton.remove();
        this.playButton.remove();
        this.statsButton.remove();
        this.shopButton = null;
        this.playButton = null;
        this.statsButton = null;
        this.showStats = true;
    }

    updateShopButton() {

        let textSize = page.pageWidth / 300;
        let numString = textSize.toString() + 'rem'

        this.shopButton.position(
            page.xPadding + page.margin + 0.11*page.pageWidth,
            page.yPadding + page.margin + 0.43*page.pageHeight);

        this.shopButton.class('quitButton')
        this.shopButton.style('font-size', numString);
        this.shopButton.size(page.pageWidth*0.8, page.pageHeight/10);
    }
    updatePlayButton() {

        let textSize = page.pageWidth / 300;
        let numString = textSize.toString() + 'rem'

        this.playButton.position(
            page.xPadding + page.margin + 0.11*page.pageWidth,
            page.yPadding + page.margin + 0.23*page.pageHeight);

        this.playButton.class('quitButton')
        this.playButton.style('font-size', numString);
        this.playButton.size(page.pageWidth*0.8, page.pageHeight/10);
    }
    updateStatsButton() {

        let textSize = page.pageWidth / 300;
        let numString = textSize.toString() + 'rem'

        this.statsButton.position(
            page.xPadding + page.margin + 0.11*page.pageWidth,
            page.yPadding + page.margin + 0.63*page.pageHeight);

        this.statsButton.class('quitButton')
        this.statsButton.style('font-size', numString);
        this.statsButton.size(page.pageWidth*0.8, page.pageHeight/10);
    }
}