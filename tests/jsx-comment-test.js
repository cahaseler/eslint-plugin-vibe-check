import rule from '../lib/rules/no-changelog-comments.js';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
});

ruleTester.run('jsx-comment-test', rule, {
  valid: [
    // Regular JSX comment that doesn't contain changelog terms
    `function Component() {
      return (
        <div>
          {/* This is a regular comment */}
          <span>Hello</span>
        </div>
      );
    }`,
  ],
  
  invalid: [
    // JSX comment with changelog terms
    {
      code: `function Component() {
        return (
          <div>
            {/* Removed extra code */}
            <span>Hello</span>
          </div>
        );
      }`,
      output: `function Component() {
        return (
          <div>
            
            <span>Hello</span>
          </div>
        );
      }`,
      errors: [{ messageId: 'changelogComment' }],
    },
    // Inline JSX comment with changelog terms
    {
      code: `function Component() {
        return (
          <div>
            <span>Hello</span> {/* Updated text for clarity */}
          </div>
        );
      }`,
      output: `function Component() {
        return (
          <div>
            <span>Hello</span> 
          </div>
        );
      }`,
      errors: [{ messageId: 'changelogComment' }],
    },
    // Multiple JSX comments with changelog terms
    {
      code: `function Component() {
        return (
          <div>
            {/* Removed heading */}
            <span>Hello</span>
            {/* Added better styling */}
          </div>
        );
      }`,
      output: `function Component() {
        return (
          <div>
            
            <span>Hello</span>
            
          </div>
        );
      }`,
      errors: [
        { messageId: 'changelogComment' },
        { messageId: 'changelogComment' }
      ],
    },
  ],
});