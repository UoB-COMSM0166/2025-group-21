class Hearts {

    constructor() {
        this.hearts = [];
        this.spacing = 10000;
        this.lastX = 0;
    }

    update(offset) {
        // Generate a new heart ahead of player once they get past the last
        while (this.lastX < offset + width + 500) {
            let x = this.lastX + this.spacing + random(-200, 200);
            let y = game.terrain.generateHills(x);
            this.hearts.push({
                pos: createVector(x, y),
                num: floor(random(1, 4))
            });
            this.lastX = x;
        }

        // Draw hearts at correct screen position (rather than total position)
        for (let heart of this.hearts) {
            let screenX = heart.pos.x - offset;
            let screenY = heart.pos.y - 45; // Added 45 extra so it sits above the snow nicely
            image(heartImages[heart.num], screenX, screenY,
                heartImages[heart.num].width*0.05, heartImages[heart.num].height*0.05);
        }
    }

    checkCollision() {
        for (let i = this.hearts.length - 1; i >= 0; i--) {
            let heart = this.hearts[i];
            let d = dist(game.player.pos.x, game.player.pos.y, heart.pos.x - game.offset, heart.pos.y);
            if (d < 30) {
                game.player.lives.addLife();
                this.hearts.splice(i, 1);
            }
        }
    }
}
