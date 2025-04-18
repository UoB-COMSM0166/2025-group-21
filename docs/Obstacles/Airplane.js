class Airplane extends AerialObstacle {

    constructor(height) {
        super(height);

        // Airplane speed
        this.moveFactor = 7;
        // Images for Airplane
        this.baseImage = airplane;
        this.damagedImage = damagedUfo;
        this.frozenImage = frozenUfo;
        this.freezingImage = freezingUfo;
        this.arrowDamageImage = ufoArrowImpact;
    }

    getBaseImage() {
        image(this.baseImage, 0, 0, 150, 100);
    }

}