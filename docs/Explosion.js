

class Explosion {

    constructor(position) {
        this.pos = createVector(position.x, position.y);
        this.frameIndex = 0;
        this.explosionComplete = false;
    }

    explode() {
        const FRAME_WIDTH = 96;
        const FRAME_HEIGHT = 96;
        let frameSpeed = game.player.alive ? 3 : 12;
        const scaleFactor = 2;
        const FRAME_COUNT = 12;
        imageMode(CENTER);

        if (!game.pause.active) {

            if (frameCount % frameSpeed === 0) {
                this.frameIndex++;
            }
            this.updatePosition();
        }

        image(
            explosion,
            this.pos.x, this.pos.y,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,  // Destination size
            this.frameIndex * FRAME_WIDTH, 0,                       // Source x, y
            FRAME_WIDTH, FRAME_HEIGHT                               // Source size
        );

        if (this.frameIndex === FRAME_COUNT) {
            this.explosionComplete = true;
        }
    }

    updatePosition() {
        this.pos.x -= game.player.vel.x;
    }
}