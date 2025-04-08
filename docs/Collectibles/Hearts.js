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
            this.hearts.push(createVector(x, y));
            this.lastX = x;
        }

        // Draw hearts at correct screen position (rather than total position)
        for (let heart of this.hearts) {
            let screenX = heart.x - offset;
            let screenY = heart.y - 45; // Added 45 extra so it sits above the snow nicely
            image(heartImage, screenX, screenY, 60, 60);
        }
    }

    checkCollision() {
        for (let i = this.hearts.length - 1; i >= 0; i--) {
            let heart = this.hearts[i];
            let d = dist(game.player.pos.x, game.player.pos.y, heart.x - game.offset, heart.y);
            if (d < 30) {
                game.player.lives.addLife();
                this.hearts.splice(i, 1);
            }
        }
    }
}
