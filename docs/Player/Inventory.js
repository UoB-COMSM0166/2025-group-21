

class Inventory {

    constructor(gameProgress) {
        this.coins = gameProgress.coins;
        this.flyLevel = gameProgress.flyLevel;
        this.laserLevel = gameProgress.projectileLevel;
        this.forceFieldLevel = gameProgress.forceFieldLevel;
    }

    getFlyingUpgradePrice() {
        return (this.flyLevel+1)*500;
    }

    getLaserUpgradePrice() {
        return this.laserLevel*350;
    }

    getForceFieldUpgradePrice() {
        return (this.forceFieldLevel+1)*750;
    }

    getProjectileDescription() {
        switch(this.laserLevel+1) {
            case 2: return 'Upgrade to snowball:\n\n   - Shoot further with improved accuracy\n' +
                                                   '   - Better collision knock back';
            case 3: return 'Upgrade to arrow:\n\n   - Path of an arrow follows a straight line\n' +
                                                '   - Improved path clearance after collisions';
            case 4: return 'Upgrade to laser:\n\n   - Increased projectile speed\n' +
                                                '   - Explosion upon collision and instant clearance';
            case 5: return 'Upgrade to automatic laser:\n\n   - Shoot lasers from a Gatling gun';
        }
    }

    getHeadImage() {
        console.log('laserLevel =', this.laserLevel);
        switch (this.laserLevel) {
            case 0: return playerHeadFish;
            case 1: return playerHeadFish;
            case 2: return playerHeadSnowball;
            case 3: return playerHeadArrow;
            case 4: return playerHeadLaser;
            case 5: return playerHeadGatling;
            default: return playerHead;
        }
    }

    getFeetImage() {
        console.log('flylevel =', this.laserLevel);
        switch (this.flyLevel) {
            case 1: return playerFlyFeet;
            case 2: return playerFlyFeet;
            case 3: return playerFlyFeet;
            case 4: return playerFlyBooster;
            case 5: return playerFlyBooster;
            default: return playerFlyFeet;
        }
    }

    drawStar(x, y, size) {
        push();
        translate(x, y);
        rotate(PI);

        beginShape();
        for (let i = 0; i < 5; i++) {
            let angle = PI / 2 + i * TWO_PI / 5;
            let outerX = cos(angle) * size / 2;
            let outerY = sin(angle) * size / 2;
            vertex(outerX, outerY);

            angle += TWO_PI / 10;
            let innerX = cos(angle) * size / 5;
            let innerY = sin(angle) * size / 5;
            vertex(innerX, innerY);
        }
        endShape(CLOSE);

        pop();
    }
}