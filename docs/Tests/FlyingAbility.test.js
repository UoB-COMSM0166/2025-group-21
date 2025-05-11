const FlyingAbility = require('../Abilities/FlyingAbility');

describe('FlyingAbility', () => {
    let fly;

    beforeEach(() => {
        // Mock game environment
        global.domains = {
            game: {
                pause: { active: false },
                player: { vel: { y: 0 } },
                fly: { velocityBoost: 0.5 },
                infiniteFly: false,
            }
        };
        // Mock functions
        global.push = jest.fn();
        global.pop = jest.fn();
        global.fill = jest.fn();
        global.rect = jest.fn();
        global.width = 1000;
        global.height = 800;

        fly = new FlyingAbility(2);
    });

    test('initialises with correct values', () => {
        expect(fly.level).toBe(2);
        expect(fly.velocityBoost).toBe(0.5);
        expect(fly.maxCharge).toBe(340);
        expect(fly.chargeLeft).toBe(340);
        expect(fly.active).toBe(false);
    });

    test('applyUpwardForce decreases y velocity and charge', () => {
        fly.applyUpwardForce();
        expect(domains.game.player.vel.y).toBe(-0.5);
        expect(fly.chargeLeft).toBe(330);
    });

    test('applyUpwardForce does not decrease charge if cheats on', () => {
        domains.game.infiniteFly = true;
        fly.applyUpwardForce();
        expect(domains.game.player.vel.y).toBe(-0.5);
        expect(fly.chargeLeft).toBe(340);
    });

    test('applyUpwardForce does not work when chargeLeft is 0', () => {
        fly.chargeLeft = 0;
        fly.applyUpwardForce();
        expect(domains.game.player.vel.y).toBe(0);
    });

    test('charge increases chargeLeft correctly', () => {
        fly.chargeLeft = 300;
        fly.charge();
        expect(fly.chargeLeft).toBeGreaterThan(300);
    });

    test('charge does not exceed maxCharge', () => {
        fly.chargeLeft = fly.maxCharge;
        fly.charge();
        expect(fly.chargeLeft).toBeLessThanOrEqual(fly.maxCharge);
    });

    test('displayChargeLeft calls functions correctly', () => {
        fly.displayChargeLeft();
        expect(push).toHaveBeenCalled();
        expect(pop).toHaveBeenCalled();
        expect(fill).toHaveBeenCalledTimes(3);
        expect(rect).toHaveBeenCalledTimes(3);
    });
});
