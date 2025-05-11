const Inventory = require('../Player/Inventory');

describe('Inventory Class', () => {
    let inventory;

    beforeEach(() => {
        // Mock global images
        global.playerHeadFish = 'head_fish';
        global.playerHeadSnowball = 'head_snowball';
        global.playerHeadArrow = 'head_arrow';
        global.playerHeadLaser = 'head_laser';
        global.playerHeadGatling = 'head_gatling';
        global.playerHead = 'default_head';
        global.playerFlyFeet = 'feet_fly';
        global.playerFlyBooster = 'feet_booster';
        global.playerPenguinWings = 'wings_penguin';
        global.playerDragonWings = 'wings_dragon';
        global.playerHelicopterRotor = 'wings_rotor';
        // Mock game progress state
        inventory = new Inventory({
            coins: 1000,
            flyLevel: 2,
            projectileLevel: 3,
            forceFieldLevel: 1
        });
    });

    test('initializes correctly from gameProgress', () => {
        expect(inventory.coins).toBe(1000);
        expect(inventory.flyLevel).toBe(2);
        expect(inventory.laserLevel).toBe(3);
        expect(inventory.forceFieldLevel).toBe(1);
    });

    test('calculates flying upgrade price correctly', () => {
        expect(inventory.getFlyingUpgradePrice()).toBe(1500);
    });

    test('calculates laser price correctly', () => {
        expect(inventory.getLaserUpgradePrice()).toBe(1050);
    });

    test('calculates force field price correctly', () => {
        expect(inventory.getForceFieldUpgradePrice()).toBe(1500);
    });

    test('returns correct projectile description for next level', () => {
        expect(inventory.getProjectileDescription()).toContain('laser');
    });

    describe('getHeadImage()', () => {
        test.each([
            [1, 'head_fish'],
            [2, 'head_snowball'],
            [3, 'head_arrow'],
            [4, 'head_laser'],
            [5, 'head_gatling'],
        ])(' returns correct head image for laserLevel=%i', (level, expected) => {
            inventory.laserLevel = level;
            expect(inventory.getHeadImage()).toBe(expected);
        });
    });

    describe('getFeetImage()', () => {
        test.each([
            [1, 'feet_fly'],
            [2, 'feet_fly'],
            [3, 'feet_fly'],
            [4, 'feet_booster'],
            [5, 'feet_booster'],
        ])('returns correct feet image for flyLevel=%i', (level, expected) => {
            inventory.flyLevel = level;
            expect(inventory.getFeetImage()).toBe(expected);
        });
    });

    describe('getWingImage()', () => {
        test.each([
            [1, 'wings_penguin'],
            [2, 'wings_dragon'],
            [3, 'wings_rotor'],
            [4, 'wings_penguin'],
            [5, 'wings_penguin'],
        ])('returns correct wing image for flyLevel=%i', (level, expected) => {
            inventory.flyLevel = level;
            expect(inventory.getWingImage()).toBe(expected);
        });
    });
});
