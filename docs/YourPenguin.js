// YourPenguin.js

export default class YourPenguin {
    constructor() {
        this.frameIndex = 0;
        this.headImg    = playerHead;
        this.feetImg    = playerFlyFeet;
        this.wingImg    = playerPenguinWings;
    }

    // Advance animation frame based on fly level and game state
    update() {
        const NORMAL_FRAME_COUNT = 6;
        const baseFrameSpeed     = 2;
        const step               = (inventory.flyLevel === 3) ? 2 : 1;
        if (frameCount % baseFrameSpeed === 0) {
            this.frameIndex = (this.frameIndex + step) % NORMAL_FRAME_COUNT;
        }
    }

    // Draw the current animation frame at the center of the canvas
    draw() {
        const FRAME_WIDTH    = 128;
        const FRAME_HEIGHT   = 128;
        const NORMAL_COLUMNS = 2;
        const scaleFactor    = 0.8;

        const col = this.frameIndex % NORMAL_COLUMNS;
        const row = Math.floor(this.frameIndex / NORMAL_COLUMNS);

        imageMode(CENTER);
        push();
        translate(width / 2, height / 2);

        // Always draw flying animation
        image(
            playerBody,
            0, 0,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
            col * FRAME_WIDTH, row * FRAME_HEIGHT,
            FRAME_WIDTH, FRAME_HEIGHT
        );
        // Head overlay
        image(
            this.headImg,
            0, 0,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
            0, 0,
            FRAME_WIDTH, FRAME_HEIGHT
        );
        // Feet overlay
        image(
            this.feetImg,
            0, 0,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
            0, FRAME_HEIGHT,
            FRAME_WIDTH, FRAME_HEIGHT
        );
        // Wings overlay
        image(
            this.wingImg,
            0, 0,
            FRAME_WIDTH * scaleFactor, FRAME_HEIGHT * scaleFactor,
            col * FRAME_WIDTH, row * FRAME_HEIGHT,
            FRAME_WIDTH, FRAME_HEIGHT
        );

        pop();
    }
}