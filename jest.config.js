module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['html', 'text', 'json-summary'],
  collectCoverageFrom: ['source/**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '(.sample)\\.(js)$'],
  moduleDirectories: ['node_modules', 'source'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/mocks/styleMock.js',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/lib/',
    '<rootDir>/umd/',
  ],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
