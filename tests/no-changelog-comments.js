import rule from '../lib/rules/no-changelog-comments.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('no-changelog-comments', rule, {
  valid: [
    '// This is a regular comment',
    '// The function handles input validation',
    '/* This code implements the core business logic */',
    '// TODO: Implement better error handling',
    '// FIXME: This has a bug in edge cases',
    `/**
      * This function processes data efficiently
      * @param {Object} data - The data to process
      * @returns {Object} The processed data
      */`,
  ],
  
  invalid: [
    {
      code: '// Added error handling for edge cases',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Updated the validation logic',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Fixed the bug that was causing crashes',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Removed unused variables',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Ensured correct initialization',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '/* Changed how the data is processed */',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: `/**
        * Updated component to use hooks instead of classes
        * This improves performance significantly
        */`,
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Refactored for better readability',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Improved performance by caching results',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
  ],
});