const nextJest = require('next/jest')
 
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
})
 
const config = {
  testEnvironment: 'node',
  testRegex: [
    '/__tests__/api/services/.*\\.(ts|js)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js','<rootDir>/jest.api.setup.js'],
}
 
module.exports = createJestConfig(config)