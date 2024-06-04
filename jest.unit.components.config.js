const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jsdom',
  testRegex: [
    '/__tests__/unit/components/.*\\.(ts|js)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.unit.components.setup.js'],
}

module.exports = createJestConfig(config)