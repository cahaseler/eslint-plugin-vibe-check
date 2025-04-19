import rule from '../lib/rules/no-changelog-comments.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  }
});

ruleTester.run('comment-types-test', rule, {
  valid: [
    // Regular line comments
    '// This is a regular comment',
    '// The function handles input validation',
    
    // Regular block comments
    '/* This is a regular block comment */',
    '/* Multiple line\n   regular comment */',
    
    // Regular JSDoc comments
    `/**
     * This is a regular JSDoc comment
     * @param {Object} data - The data to process
     */`,
    
    // Inline comments after code
    'const value = 42; // This is a regular comment',
    
    // Inline block comments within code
    'function test() { /* This is a regular comment */ return true; }',
  ],
  
  invalid: [
    // Line comments with changelog terms
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
    
    // Block comments with changelog terms
    {
      code: '/* Changed how the data is processed */',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    {
      code: '/* Multiple line\n   updated comment */',
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // JSDoc comments with changelog terms
    {
      code: `/**
      * Updated component to use hooks instead of classes
      * This improves performance significantly
      */`,
      output: '',
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // Inline line comments with changelog terms
    {
      code: 'const value = 42; // Updated to improve accuracy',
      output: 'const value = 42; ',
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // Inline block comments with changelog terms
    {
      code: 'function test() { /* Changed implementation */ return true; }',
      output: 'function test() {  return true; }',
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // Comments attached to declarations
    {
      code: `// Updated API handling
      function fetchData() { return fetch('/api'); }`,
      output: `
      function fetchData() { return fetch('/api'); }`,
      errors: [{ messageId: 'changelogComment' }],
    },
    
    // Multiple comments on the same line
    {
      code: '/* Initial setup */ const x = 1; // Added for clarity',
      output: '/* Initial setup */ const x = 1; ',
      errors: [{ messageId: 'changelogComment' }],
    },
  ],
});