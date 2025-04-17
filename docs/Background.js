// ---------------------------------------------------
// ----------------PARALLAX BACKGROUND----------------
// ---------------------------------------------------

// Global variables for the sprite sheet and its frames.
let spriteSheet;
let bgFrames = [];

//-------Function to Preload the images in sketch.js-------------
function preloadBackgroundImages() {
    // Load the single sprite sheet.
    spriteSheet = loadImage('assets/backgroundAssets/layers26UltraLowTest.webp');

    // Calculate source rectangles for the 26 frames.
    // Adjust these if you change the number of frames or layout.
    let totalBackImages = 26;

    // Example: higher quality frame sizes
    let cellWidth = 60;
    let cellHeight = 36;

    for (let i = 0; i < totalBackImages; i++) {
        let col = i % 5;
        let row = floor(i / 5);

        // We inset the source rect by 0.5px on each edge and shrink by 1px total:
        // This helps prevent bleeding from adjacent frames.
        let sx = col * cellWidth + 0.5;
        let sy = row * cellHeight + 0.5;
        let sw = cellWidth - 1;
        let sh = cellHeight - 1;

        // Store this metadata so we can draw that portion from the sprite sheet.
        bgFrames.push({ sx, sy, sw, sh });
    }
}

class Background {
    constructor() {
        // Use the sprite sheet and frames instead of multiple images.
        this.spriteSheet = spriteSheet;
        this.bgFrames = bgFrames;

        // We'll keep xOffsets and yOffset logic the same.
        this.xOffsets = Array.from({ length: this.bgFrames.length }, () => random(0, 1200));
        this.yOffset = 200;

        // Define initial display sizes for each layer (your “virtual” or “base” size).
        this.initialSizes = [];
        for (let i = 0; i < this.bgFrames.length; i++) {
            this.initialSizes.push({ width: 1200, height: 720 });
        }

        // The following arrays remain the same as before.
        this.logicalWidths = [
            1200, 1200, 1200, 2200, 1200,
            2200, 2200, 2200, 1200, 2200,
            1200, 2200, 2200, 1200, 2200,
            1200, 2200, 2200, 2200, 1200,
            2200, 2200, 2200, 1200, 1200,
            1200
        ];

        this.speedMultipliers = [
            0.8, 0.75, 0.45, 0.24, 0.22,
            0.2, 0.18, 0.12, 0.11, 0.09,
            0.086, 0.054, 0.053, 0.05, 0.032,
            0.03, 0.008, 0.008, 0.007, 0.0065,
            0.006, 0.004, 0.004, 0.004, 0.004,
            0.00000001
        ];

        this.baseWidth = 1800;

        this.yAdjustmentFactors = [
            1.5, 1.4, 1, 0.89, 0.87,
            0.84, 0.81, 0.75, 0.75, 0.70,
            0.68, 0.62, 0.60, 0.58, 0.54,
            0.52, 0.34, 0.23, 0.18, 0.16,
            0.15, 0.04, 0.04, 0.04, 0.04,
            0
        ];

        this.sizeAdjustmentFactors = [
            1, 1, 0.7, 0.54, 0.5,
            0.47, 0.45, 0.33, 0.32, 0.31,
            0.3, 0.13, 0.11, 0.09, 0.07,
            0.06, 0.07, 0.023, 0.02, 0.018,
            0.016, 0.015, 0.015, 0.01, 0.01,
            0
        ];

        this.anchorBottomCenters = [
            { x: 600, y: 520 }, { x: 600, y: 525 }, { x: 650, y: 500 }, { x: 600, y: 435 }, { x: 600, y: 460 },
            { x: 534, y: 459 }, { x: 600, y: 458 }, { x: 600, y: 386 }, { x: 170, y: 450 }, { x: 723, y: 370 },
            { x: 600, y: 430 }, { x: 615, y: 320 }, { x: 870, y: 350 }, { x: 296, y: 380 }, { x: 600, y: 320 },
            { x: 170, y: 380 }, { x: 296, y: 312 }, { x: 600, y: 370 }, { x: 615, y: 290 }, { x: 870, y: 285 },
            { x: 296, y: 340 }, { x: 600, y: 230 }, { x: 200, y: 220 }, { x: 870, y: 150 }, { x: 870, y: 320 },
            { x: 870, y: 70 }
        ];

        this.speedZoomAdjustments = Array(this.bgFrames.length).fill(1);

        this.alwaysTile = Array(this.bgFrames.length).fill(false);
        this.alwaysTile[0] = true;
        this.alwaysTile[1] = true;
        this.alwaysTile[2] = true;
        this.alwaysTile[4] = true;
        this.alwaysTile[6] = true;
        this.alwaysTile[8] = true;
        this.alwaysTile[10] = true;
        this.alwaysTile[13] = true;
        this.alwaysTile[15] = true;
        this.alwaysTile[17] = true;
        this.alwaysTile[20] = true;
        this.alwaysTile[24] = true;
        this.alwaysTile[25] = true;

        // Initialize the offscreen buffer and caching variables.
        this.cacheCanvas = createGraphics(width, height);
        // Disable smoothing so edges don’t bleed:
        this.cacheCanvas.noSmooth();

        this.lastCacheUpdate = 0;
        this.cacheInterval = 30; // in milliseconds
    }

    update(floorSpeed, zoom) {
        let scaleFactor = width / this.baseWidth;
        for (let i = 0; i < this.bgFrames.length; i++) {
            let sizeScale = 1 + (zoom - 1) * this.sizeAdjustmentFactors[i];
            let speedZoomFactor = 1 + this.speedZoomAdjustments[i] * (zoom - 1);

            // Update xOffset based on floor speed and parallax properties.
            this.xOffsets[i] -= floorSpeed * this.speedMultipliers[i] * sizeScale * speedZoomFactor;

            // Use initialSizes width (1200) for base width.
            let baseWidth_i = this.initialSizes[i].width * scaleFactor;
            let finalWidth = baseWidth_i * sizeScale;

            // Wrap the offset to be in [-finalWidth/2, finalWidth/2)
            this.xOffsets[i] = (((this.xOffsets[i] + finalWidth / 2) % finalWidth) + finalWidth) % finalWidth - finalWidth / 2;
        }
    }

    // Helper function: Y adjustment.
    zoomParallax(factor, zoom) {
        return factor * (1 - zoom) * 100;
    }

    // Helper function: Size scaling.
    sizeParallax(factor, zoom) {
        return 1 + (zoom - 1) * factor;
    }

    // Method to render all background layers to the offscreen buffer.
    redrawCache(zoom) {
        // Clear the offscreen buffer.
        this.cacheCanvas.clear();

        for (let i = this.bgFrames.length - 1; i >= 0; i--) {
            let scaleFactor = width / this.baseWidth;
            let sizeScale = this.sizeParallax(this.sizeAdjustmentFactors[i], zoom);
            let overallScale = scaleFactor * sizeScale;

            // Source rect for the i-th frame
            let meta = this.bgFrames[i];

            // The intended “on-screen” size (1200×720) for each layer (before scaling).
            let targetWidth = this.initialSizes[i].width;
            let targetHeight = this.initialSizes[i].height;

            // Where that layer’s “bottom center” will appear on screen.
            let anchorDesign = this.anchorBottomCenters[i];
            let anchorScreenX = anchorDesign.x * scaleFactor;
            let anchorScreenY = anchorDesign.y * scaleFactor + this.yOffset;
            let yAdjustment = this.zoomParallax(this.yAdjustmentFactors[i], zoom);

            let anchorX = anchorScreenX + this.xOffsets[i];
            let anchorY = anchorScreenY + yAdjustment;

            this.cacheCanvas.push();
            this.cacheCanvas.translate(anchorX, anchorY);
            this.cacheCanvas.scale(overallScale);
            this.cacheCanvas.translate(-targetWidth / 2, -targetHeight / 2);

            // If zoom < 1 and we don't tile this layer, we only draw 1 copy
            let gap = 0;
            if (zoom < 1 && !this.alwaysTile[i]) {
                gap = targetWidth * (1 - sizeScale);
            }
            let spacing = this.logicalWidths[i] + gap;

            let effectiveCanvasWidth = width / overallScale;
            let copies;
            if (zoom < 1 && !this.alwaysTile[i]) {
                copies = 1;
            } else {
                copies = Math.ceil(effectiveCanvasWidth / this.logicalWidths[i]) + 1;
            }

            // Draw the sprite sheet's portion for this layer:
            for (let dx = -copies; dx <= copies; dx++) {
                this.cacheCanvas.image(
                    this.spriteSheet,            // entire sprite sheet
                    dx * spacing, 0,             // destination x, y on cacheCanvas
                    targetWidth, targetHeight,   // destination width/height
                    meta.sx, meta.sy, meta.sw, meta.sh  // source rectangle (with half-pixel inset)
                );
            }
            this.cacheCanvas.pop();
        }
    }

    // Draw method: Update the offscreen cache if necessary and then draw it.
    draw(zoom) {
        if (millis() - this.lastCacheUpdate > this.cacheInterval) {
            this.redrawCache(zoom);
            this.lastCacheUpdate = millis();
        }
        image(this.cacheCanvas, 0, 0, width, height);
    }
}