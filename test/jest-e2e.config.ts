import jestConfig from '../jest.config';

export default {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.js',
  rootDir: '../',
  testRegex: '.e2e-spec.ts$',
};
