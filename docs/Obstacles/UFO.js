class UFO extends AerialObstacle {

    constructor(height) {
        super(height);

        // UFO speed
        this.moveFactor = 3*Math.random() + 3;
        // Images for UFO
        this.baseImage = ufo;
        this.damagedImage = damagedUfo;
        this.frozenImage = frozenUfo;
        this.freezingImage = freezingUfo;
        this.arrowDamageImage = ufoArrowImpact;
    }

    getBaseImage() {
        image(this.baseImage, 0, 0, 100, 50);
    }

    // UFO movement override
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

            let nt = 0.03 * frameCount;
            noiseSeed(Date.now());

            this.pos.x += this.moveFactor * noise(nt + 1000) - this.moveFactor/2;
            this.pos.y += this.moveFactor * noise(nt + 10000) - this.moveFactor/2;
        }
    }

}