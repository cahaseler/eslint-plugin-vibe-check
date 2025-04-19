import rule from '../lib/rules/never-assume.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('never-assume', rule, {
  valid: [
    '// This is a regular comment',
    '// We check if the parameter is valid first',
    '// Make sure to validate input before processing',
    '/* This code implements proper validation */',
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
      code: '// I assume this function always returns a string',
      errors: [{ messageId: 'assumption' }],
    },
    {
      code: '// Assuming the input is always valid',
      errors: [{ messageId: 'assumption' }],
    },
    {
      code: '// We can assume the user is authenticated',
      errors: [{ messageId: 'assumption' }],
    },
    {
      code: '/* This assumes the API will always return JSON */',
      errors: [{ messageId: 'assumption' }],
    },
    {
      code: `/**
        * Assumed to be a valid configuration object
        * This might break if the format changes
        */`,
      errors: [{ messageId: 'assumption' }],
    },
    {
      code: '// Let\'s not make assumptions here',
      errors: [{ messageId: 'assumption' }],
    },
    {
      code: '// The assumption is that users won\'t enter negative values',
      errors: [{ messageId: 'assumption' }],
    },
  ],
});