'use strict';

const rule = require('../lib/rules/no-changelog-comments');
const RuleTester = require('eslint').RuleTester;

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
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Updated the validation logic',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Fixed the bug that was causing crashes',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Removed unused variables',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Ensured correct initialization',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '/* Changed how the data is processed */',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: `/**
        * Updated component to use hooks instead of classes
        * This improves performance significantly
        */`,
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Refactored for better readability',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '// Improved performance by caching results',
      errors: [{ messageId: 'changelogComment' }],
    },
  ],
});