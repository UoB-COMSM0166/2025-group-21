

class AerialObstacle {

    constructor(height) {
        this.height = height;
        this.pos = createVector(width/domains.game.zoom, height);

        // Obstacle states
        this.hitByFish = false;
        this.hitByArrow = false;
        this.freezing = false;
        this.frozen = false;

        this.frameIndex = 0;
        this.downVelocity = 0.2;
        this.angle = 0;

        // Speed overridden in child classes
        this.moveFactor = null;
        // Images overridden in child classes
        this.baseImage = null;
        this.damagedImage = null;
        this.frozenImage = null;
        this.freezingImage = null;
        this.arrowDamageImage = null;
    }

    drawObstacle() {

        push();
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);

        if (this.hitByFish) {
            rotate(-0.5);
            image(this.damagedImage, 0, 0, 100, 50);
        }
        else if (this.frozen) {
            rotate(this.angle)
            image(this.frozenImage, 0, 0, 100, 50);
        }
        else if (this.freezing) {
            const FRAME_WIDTH = 51;
            const FRAME_HEIGHT = 22;
            let frameSpeed = 2;
            const scaleFactor = 1;
            const FRAME_COUNT = 10;
            imageMode(CENTER);

            if (!domains.game.pause.active) {

                if (frameCount % frameSpeed === 0) {
                    this.frameIndex++;
                }
            }

            rotate(this.angle)
            image(
                this.freezingImage,
                0, 0,
                2*FRAME_WIDTH * scaleFactor, 2*FRAME_HEIGHT * scaleFactor,  // Destination size
                this.frameIndex * FRAME_WIDTH, 0,                       // Source x, y
                FRAME_WIDTH, FRAME_HEIGHT                               // Source size
            );

            if (this.frameIndex === FRAME_COUNT) {
                this.frozen = true;
            }
        }
        else if (this.hitByArrow) {
            const FRAME_WIDTH = 51;
            const FRAME_HEIGHT = 140;
            let frameSpeed = 2;
            const scaleFactor = 2;
            const FRAME_COUNT = 11;
            imageMode(CENTER);

            if (!domains.game.pause.active) {

                if (this.frameIndex < FRAME_COUNT && frameCount % frameSpeed === 0) {
                    this.frameIndex++;
                }
            }

            image(
                this.arrowDamageImage,
                0, 0,
                FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,  // Destination size
                this.frameIndex * FRAME_WIDTH, 0,                       // Source x, y
                FRAME_WIDTH, FRAME_HEIGHT                               // Source size
            );
        }
        else {
            this.getBaseImage();
        }
        pop();
    }

    updatePosition() {

        if (this.freezing) {
            this.pos.x += 6 - domains.game.player.vel.x;
            this.downVelocity+= 0.5
            this.pos.y += this.downVelocity;
            this.angle += 0.1;
        }
        else if (this.hitByArrow) {
            this.pos.x -= domains.game.player.vel.x;
            this.pos.y += 15;
        }

        else {
            this.pos.x -= (domains.game.player.vel.x + 2*this.moveFactor);

            if (this.hitByFish) {
                this.pos.y += 7;
                this.pos.x += 1.5*this.moveFactor;
            }
        }
    }

}