const Player = require('../Player/Player');
const Lives = require('../Player/Lives');

describe('Player Class', () => {
    let player;
    let mockImage;

    beforeEach(() => {
        global.domains = {
            game: {
                terrain: {
                    f: jest.fn(() => 300),
                    slope: jest.fn(() => 0.5),
                },
                loseLifeSound: {
                    isPlaying: jest.fn(() => false),
                    play: jest.fn(),
                },
                invincibility: false,
                player: {},
                death: {}
            }
        };
        global.createVector = jest.fn((x, y) => ({ x, y }));
        global.image = jest.fn();
        mockImage = { width: 128, height: 128 };
        global.playerHead = mockImage;
        global.playerFlyFeet = mockImage;
        global.playerPenguinWings = mockImage;
        // Mock other functions
        global.atan2 = jest.fn(() => 0);
        global.atan = jest.fn(() => 0);
        global.push = jest.fn();
        global.pop = jest.fn();
        global.translate = jest.fn();
        global.rotate = jest.fn();
        global.imageMode = jest.fn();
        global.millis = jest.fn(() => 10000);

        player = new Player(100, 200, 500);
    });

    test('Player is initialised with correct properties', () => {
        expect(player.pos).toEqual({ x: 100, y: 200 });
        expect(player.vel).toEqual({ x: 0.1, y: 0 });
        expect(player.acc).toEqual({ x: 0, y: 0 });
        expect(player.radius).toBe(500*0.01);
        expect(player.inAir).toBe(true);
        expect(player.alive).toBe(true);
        expect(player.lives).toBeInstanceOf(Lives);
    });

    test('Player velocity increases with gravity', () => {
        const initialVelocity = player.vel.y;
        player.update();
        expect(player.vel.y).toBeGreaterThan(initialVelocity);
    });

    test('Player stops moving when in contact with the ground', () => {
        player.pos.y = 300;
        player.vel.y = 5;
        // Mock terrain
        const ground = 300;
        global.domains = {
            game: {
                terrain: {
                    f: jest.fn(() => ground),
                }
            }
        };
        player.update();
        expect(player.acc.y).toBe(0);
        expect(player.pos.y).toBe(ground);
    });

    test('Player moves based on slope', () => {
        player.pos = { x: 150, y: 200 };
        player.vel = { x: 1, y: 0 };
        // Mock the slope function
        const slope = 0.5;
        global.domains.game.terrain.slope = jest.fn(() => slope);
        const initialPos = player.pos.x;
        player.update();
        expect(player.pos.x).toBeGreaterThan(initialPos);
    });

    test('Player should lose a life if hit by terrain', () => {
        const initialLives = player.lives.getLives();
        player.pos.x = 100;
        player.vel.x = 2;
        player.vel.y = 25;
        // Mock terrain functions
        global.domains.game.terrain.f = jest.fn((x) => {
            if (x === 100) return 0;
            if (x === 102) return -5;
            return 0;
        });
        global.domains.game.terrain.slope = jest.fn(() => -0.6);
        player.calculateNormalForce();
        // Player hits something steep and loses a life
        expect(player.lives.getLives()).toBeLessThan(initialLives);
    });

    test('Player’s position should stay fixed when dead (UFO death)', () => {
        player.alive = false;
        global.domains.game.death = { type: 'UFO', currentY: 100 };
        player.update();
        // Position should be near death position
        expect(player.pos.y).toBeCloseTo(100, 0.1);
    });
});
