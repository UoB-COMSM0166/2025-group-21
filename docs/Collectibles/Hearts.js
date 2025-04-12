class Hearts {

    constructor() {
        this.hearts = [];
        this.spacing = 11000;
        this.lastX = 0;
    }

    update(offset) {
        // Remove hearts that leave the screen to stop build up
        // this.hearts = this.hearts.filter(heart => heart.x > offset - 200);
        // Generate a new heart ahead of player once they get past the last
        while (this.lastX < offset + width + 500) {
            let x = this.lastX + this.spacing + random(-500, 500);
            let y = game.terrain.generateHills(x) - 25;
            this.hearts.push({
                pos: createVector(x, y),
                num: floor(random(1, 4))
            });
            this.lastX = x;
        }

        // Draw hearts at correct screen position (rather than total position)
        for (let heart of this.hearts) {
            let screenX = heart.pos.x - offset;
            let screenY = heart.pos.y;
            image(heartImages[heart.num], screenX, screenY,
                heartImages[heart.num].width*0.05, heartImages[heart.num].height*0.05);
        }
    }

    checkCollision() {
        for (let i = this.hearts.length - 1; i >= 0; i--) {
            let heart = this.hearts[i];
            let d = dist(game.player.pos.x, game.player.pos.y, heart.pos.x - game.offset, heart.pos.y);
            if (d < 30) {
                gainLifeSound.play();
                game.player.lives.addLife();
                this.hearts.splice(i, 1);
            }
        }
    }
}
