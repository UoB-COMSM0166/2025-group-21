

class Inventory {

    constructor(gameProgress) {
        this.coins = gameProgress.coins;
        this.flyLevel = gameProgress.flyLevel;
        this.laserLevel = gameProgress.projectileLevel;
        this.forceFieldLevel = gameProgress.forceFieldLevel;
        /* --- current load‑out (what the player is wearing right now) --- */
        this.currentFlyItem        = this.flyLevel;        // 0‑5
        // –1 means “nothing equipped yet”; otherwise 0‑based index of equipped projectile
        this.currentProjectileItem = this.laserLevel > 0 ? this.laserLevel - 1 : -1;

        this.projectileRequirementLevel = {
            0: 0,  //fish
            1: 0,  //snowBall
            2: 2,  //crossbow
            3: 3,  //laser
            4: 4,  //slingshot
        };

        this.fligthRequirementLevel = {
            0: 0,  //noFlight
            1: 0,  //penguinWings
            2: 1,  //dragonWings
            3: 2,  //helicopterRotors
            4: 3,  //propaneBooster
            5: 4   //hydrogenBooster
        };

        this.forceFieldRequirementLevel = {
            0: 0,
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4
        };
    }

    getFlyingUpgradePrice() {
        return (this.flyLevel+1)*500;
    }

    getLaserUpgradePrice() {
        if(this.laserLevel ===0){
            return 10;
        }
        return this.laserLevel * 350;
    }

    getForceFieldUpgradePrice() {
        return (this.forceFieldLevel+1)*750;
    }

    getProjectileDescription(item) {
        switch(item) {
            case 1: return 'Regurgitated Fish:\n  - Launched straight from the \n    penguin’s mouth\n' +
                '  - Slippery, wobbly, and\n    surprisingly accurate\n' +
                '  - Collision knock back';
            case 2: return 'Snowball Cannon:\n - A full-on cannon strapped to \n      the penguin’s back\n' +
                ' - Cold, round, and slightly \n      passive-aggressive\n' +
                ' - Freezes enemies on impact';
            case 3: return 'Back-Mounted Crossbow:\n - Medieval tech meets penguin \n     ingenuity\n' +
                ' - Aim straight, shoot sharp, \n     regret nothing\n' +
                ' - Enemies fall faster, clearing \n     your path with style';
            case 4: return 'Beak-Mounted Laser:\n - Tiny laser attached right to\n     the penguin’s beak\n' +
                ' - Because pecking is so last\n     season\n' +
                ' - Vaporizes obstacles instantly';
            case 5: return 'Beak Railgun:\n - Massive laser railgun hooked\n    to your beak (battery pack\n     included!)\n' +
                ' - A weapon of freedom\n' +
                ' - Continuous laser barrage,\n    obliterating everything\n    ahead';
        }
    }

    getFlyingDescription(item) {
        switch(item) {
            case 1: return 'Flapping Penguin Wings:\n  - Actual penguin wings, now\n    with 20% more hope\n' +
                '  - Flap like your life depends\n    on it (it does)\n' +
                '  - Still not great, but hey,\n    progress!';
            case 2: return 'Dragon Wings:\n  - Because strapping lizard\n    wings on a penguin *always*\n    works\n' +
                '  - Flap harder. Believe harder.\n' +
                '  - Still can’t breathe fire.\n    Lame.';
            case 3: return 'Helicopter Rotors:\n  - When flapping just isn’t\n    cutting it\n' +
                '  - Hover like a confused drone\n' +
                '  - Try not to decapitate friends';
            case 4: return 'Propane Booster:\n  - Backyard BBQ turned jetpack\n' +
                '  - Smells like victory and\n    slightly burnt feathers\n' +
                '  - May void your warranty';
            case 5: return 'Hydrogen Booster:\n  - Like the Hindenburg, but\n    with more optimism\n' +
                '  - Serious lift. Serious risk.\n' +
                '  - May result in whiplash';
        }
    }

    getProjectileBuyRequirement(item) {
        switch(item) {
            case 1: return 'Requirements:\n' + '  - Being a Penguin\n\n';
            case 2: return 'Requirements:\n' + '  - Nothing. Just the money!\n\n';
            case 3: return 'Requirements:\n' + '  - Owning the Snow Cannon\n\n';
            case 4: return 'Requirements:\n' + '  - Owning the Crossbow\n\n';
            case 5: return 'Requirements:\n' + '  - Owning the laser\n\n';
        }
    }

    getFlyingBuyRequirement(item) {
        switch(item) {
            case 1: return 'Requirements:\n' + '  - Being a Penguin\n\n';
            case 2: return 'Requirements:\n' + '  - Having learned how to flap\n\n';
            case 3: return 'Requirements:\n' + '  - Owning the Dragon Wings\n\n';
            case 4: return 'Requirements:\n' + '  - Owning the helicopter\n    ' +
                'rotors\n\n';
            case 5: return 'Requirements:\n' + '  - Owning the Propane\n    Booster\n\n';
        }
    }

    getHeadImage() {
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

    getFeetImageForWorkshop(flyLevel) {
        console.log('flylevel =', this.laserLevel);
        switch (flyLevel) {
            case 1: return playerFlyFeet;
            case 2: return playerFlyFeet;
            case 3: return playerFlyFeet;
            case 4: return playerFlyBooster;
            case 5: return playerFlyBooster;
            default: return playerFlyFeet;
        }
    }

    getWingImage() {
        console.log('flylevel =', this.flyLevel);
        switch (this.flyLevel) {
            case 1: return playerPenguinWings;
            case 2: return playerDragonWings;
            case 3: return playerHelicopterRotor;
            case 4: return playerPenguinWings;
            case 5: return playerPenguinWings;
            default: return playerPenguinWings;
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