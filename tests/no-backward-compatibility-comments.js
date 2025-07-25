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
    '// This handles general compatibility between systems',
    '// Support for modern browsers only',
    '// No backward or forward compatibility needed',
    // Test cases to ensure we don't get false positives 
    '// backwardcompatibility without separators',
    '// legacysupport without separators',
    '// just backward',
    '// just compatibility',
    '// just legacy',
    '// just support',
    `/**
      * This function processes data efficiently
      * @param {Object} data - The data to process
      * @returns {Object} The processed data
      */`,
  ],
  
  invalid: [
    {
      code: '// Added for backward compatibility',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Keep this for backwards compatibility',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// This maintains compatibility with older versions',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Legacy support for IE11',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Legacy code - don\'t remove',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '/* Added to support old version of the API */',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Keep for compatibility with v1.0',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Support older browsers',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Deprecation support until v3.0',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '/* Migration compatibility layer */',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: `/**
        * This function supports legacy compatibility
        * Will be removed in future versions
        */`,
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// For backward compatibility with React 16',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// BACKWARD COMPATIBILITY: Keep this method',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// Keep old method for compatibility with legacy systems',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// legacy-support module for old browsers',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// legacy_support function',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// backward-compatibility concerns',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// backwards_compatibility layer',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    // Additional edge cases to test improved regex
    {
      code: '// legacy-support_module implementation',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: '// backward-compatibility.check() method',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
    {
      code: 'function foo() { /* legacy_support-wrapper */ }',
      errors: [{ messageId: 'backwardCompatibilityComment' }],
    },
  ],
});