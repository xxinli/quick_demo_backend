module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "testRegex": "src/.+(spec|test)\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "coverageDirectory": "coverage",
  "coveragePathIgnorePatterns": [
  ],
  "coverageReporters": [
    "text-summary",
    "text",
    "html"
  ],
  "coverageThreshold": {
    "global": {
      "lines": 80,
      "functions": 80,
      "branches": 80,
      "statements": 80
    }
  },
  "setupFiles": [
    "<rootDir>/jestSetup.ts"
  ],
  "testEnvironment": "node"
};
