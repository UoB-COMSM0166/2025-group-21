// ---------------------------------------------------
// ----------------PARALLAX BACKGROUND----------------
// ---------------------------------------------------

//--------Array that will; hold the assets for bacgkound---------
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
        //---Horizontal speed multipliers for parallax movement-----------
        this.speedMultipliers = [
            // front layers move faster
            0.8, 0.75,

            //3-10
            0.54, 0.52, 0.51, 0.49, 0.48, 0.47, 0.46, 0.45,

            //11-16
            0.28, 0.26, 0.25, 0.24, 0.23, 0.22,

            //17-18
            0.2, 0.18,

            //- 19 - 22
            0.14, 0.13, 0.12, 0.11,

            //-23 -24
            0.09, 0.086,

            //25 - 27
            0.054, 0.053, 0.05,

            //28-29
            0.032, 0.03,

            //30-39
            0.015, 0.014, 0.013, 0.012, 0.011, 0.01, 0.01, 0.009, 0.008, 0.008,

            //40-42
            0.007, 0.0065, 0.006,

            //43-46
            0.004, 0.004, 0.004, 0.004,

            //sky
            0.00000001
        ];

        //====================OLD=============================================
        //this.speedMultipliers = [
        //    0.8, 0.75, 0.72, 0.68, 0.55, 0.44,
        //    0.35, 0.28, 0.25, 0.22, 0.19,
        //    0.16, 0.13, 0.11, 0.05, 0.03,
        //    0.02, 0.018, 0.016, 0.015, 0.014, 0.013,
        //    0.012, 0.011, 0.010, 0.009, 0.008
        //];
        //---Base width used for scaling the background (your design width)---
        this.baseWidth = 1800;

        //------Y adjustment factors for each layer.-------
        //Front image: 7.5
        this.yAdjustmentFactors = [
            //1-2
            1.0, 0.98,

            //3-10
            0.89, 0.88, 0.87, 0.86, 0.85, 0.84, 0.83, 0.82,

            //11-16
            0.77, 0.75, 0.74, 0.73, 0.71, 0.69,

            //17-18
            0.67, 0.64,

            //- 19 - 22
            0.61, 0.59, 0.57, 0.56,

            //-23 -24
            0.53, 0.52,

            //25 - 27
            0.47, 0.45, 0.44,

            //28-29
            0.42, 0.40,

            //30-39
            0.24, 0.23, 0.20, 0.19, 0.18, 0.17, 0.16, 0.15, 0.14, 0.13,

            //40-42
            0.12, 0.11, 0.10,

            //43-46
            0.04, 0.04, 0.04, 0.04,

            //Sky
            0
        ];

        //-----Size adjustment factors for each layer.-------
        this.sizeAdjustmentFactors = [
            // close layers (don’t shrink or slow too drastically)
            1, 1,

            //3-10
            0.8, 0.78, 0.76, 0.75, 0.74, 0.73, 0.72, 0.7,

            //11-16
            0.60, 0.58, 0.56, 0.54, 0.52, 0.5,

            //17-18
            0.47, 0.45,

            //19 22
            0.45, 0.42, 0.33, 0.32,

            //-23 -24
            0.31, 0.3,

            //25 - 27
            0.13, 0.11, 0.09,

            //28-29
            0.07, 0.06,

            //30-39
            0.04, 0.038, 0.036, 0.034, 0.032, 0.03, 0.028, 0.026, 0.07, 0.023,

            //40-42
            0.02, 0.018, 0.016,

            //43-46
            0.015, 0.015, 0.01, 0.01,

            //sky
            0
        ];


        this.anchorBottomCenters = [
            { x: 600, y: 520 }, // 1
            { x: 600, y: 525 }, // 2
            { x: 631, y: 480 }, // 3
            { x: 641, y: 490 }, // 4
            { x: 600, y: 485 }, // 5
            { x: 600, y: 485 }, // 6
            { x: 759, y: 470 }, // 7
            { x: 600, y: 465 }, // 8
            { x: 861, y: 460 }, // 9
            { x: 650, y: 500 }, // 10 ---- ocean
            { x: 600, y: 470 }, // 11
            { x: 508, y: 465 }, // 12
            { x: 600, y: 450 }, // 13
            { x: 600, y: 435 }, // 14
            { x: 857, y: 430 }, // 15
            { x: 600, y: 460 }, // 16 ---- ocean
            { x: 534, y: 459 }, // 17
            { x: 600, y: 458 }, // 18 ---- ocean
            { x: 857, y: 390 }, // 19
            { x: 600, y: 388 }, // 20
            { x: 600, y: 386 }, // 21
            { x: 170, y: 450 }, // ------- 22: Ocean
            { x: 723, y: 370 }, // 23
            { x: 600, y: 430 }, // ------- 24: Snow
            { x: 615, y: 320 }, // 25: Mountain 1
            { x: 870, y: 350 }, // 26: Mountain 2
            { x: 296, y: 380 }, // ------- 27: Snow
            { x: 600, y: 320 }, // 28: Moubntain 3
            { x: 170, y: 380 }, // -------- 29: sNOW
            { x: 723, y: 275 }, // 30: Mountain 4
            { x: 600, y: 321 }, // 31
            { x: 615, y: 320 }, // 32
            { x: 870, y: 319 }, // 33
            { x: 296, y: 318 }, // 34
            { x: 600, y: 317 }, // 35
            { x: 615, y: 315 }, // 36
            { x: 870, y: 314 }, // 37
            { x: 296, y: 312 }, // 38
            { x: 600, y: 370 }, // ----------- 39: Snow
            { x: 615, y: 290 }, // 40
            { x: 870, y: 285 }, // 41
            { x: 296, y: 340 }, // 42 ------ snow
            { x: 600, y: 230 }, // 43
            { x: 200, y: 220 }, // 44
            { x: 870, y: 150 }, // 45
            { x: 870, y: 320 }, // 46 ----snow
            { x: 870, y: 70 }   // 47
        ];

        this.speedZoomAdjustments = Array(this.bgImages.length).fill(1);

        //-----This determines which layers tile continuously ----------
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
        this.alwaysTile[45] = true;
    }

    update(floorSpeed, zoom) {
        let scaleFactor = width / this.baseWidth;
        for (let i = 0; i < this.bgImages.length; i++) {
            // Compute the sizeScale based on zoom and this layer's sizeAdjustmentFactor.
            let sizeScale = 1 + (zoom - 1) * this.sizeAdjustmentFactors[i];

            // Compute the extra speed adjustment factor based on zoom and this layer's speedZoomAdjustment.
            let speedZoomFactor = 1 + this.speedZoomAdjustments[i] * (zoom - 1);

            // Update the xOffset with floorSpeed, the base speed multiplier, the image scaling, and our zoom factor.
            this.xOffsets[i] -= floorSpeed * this.speedMultipliers[i] * sizeScale * speedZoomFactor;

            // Compute the base (unscaled) width.
            let baseWidth_i = this.bgImages[i].width * scaleFactor;
            // Compute the final drawn width after applying the scaling factor.
            let finalWidth = baseWidth_i * sizeScale;

            // Wrap the offset so it stays within one copy of the final width.
// Wrap the offset to be in [-finalWidth/2, finalWidth/2)
            this.xOffsets[i] = (((this.xOffsets[i] + finalWidth/2) % finalWidth) + finalWidth) % finalWidth - finalWidth/2;
        }
    }

    // Helper function for Y adjustment.
    zoomParallax(factor, zoom) {
        // When zoom is 1, (1 - zoom) is 0. When zoom < 1 (zooming out),
        // this returns a positive value (the layer is drawn lower).
        return factor * (1 - zoom) * 100;
    }

    // Helper function for size scaling.
    sizeParallax(factor, zoom) {
        // When zoom is 1, no change (returns 1). When zoom < 1, returns a value less than 1.
        return 1 + (zoom - 1) * factor;
    }

    draw(zoom) {
        // Loop through each background layer from back to front.
        for (let i = this.bgImages.length - 1; i >= 0; i--) {
            let scaleFactor = width / this.baseWidth;
            let sizeScale = this.sizeParallax(this.sizeAdjustmentFactors[i], zoom);
            let overallScale = scaleFactor * sizeScale;

            let img = this.bgImages[i];
            let imgW = img.width;
            let imgH = img.height;

            // Compute anchor position in screen coordinates.
            let anchorDesign = this.anchorBottomCenters[i];
            let anchorScreenX = anchorDesign.x * scaleFactor;
            let anchorScreenY = anchorDesign.y * scaleFactor + this.yOffset;

            let yAdjustment = this.zoomParallax(this.yAdjustmentFactors[i], zoom);
            let anchorX = anchorScreenX + this.xOffsets[i];
            let anchorY = anchorScreenY + yAdjustment;

            push();
            translate(anchorX, anchorY);
            scale(overallScale);
            translate(-imgW / 2, -imgH / 2);

            // *** Tiling Loop: ***
            // Determine the gap between drawn images.
            let gap = 0;
            // If the layer is NOT forced to tile (alwaysTile == false)
            // and we are zoomed out (zoom < 1), compute a gap.
            if (zoom < 1 && !this.alwaysTile[i]) {
                // When zoomed out, the drawn width becomes imgW * sizeScale.
                // The natural gap could be the difference between the unscaled image width and its drawn width.
                gap = imgW * (1 - sizeScale);
            }
            // The spacing between copies is then:
            let spacing = imgW + gap;

            // Determine how many copies to draw.
            // For continuous tiling layers, spacing is just imgW.
            // For non-continuous, fewer copies may reveal gaps.
            let copies;
            if (zoom < 1 && !this.alwaysTile[i]) {
                // Draw only a couple of copies to let the gap show.
                copies = 1;
            } else {
                copies = Math.ceil((width / overallScale) / imgW) + 1;
            }

            for (let dx = -copies; dx <= copies; dx++) {
                image(img, dx * spacing, 0);
            }
            pop();
        }
    }
}
