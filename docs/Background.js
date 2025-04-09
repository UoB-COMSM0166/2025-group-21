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
            0.34, 0.33, 0.29, 0.27, 0.25, 0.23, 0.22, 0.20, 0.19, 0.18,

            //40-42
            0.14, 0.13, 0.11,

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
            0.25, 0.24, 0.22,

            //28-29
            0.21, 0.2,

            //30-39
            0.13, 0.12, 0.11, 0.1, 0.09, 0.08, 0.08, 0.07, 0.07, 0.06,

            //40-42
            0.050, 0.047, 0.045,

            //43-46
            0.04, 0.04, 0.04, 0.04,

            //sky
            0
        ];


        // For each layer, specify where the bottom center should be on screen.
        // (These values are in screen coordinates; you can adjust them as needed.)
        this.anchorBottomCenters = [
            { x: 600, y: 650 }, // 1
            { x: 600, y: 655 }, // 2
            { x: 631, y: 610 }, // 3
            { x: 641, y: 620 }, // 4
            { x: 600, y: 615 }, // 5
            { x: 600, y: 615 }, // 6
            { x: 759, y: 600 }, // 7
            { x: 600, y: 595 }, // 8
            { x: 861, y: 590 }, // 9
            { x: 650, y: 630 }, // 10
            { x: 600, y: 600 }, // 11
            { x: 508, y: 595 }, // 12
            { x: 600, y: 580 }, // 13
            { x: 600, y: 565 }, // 14
            { x: 857, y: 560 }, // 15
            { x: 600, y: 590 }, // 16
            { x: 534, y: 589 }, // 17
            { x: 600, y: 588 }, // 18
            { x: 857, y: 520 }, // 19
            { x: 600, y: 518 }, // 20
            { x: 600, y: 516 }, // 21
            { x: 170, y: 580 }, // ------- 22: Ocean
            { x: 723, y: 500 }, // 23
            { x: 600, y: 560 }, // ------- 24: Snow
            { x: 615, y: 450 }, // 25: Mountain 1
            { x: 870, y: 480 }, // 26: Mountain 2
            { x: 296, y: 510 }, // ------- 27: Snow
            { x: 600, y: 450 }, // 28: Moubntain 3
            { x: 170, y: 510 }, // -------- 29: sNOW
            { x: 723, y: 405 }, // 30: Mountain 4
            { x: 600, y: 451 }, // 31
            { x: 615, y: 450 }, // 32
            { x: 870, y: 449 }, // 33
            { x: 296, y: 448 }, // 34
            { x: 600, y: 447 }, // 35
            { x: 615, y: 445 }, // 36
            { x: 870, y: 444 }, // 37
            { x: 296, y: 442 }, // 38
            { x: 600, y: 500 }, // ----------- 39: Snow
            { x: 615, y: 420 }, // 40
            { x: 870, y: 415 }, // 41
            { x: 296, y: 470 }, // 42
            { x: 600, y: 300 }, // 43
            { x: 200, y: 350 }, // 44
            { x: 870, y: 340 }, // 45
            { x: 870, y: 450 }, // 46
            { x: 870, y: 200 } // 47
        ];
    }

    // Update horizontal offsets and wrap them using the final (scaled) image width.
    update(floorSpeed, zoom) {
        let scaleFactor = width / this.baseWidth;
        for (let i = 0; i < this.bgImages.length; i++) {
            // Compute sizeScale based on current zoom for this layer:
            let sizeScale = 1 + (zoom - 1) * this.sizeAdjustmentFactors[i];

            // Adjust the x offset proportionally to the scaled width:
            this.xOffsets[i] -= floorSpeed * this.speedMultipliers[i] * sizeScale;

            // Compute the base (un-extra-scaled) width.
            let baseWidth_i = this.bgImages[i].width * scaleFactor;
            // Calculate the final width after applying the scaling factor.
            let finalWidth = baseWidth_i * sizeScale;

            // Wrap the offset so it stays within one copy of the final width.
            while (this.xOffsets[i] <= -finalWidth / 2) {
                this.xOffsets[i] += finalWidth;
            }
            while (this.xOffsets[i] >= finalWidth / 2) {
                this.xOffsets[i] -= finalWidth;
            }
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
        // Loop through each background layer
        for (let i = this.bgImages.length - 1; i >= 0; i--) {
            //----Computing overall scaling:
            //    - scaleFactor adapts your design coordinates (baseWidth) to the current canvas.
            //    - sizeScale accounts for zoom (or any per-layer size adjustments).
            let scaleFactor = width / this.baseWidth;
            let sizeScale = this.sizeParallax(this.sizeAdjustmentFactors[i], zoom);
            let overallScale = scaleFactor * sizeScale;

            //----gettingt the current image and its natural dimensions.
            let img = this.bgImages[i];
            let imgW = img.width;
            let imgH = img.height;

            //----DeterminINING the anchor point in screen coordinates.
            //     anchorBottomCenters HOLDS THE ANCHOR points for every image.. center
            //    Then add the horizontal parallax offset (xOffsets).
            let anchorDesign = this.anchorBottomCenters[i];
            let anchorScreenX = anchorDesign.x * scaleFactor;
            let anchorScreenY = anchorDesign.y * scaleFactor + this.yOffset;

            //----Applying Y adjustment factor here
            let yAdjustment = this.zoomParallax(this.yAdjustmentFactors[i], zoom);
            let anchorX = anchorScreenX + this.xOffsets[i];
            let anchorY = anchorScreenY + yAdjustment;

            // 4. Now set up the transformation so that scaling happens about the anchor.
            push();
            //----Moveing the origin to the anchor position.----
            translate(anchorX, anchorY);
            //----Scale the coordinate system by the overall scale.------
            scale(overallScale);
            // Translate so that the image’s natural anchor (its bottom center)
            // is at (0, 0). For a bottom-center anchor, subtract half the image’s width
            // and the full image height.
            translate(-imgW / 2, -imgH / 2);

            // 5. Horizontal tiling:
            //    In this transformed coordinate system, one image tile is drawn at (0, 0)
            //    and it covers from x = -imgW/2 to x = +imgW/2.
            //    The effective drawn width in screen pixels is: imgW * overallScale.
            //    The visible width (in these transformed units) is: width / overallScale.
            //    To cover the canvas, we calculate how many copies we might need.
            let copies = Math.ceil((width / overallScale) / imgW) + 1;

            //----Drawing copies to the left and right of the central tile.
            //--->?>>> The central tile is at offset dx = 0. Each tile is offset by imgW.
            for (let dx = -copies; dx <= copies; dx++) {
                image(img, dx * imgW, 0);
            }
            pop();
        }
    }
}
