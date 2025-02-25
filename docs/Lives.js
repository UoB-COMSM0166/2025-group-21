class Lives {

    constructor() {
        this.totalLives = 3;
    }

    getLives() {
        return this.totalLives;
    }

    addLife() {
        this.totalLives++;
        this.timeLifeGained = millis();
    }

    removeLife() {
        this.totalLives--;
        this.timeLifeLost = millis();
    }

    drawChangeLife() {
        // Text settings
        textSize(30);
        fill('black');
        textFont('Trebuchet MS');

        // Display life change for 1000 milliseconds
        if (millis() - this.timeLifeLost < 1000 && this.totalLives > 0) {
            text('-1 life', game.player.pos.x - 50, game.player.pos.y - 50);
        }
        else if (millis() - this.timeLifeGained < 1000) {
            text('+1 life', game.player.pos.x - 50, game.player.pos.y - 50);
        }
    }

    drawLives() {
        // Display total lives
        for (let i = 0; i < this.totalLives ; i++) {
            strokeWeight(0);
            fill('black');
            // ellipse((page.pageWidth*0.05+i*25) * page.scaleX, page.pageHeight*0.1, 20*page.scaleX);
            ellipse((50 + i*30), 50, 20);
        }
    }
}
