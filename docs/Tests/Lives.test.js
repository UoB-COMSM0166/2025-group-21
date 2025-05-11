const Lives = require('../Player/Lives');

describe('Lives class', () => {
    let lives;
    let mockGame;

    beforeEach(() => {
        // Set up a mock millis function
        global.millis = jest.fn(() => 10000);

        // Mock the global domains object
        mockGame = {
            loseLifeSound: {
                isPlaying: jest.fn(() => false),
                play: jest.fn()
            },
            player: {
                lostLife: false,
                gainedLife: false,
                alive: true
            }
        };
        global.domains = { game: mockGame };
        // Mock other functions
        global.image = jest.fn();
        global.fill = jest.fn();
        global.rect = jest.fn();
        global.push = jest.fn();
        global.pop = jest.fn();
        global.lerp = (start, stop, amt) => start + (stop - start) * amt;
        global.width = 1280;
        global.height = 720;
        global.heartImages = [{ width: 100, height: 100 }];

        lives = new Lives();
    });

    test(' Initializes with 3 lives', () => {
        expect(lives.getLives()).toBe(3);
    });

    test(' Adds a life', () => {
        lives.addLife();
        expect(lives.getLives()).toBe(4);
        expect(typeof lives.timeLifeGained).toBe('number');
    });

    test(' Removes a life', () => {
        lives.removeLife();
        expect(lives.getLives()).toBe(2);
        expect(typeof lives.timeLifeLost).toBe('number');
    });

    test(' Removes a life and plays sound', () => {
        lives.removeLife();
        expect(lives.getLives()).toBe(2);
        expect(typeof lives.timeLifeLost).toBe('number');
        expect(lives.playingAnimation).toBe(true);
        expect(mockGame.loseLifeSound.play).toHaveBeenCalled();
    });

    test(' Does not play sound if it is already playing', () => {
        mockGame.loseLifeSound.isPlaying.mockReturnValue(true);
        lives.removeLife();
        expect(mockGame.loseLifeSound.play).not.toHaveBeenCalled();
    });

    test(' drawChangeLife sets player lost/gained life flags correctly', () => {
        lives.timeLifeLost = 9000;
        lives.timeLifeGained = 9000;
        lives.drawChangeLife();
        expect(mockGame.player.lostLife).toBe(true);
        expect(mockGame.player.gainedLife).toBe(true);
    });

    test(' drawLives calls image correct number of times', () => {
        lives.drawLives();
        expect(global.image).toHaveBeenCalledTimes(3);
    });

    test(' playLoseLifeAnimation fades in and out correctly', () => {
        lives.playingAnimation = true;
        lives.tintIntensity = 0;
        lives.tintIntensityHasPeaked = false;

        lives.playLoseLifeAnimation();
        expect(lives.tintIntensity).toBeGreaterThan(0);

        lives.tintIntensity = 0.9;
        lives.tintIntensityHasPeaked = true;
        lives.playLoseLifeAnimation();
        expect(lives.tintIntensity).toBeLessThan(0.9);
    });
});
