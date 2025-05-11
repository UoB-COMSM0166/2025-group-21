const Hearts = require('../Collectibles/Hearts');

describe('Hearts class', () => {
    let hearts;

    beforeEach(() => {
        global.settings = { difficulty: 0 };
        global.domains = {
            game: {
                terrain: {
                    generateHills: jest.fn((x) => 200 + x * 0.001),
                },
                player: {
                    pos: { x: 500, y: 200 },
                    lives: {
                        addLife: jest.fn(),
                    },
                },
                offset: 0,
                gainLifeSound: {
                    play: jest.fn(),
                },
            },
        };
        global.width = 800;
        global.random = jest.fn(() => 0);
        global.floor = Math.floor;
        global.createVector = (x, y) => ({ x, y });
        global.image = jest.fn();
        global.heartImages = [
            { width: 100, height: 100 },
            { width: 100, height: 100 },
            { width: 100, height: 100 },
            { width: 100, height: 100 },
        ];
        global.dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

        hearts = new Hearts();
    });

    test('initialises with correct spacing based on difficulty', () => {
        expect(hearts.spacing).toBe(11000);
        expect(hearts.heartsOn).toBe(true);
    });

    test('does not generate hearts on hard', () => {
        global.settings.difficulty = 2;
        const noHeartHearts = new Hearts();
        noHeartHearts.update(0);
        expect(noHeartHearts.hearts.length).toBe(0);
    });

    test('generates hearts ahead of player', () => {
        hearts.lastX = 0;
        hearts.update(0);
        expect(hearts.hearts.length).toBeGreaterThan(0);
        expect(hearts.lastX).toBeGreaterThan(0);
    });

    test('draws each heart on screen at correct position', () => {
        hearts.lastX = 0;
        hearts.update(0);
        expect(global.image).toHaveBeenCalled();
    });

    test('removes heart and adds life', () => {
        hearts.hearts = [{
            pos: { x: 500, y: 200 },
            num: 1
        }];
        domains.game.offset = 0;
        hearts.checkCollision();
        expect(domains.game.gainLifeSound.play).toHaveBeenCalled();
        expect(domains.game.player.lives.addLife).toHaveBeenCalled();
        expect(hearts.hearts.length).toBe(0);
    });

    test('does not trigger collision if heart is too far', () => {
        hearts.hearts = [{
            pos: { x: 1000, y: 200 },
            num: 2
        }];
        hearts.checkCollision();
        expect(domains.game.gainLifeSound.play).not.toHaveBeenCalled();
        expect(domains.game.player.lives.addLife).not.toHaveBeenCalled();
        expect(hearts.hearts.length).toBe(1);
    });
});
