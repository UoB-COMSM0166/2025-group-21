module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Explicitly specify the environment
    setupFiles: ['<rootDir>/__mocks__/p5.js'], // Set up the mock file for p5.js
    moduleNameMapper: {
        // Mock p5.js import if you're directly importing it
        'p5': '<rootDir>/__mocks__/p5.js'
    }
};
