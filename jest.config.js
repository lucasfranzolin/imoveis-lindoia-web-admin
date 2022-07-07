module.exports = {
    rootDir: '.',
    setupFilesAfterEnv: ['./jest.setup.js'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    collectCoverageFrom: [
        '!**/node_modules/**',
        '!**/.next/**',
        '<rootDir>/src/components/**/*.jsx',
    ],
};
