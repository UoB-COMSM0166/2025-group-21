

class UFO {
    constructor(height) {

        this.height = height;
        this.pos = createVector(width/game.zoom, height);
        this.moveFactor = 3*Math.random() + 3;
    }

    drawUFO() {
        imageMode(CENTER);
        image(ufo, this.pos.x, this.pos.y, 100, 50);
    }

    updatePosition() {
        this.pos.x -= (game.player.vel.x + 2*this.moveFactor);

        let nt = 0.03 * frameCount;
        noiseSeed(Date.now());

        this.pos.x += this.moveFactor * noise(nt + 1000) - this.moveFactor/2;
        this.pos.y += this.moveFactor * noise(nt + 10000) - this.moveFactor/2;
    }

}