module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['dotenv-flow/config'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(react-dnd|core-dnd|@react-dnd|dnd-core|nanoid|react-dnd-html5-backend)/)',
  ],
  modulePathIgnorePatterns: ['./build/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        diagnostics: false,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/modules/shared/config/config.tests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/constants/*.ts',
    '!src/interfaces/*.d.ts',
    '!src/index.tsx',
    '!/node_modules/',
  ],
  coveragePathIgnorePatterns: [
    'index.ts',
    '/node_modules/',
    '/generated/',
    '/__tests__/',
    '/tests/',
    'src/modules/shared/config',
    'config.tests.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
