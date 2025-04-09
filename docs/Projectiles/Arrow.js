

class Arrow extends Projectile {

    constructor(position, velocity, angle) {
        super(position, velocity);
        arrowSound.play();
        this.angle = angle;
        this.frameIndex = 0;
    }

    updatePosition() {
        this.pos.x += 0.75*this.vel.x;
        this.pos.y += 0.75*this.vel.y;
    }

    drawProjectile() {
        push();
        const FRAME_WIDTH = 60;
        const FRAME_HEIGHT = 9;
        let frameSpeed = 5;
        const scaleFactor = 2;
        const FRAME_COUNT = 4;
        imageMode(CENTER);

        if (!game.pause.active) {

            if (frameCount % frameSpeed === 0) {
                this.frameIndex++;
            }
        }

        //imageMode(LEFT);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle)
        image(
            arrow,
            0, 0,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,  // Destination size
            this.frameIndex%FRAME_COUNT * FRAME_WIDTH, 0,                       // Source x, y
            FRAME_WIDTH, FRAME_HEIGHT                               // Source size
        );
        pop();
    }
}