module.exports = {
	preset: 'ts-jest',
	collectCoverage: false,
	testEnvironment: 'node',
	testMatch: ['**/*.spec.ts'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
