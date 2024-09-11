import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
    '^.+\\.(t|j)s?$': '@swc/jest'
  },
  testMatch: ['**/*.spec.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/orders/core/services/**/*.ts',
    'src/order-preferences/core/services/**/*.ts',
    'src/reports/core/use-cases/**/*.ts',
    'src/reports/infrastructure/adapters/events/JsonToCsv.ts'
  ]
};

export default config;
