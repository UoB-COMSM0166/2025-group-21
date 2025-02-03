//-----Parallax Background----------------------

//---Array to hold the layer assets-----
let bgImages = [];

//-------Function to Preload the images in sketch.js-------------
function preloadBackgroundImages() {
    bgImages[0] = loadImage("assets/layerA.png");
    bgImages[1] = loadImage("assets/layerB.png");
    bgImages[2] = loadImage("assets/layerC.png");
    bgImages[3] = loadImage("assets/layerE.png");
    bgImages[3] = loadImage("assets/layerF.png");

}


//-------Background class----------------------------------------
class Background{
    constructor(){
        //---Here we weill store the images after being preloaded------
        this.bgImages = bgImages;

        //---This array will hold the movement of each layer-----------
        // 0 means -> No movement
        this.xOffsets = Array(this.bgImages.length).fill(0);

        //---These are the speed multipliers for the Parallax effect---
        // Index 0  is the front layer
        this.speedMultipliers = [
            0.8, 0.75, 0.72, 0.68
        ];
    }

    //---Update method has to receive floorSpeed to "lock" the speed
    //      of the layers in relation to the floor
    update(floorSpeed){
        for (let i = 0; i < this.bgImages.length; i++){

            //--- Here I'm applying multipliers to each layer's speed
            this.xOffsets[i] -= floorSpeed * this.speedMultipliers[i];

            //---Here I am repositioning each pixel column back to the
            //  beginning after they leave the left side of the screen
            if (this.xOffsets[i] <= -this.bgImages[i].width) {
                this.xOffsets[i] += this.bgImages[i].width;
            }
        }
    }

    draw(canvasHeight) {
        //THE CANVASHEIGH will be used in the future for Y offset (proabably)

        //--- DrawING layers from the back (last image) to the front (first image)
        //       This gives the "on top" sensation

        //-----In case of vertical offset (For the zooming out feature (probably)
        let yPos = 0;
        for (let i = this.bgImages.length - 1; i >= 0; i--) {
            //---Primari copy of the image
            image(
                this.bgImages[i],
                this.xOffsets[i],
                yPos,
                this.bgImages[i].width,
                this.bgImages[i].height
            );
            //---Drawing teh an extra copy to ensure seamless wrapping
            image(
                this.bgImages[i],
                this.xOffsets[i] + this.bgImages[i].width,
                yPos,
                this.bgImages[i].width,
                this.bgImages[i].height
            );
        }
    }
}

