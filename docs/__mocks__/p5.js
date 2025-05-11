// __mocks__/p5.js

global.createVector = jest.fn((x, y) => ({ x, y }));
global.image = jest.fn();
global.atan2 = jest.fn(() => 0); // Mock atan2
global.atan = jest.fn(() => 0); // Mock atan
global.push = jest.fn();
global.pop = jest.fn();
global.translate = jest.fn();
global.rotate = jest.fn();
global.imageMode = jest.fn();
