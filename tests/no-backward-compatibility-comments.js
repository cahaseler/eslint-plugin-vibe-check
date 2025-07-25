import rule from '../lib/rules/no-backward-compatibility-comments.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester();

ruleTester.run('no-backward-compatibility-comments', rule, {
  valid: [
    '// This is a regular comment',
    '// This function handles user input validation',
    '/* This code implements the core business logic */',
    '// TODO: Implement better error handling',
    '// FIXME: This has a bug in edge cases',
    '// Note: This implementation uses the latest API',
    '// Updated to use the new architecture',
    '// Supports modern browsers only',
    '// Migration from old system is complete',
    `/**
      * This function processes data efficiently
      * @param {Object} data - The data to process
      * @returns {Object} The processed data
      */`,
  ],
  
  invalid: [
    {
      code: '// Added for backward compatibility',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Keep this for backwards compatibility',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// This maintains compatibility with older versions',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Legacy support for IE11',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Legacy code - don\'t remove',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '/* Added to support old version of the API */',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Keep for compatibility with v1.0',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Support older browsers',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Deprecation support until v3.0',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '/* Migration compatibility layer */',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: `/**
        * This function supports legacy compatibility
        * Will be removed in future versions
        */`,
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// For backward compatibility with React 16',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// BACKWARD COMPATIBILITY: Keep this method',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Keep old method for compatibility with legacy systems',
      output: '',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
  ],
});