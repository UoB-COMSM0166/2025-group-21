

class Inventory {

    constructor() {
        this.coins = 9999;
        this.flyLevel = 5;
        this.laserLevel = 5;
        this.forceFieldLevel = 5;
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