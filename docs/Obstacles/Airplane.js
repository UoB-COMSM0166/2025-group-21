// Uncomment for testing
// if (typeof module !== 'undefined') { var AerialObstacle = require('./AerialObstacle'); }

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
        // Airplane image params
        this.frameWidth = 72;
        this.frameHeight = 31;
        this.scale = 2;
        this.frameCount = 8;
    }

    // Load airplane specific image
    getBaseImage() {
        image(this.baseImage, 0, 0, this.frameWidth*this.scale, this.frameHeight*this.scale);
    }
}

if (typeof module !== 'undefined') { module.exports = Airplane; }