

class Inventory {

    constructor() {
        this.coins = 9999999999;
        this.flyLevel = 0;
        this.laserLevel = 1;
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