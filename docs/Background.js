// ---------------------------------------------------
// ----------------PARALLAX BACKGROUND----------------
// ---------------------------------------------------

//--------Array that will; hold the assets for background---------
let bgImages = [];

//-------Function to Preload the images in sketch.js-------------
function preloadBackgroundImages() {
    //---Loading all the assets for the background----------.
    let totalBackImages = 47;
    for (let i = 1; i <= totalBackImages; i++) {
        bgImages.push(loadImage(`assets/backgroundAssets/layer${i}.png`));
    }
}

class Background {
    constructor() {
        this.bgImages = bgImages;
        //---Random position for background each time the game starts--------------------
        this.xOffsets = this.bgImages.map(() => random(0, 1200));
        //---Base y position for the background (before any adjustments)-----------------
        this.yOffset = 200;

        this.initialSizes = [
            { width: 1200, height: 720 }, // 0
            { width: 1200, height: 720 }, // 1
            { width: 1200, height: 720 }, // 2
            { width: 1200, height: 720 }, // 3
            { width: 1200, height: 720 }, // 4
            { width: 1200, height: 720 }, // 5
            { width: 1200, height: 720 }, // 6
            { width: 1200, height: 720 }, // 7
            { width: 1200, height: 720 }, // 8
            { width: 1200, height: 720 }, // 9
            { width: 1200, height: 720 }, // 10
            { width: 1200, height: 720 }, // 11
            { width: 1200, height: 720 }, // 12
            { width: 1200, height: 720 }, // 13
            { width: 1200, height: 720 }, // 14
            { width: 1200, height: 720 }, // 15
            { width: 1200, height: 720 }, // 16
            { width: 1200, height: 720 }, // 17
            { width: 1200, height: 720 }, // 18
            { width: 1200, height: 720 }, // 19
            { width: 1200, height: 720 }, // 20
            { width: 1200, height: 720 }, // 21
            { width: 1200, height: 720 }, // 22
            { width: 1200, height: 720 }, // 23
            { width: 1200, height: 720 }, // 24
            { width: 1200, height: 720 }, // 25
            { width: 1200, height: 720 }, // 26
            { width: 1200, height: 720 }, // 27
            { width: 1200, height: 720 }, // 28
            { width: 1200, height: 720 }, // 29
            { width: 1200, height: 720 }, // 30
            { width: 1200, height: 720 }, // 31
            { width: 1200, height: 720 }, // 32
            { width: 1200, height: 720 }, // 33
            { width: 1200, height: 720 }, // 34
            { width: 1200, height: 720 }, // 35
            { width: 1200, height: 720 }, // 36
            { width: 1200, height: 720 }, // 37
            { width: 1200, height: 720 }, // 38
            { width: 1200, height: 720 }, // 39
            { width: 1200, height: 720 }, // 40
            { width: 1200, height: 720 }, // 41
            { width: 1200, height: 720 }, // 42
            { width: 1200, height: 720 }, // 43
            { width: 1200, height: 720 }, // 44
            { width: 1200, height: 720 }, // 45
            { width: 1200, height: 720 }  // 46
        ];

        this.logicalWidths = [
            1200, // 0 - alwaysTile
            1200, // 1 - alwaysTile
            2200, // 2
            2200, // 3
            2200, // 4
            2200, // 5
            2200, // 6
            2200, // 7
            2200, // 8
            1200, // 9 - alwaysTile
            2200, // 10
            2200, // 11
            2200, // 12
            2200, // 13
            2200, // 14
            1200, // 15 - alwaysTile
            2200, // 16
            2200, // 17 - alwaysTile
            2200, // 18
            2200, // 19
            2200, // 20
            1200, // 21 - alwaysTile
            2200, // 22
            1200, // 23 - alwaysTile
            2200, // 24
            2200, // 25
            1200, // 26 - alwaysTile
            2200, // 27
            1200, // 28 - alwaysTile
            2200, // 29
            2200, // 30
            2200, // 31
            2200, // 32
            2200, // 33
            2200, // 34
            2200, // 35
            2200, // 36
            2200, // 37
            1200, // 38 - alwaysTile
            2200, // 39
            2200, // 40
            1200, // 41 - alwaysTile
            2200, // 42
            2200, // 43
            2200, // 44
            1200, // 45 - alwaysTile
            1200  // 46
        ];

        this.speedMultipliers = [
            0.8, 0.75,
            0.54, 0.52, 0.51, 0.49, 0.48, 0.47, 0.46, 0.45,
            0.28, 0.26, 0.25, 0.24, 0.23, 0.22,
            0.2, 0.18,
            0.14, 0.13, 0.12, 0.11,
            0.09, 0.086,
            0.054, 0.053, 0.05,
            0.032, 0.03,
            0.015, 0.014, 0.013, 0.012, 0.011, 0.01, 0.01, 0.009, 0.008, 0.008,
            0.007, 0.0065, 0.006,
            0.004, 0.004, 0.004, 0.004,
            0.00000001
        ];

        this.baseWidth = 1800;

        this.yAdjustmentFactors = [
            1.5, 1.4,
            1.3, 1.2, 1.15, 1.14, 1.13, 1.12, 1.1, 1,
            0.95, 0.93, 0.90, 0.89, 0.88, 0.87,
            0.84, 0.81,
            0.78, 0.76, 0.75, 0.75,
            0.70, 0.68,
            0.62, 0.60, 0.58,
            0.54, 0.52,
            0.34, 0.33, 0.30, 0.29, 0.28, 0.27, 0.26, 0.25, 0.24, 0.23,
            0.18, 0.16, 0.15,
            0.04, 0.04, 0.04, 0.04,
            0
        ];

        this.sizeAdjustmentFactors = [
            1, 1,
            0.8, 0.78, 0.76, 0.75, 0.74, 0.73, 0.72, 0.7,
            0.60, 0.58, 0.56, 0.54, 0.52, 0.5,
            0.47, 0.45,
            0.45, 0.42, 0.33, 0.32,
            0.31, 0.3,
            0.13, 0.11, 0.09,
            0.07, 0.06,
            0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.07, 0.023,
            0.02, 0.018, 0.016,
            0.015, 0.015, 0.01, 0,
            0
        ];

        this.anchorBottomCenters = [
            { x: 600, y: 520 },
            { x: 600, y: 525 },
            { x: 631, y: 480 },
            { x: 641, y: 490 },
            { x: 600, y: 485 },
            { x: 600, y: 485 },
            { x: 759, y: 470 },
            { x: 600, y: 465 },
            { x: 861, y: 460 },
            { x: 650, y: 500 }, // 10 ---- ocean
            { x: 600, y: 470 },
            { x: 508, y: 465 },
            { x: 600, y: 450 },
            { x: 600, y: 435 },
            { x: 857, y: 430 },
            { x: 600, y: 460 }, // 16 ---- ocean
            { x: 534, y: 459 },
            { x: 600, y: 458 }, // 18 ---- ocean
            { x: 857, y: 390 },
            { x: 600, y: 388 },
            { x: 600, y: 386 },
            { x: 170, y: 450 }, // ------- 22: Ocean
            { x: 723, y: 370 },
            { x: 600, y: 430 }, // ------- 24: Snow
            { x: 615, y: 320 }, // 25: Mountain 1
            { x: 870, y: 350 }, // 26: Mountain 2
            { x: 296, y: 380 }, // ------- 27: Snow
            { x: 600, y: 320 }, // 28: Mountain 3
            { x: 170, y: 380 }, // -------- 29: Snow
            { x: 723, y: 275 }, // 30: Mountain 4
            { x: 600, y: 321 },
            { x: 615, y: 320 },
            { x: 870, y: 319 },
            { x: 296, y: 318 },
            { x: 600, y: 317 },
            { x: 615, y: 315 },
            { x: 870, y: 314 },
            { x: 296, y: 312 },
            { x: 600, y: 370 }, // ----------- 39: Snow
            { x: 615, y: 290 },
            { x: 870, y: 285 },
            { x: 296, y: 340 },
            { x: 600, y: 230 },
            { x: 200, y: 220 },
            { x: 870, y: 150 },
            { x: 870, y: 320 }, // 46 ---- snow
            { x: 870, y: 70 }
        ];

        this.speedZoomAdjustments = Array(this.bgImages.length).fill(1);

        this.alwaysTile = Array(this.bgImages.length).fill(false);
        this.alwaysTile[0] = true;
        this.alwaysTile[1] = true;
        this.alwaysTile[9] = true;
        this.alwaysTile[15] = true;
        this.alwaysTile[17] = true;
        this.alwaysTile[21] = true;
        this.alwaysTile[23] = true;
        this.alwaysTile[26] = true;
        this.alwaysTile[28] = true;
        this.alwaysTile[38] = true;
        this.alwaysTile[41] = true;
        this.alwaysTile[46] = true;

        // Initialize the offscreen buffer and caching variables.
        this.cacheCanvas = createGraphics(width, height);
        this.lastCacheUpdate = 0;
        this.cacheInterval = 30;
    }

    update(floorSpeed, zoom) {
        let scaleFactor = width / this.baseWidth;
        for (let i = 0; i < this.bgImages.length; i++) {
            let sizeScale = 1 + (zoom - 1) * this.sizeAdjustmentFactors[i];
            let speedZoomFactor = 1 + this.speedZoomAdjustments[i] * (zoom - 1);
            // Update the offset based on floor speed and parallax properties.
            this.xOffsets[i] -= floorSpeed * this.speedMultipliers[i] * sizeScale * speedZoomFactor;

            // Use the logical width for wrapping the offset.
            let spacing = this.logicalWidths[i];
            this.xOffsets[i] = (((this.xOffsets[i] + spacing / 2) % spacing) + spacing) % spacing - spacing / 2;
        }
    }

    redrawCache(zoom) {
        // Clear the offscreen buffer
        this.cacheCanvas.clear();
        // Draw all layers into the offscreen buffer
        for (let i = this.bgImages.length - 1; i >= 0; i--) {
            let scaleFactor = width / this.baseWidth;
            let sizeScale = this.sizeParallax(this.sizeAdjustmentFactors[i], zoom);
            let overallScale = scaleFactor * sizeScale;

            let img = this.bgImages[i];
            let targetWidth = this.initialSizes[i].width;
            let targetHeight = this.initialSizes[i].height;

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

            // Compute gap (if needed)
            let gap = 0;
            if (zoom < 1 && !this.alwaysTile[i]) {
                gap = targetWidth * (1 - sizeScale);
            }
            let spacing = this.logicalWidths[i] + gap;

            let effectiveCanvasWidth = width / overallScale;
            let copies;
            if (effectiveCanvasWidth < this.logicalWidths[i]) {
                copies = 1;
            } else {
                copies = Math.ceil(effectiveCanvasWidth / this.logicalWidths[i]) + 1;
            }

            for (let dx = -copies; dx <= copies; dx++) {
                this.cacheCanvas.image(img, dx * spacing, 0, targetWidth, targetHeight);
            }
            this.cacheCanvas.pop();
        }
    }

    // Helper function for Y adjustment.
    zoomParallax(factor, zoom) {
        return factor * (1 - zoom) * 100;
    }

    // Helper function for size scaling.
    sizeParallax(factor, zoom) {
        return 1 + (zoom - 1) * factor;
    }

    draw(zoom) {
        if (millis() - this.lastCacheUpdate > this.cacheInterval) {
            this.redrawCache(zoom);
            this.lastCacheUpdate = millis();
        }
        // Draw the cached background onto the main canvas.
        image(this.cacheCanvas, 0, 0, width, height);
    }
}