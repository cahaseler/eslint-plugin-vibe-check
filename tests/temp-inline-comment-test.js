import rule from '../lib/rules/no-changelog-comments.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  }
});

ruleTester.run('no-changelog-comments-inline-test', rule, {
  valid: [
    'const value = 42; // This is a regular comment'
  ],
  
  invalid: [
    {
      code: 'const value = 42; // Updated to improve accuracy',
      output: 'const value = 42; ',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: 'function test() { /* Changed implementation */ return true; }',
      output: 'function test() {  return true; }',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: `/**
        * Updated component to use hooks instead of classes
        * This improves performance significantly
        */
       function Component() {}`,
      output: `
       function Component() {}`,
      errors: [{ messageId: 'changelogComment' }],
    }
  ],
});