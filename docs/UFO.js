

class UFO {
    constructor(height) {

        this.height = height;
        this.pos = createVector(width/game.zoom, height);
        this.moveFactor = 3*Math.random() + 3;
        this.hitByFish = false;
    }

    drawUFO() {

        push();
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);

        if (this.hitByFish) {
            rotate(-0.5);
            image(damagedUfo, 0, 0, 100, 50);
        }
        else {
            image(ufo, 0, 0, 100, 50);
        }
        pop();
    }

    updatePosition() {

        this.pos.x -= (game.player.vel.x + 2*this.moveFactor);

        if (this.hitByFish) {
            this.pos.y += 7;
            this.pos.x += 1.5*this.moveFactor;
        }

        let nt = 0.03 * frameCount;
        noiseSeed(Date.now());

        this.pos.x += this.moveFactor * noise(nt + 1000) - this.moveFactor/2;
        this.pos.y += this.moveFactor * noise(nt + 10000) - this.moveFactor/2;
    }

}