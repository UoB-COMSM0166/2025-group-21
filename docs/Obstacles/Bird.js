
class Bird extends AerialObstacle {

    constructor(height) {
        super(height);

        this.moveFactor = 1.5;
        this.frameIndex = 0;

        // Images for Bird
        this.baseImage = seagull;
        this.damagedImage = damagedUfo;
        this.frozenImage = frozenUfo;
        this.freezingImage = freezingUfo;
        this.arrowDamageImage = ufoArrowImpact;
    }

    getBaseImage() {
        const FRAME_WIDTH = 800;
        const FRAME_HEIGHT = 800;
        let frameSpeed = 8;
        const scaleFactor = 0.1;
        const FRAME_COUNT = 6;
        imageMode(CENTER);

        if (!domains.game.pause.active) {
            if (frameCount % frameSpeed === 0) {
                this.frameIndex++;
            }
            if (this.frameIndex > 6) this.frameIndex = 0;
        }
        image(
            this.baseImage,
            0, 0,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,  // Destination size
            this.frameIndex * FRAME_WIDTH, 0,                       // Source x, y
            FRAME_WIDTH, FRAME_HEIGHT                               // Source size
        );
    }
}