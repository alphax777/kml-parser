module.exports = {
    verbose: true,
    bail: true,
    collectCoverage: true,
    testPathIgnorePatterns: ['/integration-tester/'],
    testEnvironment: 'node',
    // roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
