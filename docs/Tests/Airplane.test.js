const AerialObstacle = require('../Obstacles/AerialObstacle');
const Airplane = require('../Obstacles/Airplane');

describe('Airplane class', () => {
    let airplane;

    beforeEach(() => {
        // Mock p5 functions
        global.createVector = (x, y) => ({ x, y });
        global.image = jest.fn();
        global.push = jest.fn();
        global.pop = jest.fn();
        global.translate = jest.fn();
        global.rotate = jest.fn();
        global.imageMode = jest.fn();
        global.frameCount = 10;
        global.width = 800;
        global.CENTER = jest.fn();
        // Mock global assets
        global.airplane = 'mock_airplane_img';
        global.freezingAirplane = 'mock_freezing_img';
        // Mock game state
        global.domains = {
            game: {
                zoom: 2,
                player: {
                    vel: { x: 5 }
                },
                pause: {
                    active: false
                }
            }
        };

        airplane = new Airplane(400);
    });

    test(' check it inherits from AerialObstacle', () => {
        expect(airplane instanceof AerialObstacle).toBe(true);
    });

    test(' initialises with correct properties', () => {
        expect(airplane.moveFactor).toBe(7);
        expect(airplane.baseImage).toBe('mock_airplane_img');
        expect(airplane.damagedImage).toBe('mock_airplane_img');
        expect(airplane.freezingImage).toBe('mock_freezing_img');
        expect(airplane.arrowDamageImage).toBe('mock_airplane_img');
        expect(airplane.frameWidth).toBe(72);
        expect(airplane.frameHeight).toBe(31);
        expect(airplane.scale).toBe(2);
        expect(airplane.frameCount).toBe(8);
        expect(airplane.pos).toEqual({ x: 400, y: 400 });
    });

    test(' getBaseImage draws image with correct size', () => {
        airplane.getBaseImage();
        expect(global.image).toHaveBeenCalledWith('mock_airplane_img', 0, 0, 72 * 2, 31 * 2);
    });

    test(' drawObstacle uses getBaseImage when flags are set', () => {
        const spy = jest.spyOn(airplane, 'getBaseImage');
        airplane.drawObstacle();
        expect(spy).toHaveBeenCalled();
    });

    test(' updatePosition moves correctly', () => {
        const initialX = airplane.pos.x;
        airplane.updatePosition();
        expect(airplane.pos.x).toBeLessThan(initialX);
    });
});
