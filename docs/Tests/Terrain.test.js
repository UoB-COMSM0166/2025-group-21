const Terrain = require('../Game/Terrain');

describe('Terrain Class', () => {
    let terrain;

    beforeEach(() => {
        global.settings = { difficulty: 1 };
        global.domains = {
            game: {
                zoom: 2,
                offset: 0,
            }
        };
        global.height = 600;
        global.sin = Math.sin;
        global.cos = Math.cos;
        global.PI = Math.PI;
        // Mock canvas
        global.beginShape = jest.fn();
        global.endShape = jest.fn();
        global.fill = jest.fn();
        global.CLOSE = 'CLOSE';
        const mockCanvas = {
            vertex: jest.fn(),
        };
        // Create a terrain instance
        terrain = new Terrain();
        terrain.drawLayer = jest.fn();
        terrain.drawSnow = jest.fn();
        terrain.f = jest.fn(x => 100 + Math.sin(x * 0.01) * 10);
    });

    test('initializes with correct number of waves and properties', () => {
        expect(terrain.amplitudes.length).toBe(31);
        expect(terrain.frequencies.length).toBe(31);
        expect(terrain.phases.length).toBe(31);
        expect(terrain.step).toBe(30);
    });

    test('updateHillParams modifies wave arrays correctly', () => {
        const oldLength = terrain.amplitudes.length;
        terrain.updateHillParams();
        expect(terrain.amplitudes.length).toBe(oldLength);
        expect(terrain.frequencies.length).toBe(oldLength);
        expect(terrain.phases.length).toBe(oldLength);
    });

    test('drawHills calls drawLayer and drawSnow 6 times and once respectively', () => {
        terrain.drawHills(500, {});
        expect(terrain.drawLayer).toHaveBeenCalledTimes(6);
        expect(terrain.drawSnow).toHaveBeenCalledTimes(1);
    });

    test('generateHills returns correct values for different x ranges', () => {
        let y;
        y = terrain.generateHills(100);
        expect(y).toBeCloseTo(height * 0.3, 1);
        y = terrain.generateHills(950);
        expect(typeof y).toBe('number');
    });

    test('slope returns numerical value', () => {
        terrain.f = x => x;
        const slope = terrain.slope(10);
        expect(slope).toBeCloseTo(1);
    });
});
