export default {
  testEnvironment: 'jest-environment-node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/config/',
    '/<rootDir>/src/',
  ],
  transformIgnorePatterns: [],
  modulePaths: ['<rootDir>/test'],
};
