class Airplane extends AerialObstacle {

    constructor(height) {
        super(height);

        // Airplane speed
        this.moveFactor = 7;
        // Images for Airplane
        this.baseImage = airplane;
        this.damagedImage = airplane;
        this.freezingImage = freezingAirplane;
        this.arrowDamageImage = airplane;

        this.frameWidth = 72;
        this.frameHeight = 31;
        this.scale = 3;
        this.frameCount = 8;
    }

    getBaseImage() {
        image(this.baseImage, 0, 0, this.frameWidth*this.scale, this.frameHeight*this.scale);
    }

}