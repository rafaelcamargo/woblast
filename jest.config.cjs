/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/index.tsx'
  ],
  coverageReporters: ['html', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  moduleNameMapper: {
    '^@src/.*\\.styl$': '<rootDir>/src/base/mocks/jest.style-mock.cjs',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '\\.styl$': '<rootDir>/src/base/mocks/jest.style-mock.cjs'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx'
        }
      }
    ],
    '^.+\\.jsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          allowJs: true
        }
      }
    ]
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
