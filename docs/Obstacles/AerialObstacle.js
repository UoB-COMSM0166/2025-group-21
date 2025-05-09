


// abstract
class AerialObstacle {

    constructor(height) {
        this.height = height;
        this.pos = createVector(width/domains.game.zoom, height);

        // Obstacle states
        this.hitByFish = false;
        this.hitByArrow = false;
        this.freezing = false;

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

        this.frameWidth = null;
        this.frameHeight = null;
        this.frameCount = null
        this.scale = null;
    }

    drawObstacle() {

        push();
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);

        if (this.hitByFish) {
            rotate(-0.5);
            image(this.damagedImage, 0, 0, this.frameWidth * this.scale, this.frameHeight * this.scale);
        }
        else if (this.freezing) {
            let frameSpeed = 2;
            imageMode(CENTER);

            if (!domains.game.pause.active) {

                if (frameCount % frameSpeed === 0 && this.frameIndex < this.frameCount-1) {
                    this.frameIndex++;
                }
            }

            rotate(this.angle);
            image(
                this.freezingImage,
                0, 0,
                this.frameWidth * this.scale, this.frameHeight * this.scale,  // Destination size
                this.frameIndex * this.frameWidth, 0,                         // Source x, y
                this.frameWidth, this.frameHeight                             // Source size
            );
        }
        else if (this.hitByArrow) {
            rotate(this.angle);
            image(this.arrowDamageImage, 0, 0, this.frameWidth*this.scale, this.frameHeight*this.scale);
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
            this.angle += 0.3;
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