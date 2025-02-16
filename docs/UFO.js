

class UFO {
    constructor(height) {

        this.pos = createVector(width/game.zoom, height);
    }

    drawUFO() {
        imageMode(CENTER);
        image(ufo, this.pos.x, this.pos.y, 100, 50);
    }

    updatePosition() {
        this.pos.x -= game.player.vel.x;
    }
}