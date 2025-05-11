const AerialObstacle = require('../Obstacles/AerialObstacle');

describe('AerialObstacle class: ', () => {
    let obstacle;

    beforeEach(() => {
        // Mocks for p5 and game state
        global.createVector = (x, y) => ({x, y});
        global.image = jest.fn();
        global.push = jest.fn();
        global.pop = jest.fn();
        global.translate = jest.fn();
        global.rotate = jest.fn();
        global.imageMode = jest.fn();
        global.frameCount = 10;
        global.width = 800;
        global.CENTER = jest.fn();

        global.domains = {
            game: {
                zoom: 2,
                player: {
                    vel: {x: 5}
                },
                pause: {
                    active: false
                }
            }
        };

        obstacle = new AerialObstacle(300);
        obstacle.frameWidth = 20;
        obstacle.frameHeight = 20;
        obstacle.frameCount = 5;
        obstacle.scale = 1;
        obstacle.moveFactor = 2;
        obstacle.getBaseImage = jest.fn();
    });

    test(' check class initialises correctly', () => {
        expect(obstacle.height).toBe(300);
        expect(obstacle.pos).toEqual({ x: 800 / 2, y: 300 });
        expect(obstacle.hitByFish).toBe(false);
        expect(obstacle.hitByArrow).toBe(false);
        expect(obstacle.freezing).toBe(false);
    });

    test(' drawObstacle calls getBaseImage if no states set', () => {
        obstacle.drawObstacle();
        expect(obstacle.getBaseImage).toHaveBeenCalled();
    });

    test(' drawObstacle calls damaged image', () => {
        obstacle.hitByFish = true;
        obstacle.damagedImage = 'damaged_image';
        obstacle.drawObstacle();
        expect(global.image).toHaveBeenCalledWith('damaged_image', 0, 0, 20, 20);
    });

    test(' drawObstacle calls freezing image', () => {
        obstacle.freezing = true;
        obstacle.freezingImage = 'freezing_image';
        obstacle.frameIndex = 0;
        obstacle.drawObstacle();
        expect(global.image).toHaveBeenCalledWith('freezing_image', 0, 0, 20, 20, 20, 0, 20, 20);
    });

    test(' drawObstacle calls arrowDamageImage', () => {
        obstacle.hitByArrow = true;
        obstacle.arrowDamageImage = 'img_arrow';
        obstacle.drawObstacle();
        expect(global.image).toHaveBeenCalledWith('img_arrow', 0, 0, 20, 20);
    });

    test(' drawObstacle does not increment if paused', () => {
        domains.game.pause.active = true;
        obstacle.freezing = true;
        obstacle.frameIndex = 0;
        obstacle.drawObstacle();
        expect(obstacle.frameIndex).toBe(0);
    });


    test(' updatePosition moves right to left', () => {
        const initialX = obstacle.pos.x;
        const initialY = obstacle.pos.y;
        obstacle.updatePosition();
        // Moves left but height stays the same
        expect(obstacle.pos.x).toBeLessThan(initialX);
        expect(obstacle.pos.y).toBe(initialY);
    });

    test(' position changes when hit by fish', () => {
        obstacle.hitByFish = true;
        const initialX = obstacle.pos.x;
        const initialY = obstacle.pos.y;
        obstacle.updatePosition();
        // Moves left and drops
        expect(obstacle.pos.y).toBeGreaterThan(initialY);
        expect(obstacle.pos.x).toBeLessThan(initialX);
    });

    test(' position changes when hit by an arrow', () => {
        obstacle.hitByArrow = true;
        const initialX = obstacle.pos.x;
        const initialY = obstacle.pos.y;
        const initialAngle = obstacle.angle;
        obstacle.updatePosition();
        // Left and down and tilted angle
        expect(obstacle.pos.x).toBeLessThan(initialX);
        expect(obstacle.pos.y).toBeGreaterThan(initialY);
        expect(obstacle.angle).toBeGreaterThan(initialAngle);
    });

    test(' position and angle change when freezing', () => {
        obstacle.freezing = true;
        const initialX = obstacle.pos.x;
        const initialY = obstacle.pos.y;
        const initialAngle = obstacle.angle;
        obstacle.updatePosition();
        // Right and down and tilted angle
        expect(obstacle.pos.x).toBeGreaterThan(initialX);
        expect(obstacle.pos.y).toBeGreaterThan(initialY);
        expect(obstacle.angle).toBeGreaterThan(initialAngle);
    });
});
