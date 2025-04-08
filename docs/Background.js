// ---------------------------------------------------
// ----------------PARALLAX BACKGROUND----------------
// ---------------------------------------------------

//--------Array that will; hold the assets for bacgkound---------
let bgImages = [];

//-------Function to Preload the images in sketch.js-------------
function preloadBackgroundImages() {
    //---Loading all the assets for the background----------.
    let totalBackImages = 17;
    for (let i = 1; i <= totalBackImages; i++) {
        bgImages.push(loadImage(`assets/layer${i}.png`));
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
            0.8,
            0.75, 0.72, 0.68, 0.55, 0.44,
            0.35, 0.28, 0.25, 0.22, 0.19,
            0.16, 0.13, 0.11, 0.05, 0.03,
            0.02, 0.018, 0.016, 0.015, 0.014, 0.013,
            0.012, 0.011, 0.010, 0.009, 0.008
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
            0.9, 0.9, 0.9, 0.81, 0.81,
            0.765, 0.765, 0.72, 0.72, 0.72, 0.65,
            0.65, 0.63, 0.63, 0.63, 0.558, 0.558,
            0.45, 0.45, 0.45, 0.27, 0.27, 0.27,
            0.09, 0.09, 0.09, 0.09, 0.09
        ];

        //-----Size adjustment factors for each layer.-------
        this.sizeAdjustmentFactors = [
            1, 1, 1, 0.9, 0.9,
            0.85, 0.85, 0.80, 0.80, 0.80, 0.75,
            0.75, 0.7, 0.7, 0.7, 0.62, 0.62,
            0.5, 0.5, 0.5, 0.3, 0.3, 0.3,
            0.1, 0.1, 0.1, 0.1, 0.1
        ];


        // For each layer, specify where the bottom center should be on screen.
        // (These values are in screen coordinates; you can adjust them as needed.)
        this.anchorBottomCenters = [
            { x: 600, y: 1000},//Front fuLL LAYER
            { x: 600, y: 995 },//2 TWO assets
            { x: 631, y: 950 },//3
            { x: 641, y: 960 },//4 TWO ASSETS
            { x: 600, y: 955 },//5 MULTIPLE assets
            { x: 600, y: 955 },//6 floor
            { x: 759, y: 940 },//7
            { x: 600, y: 935 },//8 floor
            { x: 861, y: 930 },//9
            { x: 650, y: 970 },//10 Ocean ----------
            { x: 600, y: 940 },//11 small ice
            { x: 508, y: 935 },//12 small ice
            { x: 600, y: 920 },//13 ICE
            { x: 600, y: 905 },//14 ICE
            { x: 857, y: 900 },//15 small ice
            { x: 600, y: 930 },//16 Ocean ----------
            { x: 534, y: 890 },//17 ICE
            { x: 600, y: 920 },//18 floor
            { x: 857, y: 540 },//19
            { x: 600, y: 532 },//20
            { x: 600, y: 525 },//21 floor
            { x: 170, y: 518 },//22
            { x: 723, y: 520 },//23
            { x: 600, y: 521 },//24 floor
            { x: 615, y: 520 },//25
            { x: 870, y: 518 },//26
            { x: 296, y: 520 }//27
        ];
    }

    // Update horizontal offsets and wrap them using the final (scaled) image width.
    update(floorSpeed) {
        let scaleFactor = width / this.baseWidth;
        for (let i = 0; i < this.bgImages.length; i++) {
            //------First update the offset using your parallax multiplier.
            this.xOffsets[i] -= floorSpeed * this.speedMultipliers[i]

            //-------Compute the base (un-extra-scaled) width.
            let baseWidth_i = this.bgImages[i].width * scaleFactor;
            //------Compute the extra size scale.
            let sizeScale = 1 + (zoom - 1) * this.sizeAdjustmentFactors[i];
            //-------And compute the final drawn width.
            let finalWidth = baseWidth_i * sizeScale;

            //---- Wrap the offset so it stays within one copy of the final width.
            // (This ensures the tiling remains seamless even if the drawn size changes.)
            while (this.xOffsets[i] <= -finalWidth / 2) {
                this.xOffsets[i] += finalWidth;
            }
            while (this.xOffsets[i] >= finalWidth / 2) {
                this.xOffsets[i] -= finalWidth;
            }
        }
    }

    // Helper function for Y adjustment.
    zoomParallax(factor) {
        // When zoom is 1, (1 - zoom) is 0. When zoom < 1 (zooming out),
        // this returns a positive value (the layer is drawn lower).
        return factor * (1 - zoom) * 100;
    }

    // Helper function for size scaling.
    sizeParallax(factor) {
        // When zoom is 1, no change (returns 1). When zoom < 1, returns a value less than 1.
        return 1 + (zoom - 1) * factor;
    }

    draw() {
        // Loop through each background layer
        for (let i = this.bgImages.length - 1; i >= 0; i--) {
            //----Computing overall scaling:
            //    - scaleFactor adapts your design coordinates (baseWidth) to the current canvas.
            //    - sizeScale accounts for zoom (or any per-layer size adjustments).
            let scaleFactor = width / this.baseWidth;
            let sizeScale = this.sizeParallax(this.sizeAdjustmentFactors[i]);
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
            let yAdjustment = this.zoomParallax(this.yAdjustmentFactors[i]);
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
            translate(-imgW / 2, -imgH);

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
