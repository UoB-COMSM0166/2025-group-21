const Coins = require('../Collectibles/Coins');

describe('Coins class', () => {
    let coins;

    beforeEach(() => {
        global.width = 800;
        global.height = 600;

        global.domains = {
            game: {
                terrain: {
                    generateHills: jest.fn((x) => 300 + Math.sin(x / 100) * 20),
                },
                hearts: {
                    hearts: [0]
                },
                offset: 0,
                player: {
                    pos: { x: 100, y: 300 }
                },
                collectCoinSound: {
                    play: jest.fn()
                }
            }
        };

        global.createVector = jest.fn((x, y) => ({ x, y, copy: () => ({ x, y }) }));
        global.image = jest.fn();
        global.ingameCoin = {};
        global.coinImage = { width: 100, height: 100 };
        global.random = jest.fn((min, max) => (min + max) / 2);
        global.floor = Math.floor;
        global.abs = Math.abs;
        global.dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

        coins = new Coins();
    });

    test('initializes with correct default values', () => {
        expect(coins.coins).toEqual([]);
        expect(coins.collectedCoins).toEqual([]);
        expect(coins.totalCoinsCollected).toBe(0);
        expect(coins.spacing).toBe(4000);
        expect(coins.lastX).toBe(0);
    });

    test('generates new coins when player moves forward', () => {
        coins.update(0);
        expect(coins.coins.length).toBeGreaterThan(0);
    });

    test('filters out coins that are too far behind', () => {
        coins.coins = [{ x: -1000, y: 300 }, { x: 900, y: 300 }];
        coins.lastX = 10000;
        let initialCoins = coins.coins.length;
        coins.update(800);
        expect(coins.coins.length).toBeLessThan(initialCoins);
        expect(coins.coins[0].x).toBe(900);
    });


    test('collects coin when close to player', () => {
        coins.coins = [{ x: 100, y: 300, copy: () => ({ x: 100, y: 300 }) }];
        coins.checkCollision();
        expect(coins.coins.length).toBe(0);
        expect(coins.collectedCoins.length).toBe(1);
        expect(coins.totalCoinsCollected).toBe(1);
        expect(domains.game.collectCoinSound.play).toHaveBeenCalled();
    });

    test('shrinks and removes collected coins over time', () => {
        coins.collectedCoins = [{
            pos: { x: 100, y: 300 },
            size: 0.01,
            height: 0
        }];
        coins.playCoinCollection(0);
        expect(coins.collectedCoins.length).toBe(0);
    });

    test('calculateCoords returns a point further along terrain', () => {
        const point = coins.calculateCoords(100);
        expect(point).toHaveProperty('x');
        expect(point).toHaveProperty('y');
        expect(point.x).toBeGreaterThan(100);
    });

    test('calculateOffset returns offset from terrain', () => {
        const result = coins.calculateOffset(100, 300);
        expect(result).toHaveProperty('x');
        expect(result).toHaveProperty('y');
        expect(result.y).toBeLessThan(300);
    });
});
