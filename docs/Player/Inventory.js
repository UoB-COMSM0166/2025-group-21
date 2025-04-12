

class Inventory {

    constructor() {
        this.coins = 0;
        this.flyLevel = 5;
        this.laserLevel = 4;
        this.forceFieldLevel = 0;
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
}