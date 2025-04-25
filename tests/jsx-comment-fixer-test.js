/**
 * @fileoverview Tests for JSX comment fixer logic in no-changelog-comments rule
 */

'use strict';

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { RuleTester } from 'eslint';

// Import both ESM and CJS versions to test both
import noChangelogCommentsEsm from '../lib/rules/no-changelog-comments.js';

describe('no-changelog-comments JSX comment fixer', () => {
  const ruleTester = new RuleTester({
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    }
  });

  it('properly removes JSX comments without affecting surrounding code', () => {
    ruleTester.run('no-changelog-comments', noChangelogCommentsEsm, {
      valid: [
        {
          code: `
            function Component() {
              return (
                <div>
                  {/* This is a normal comment */}
                  <span>Hello</span>
                </div>
              );
            }
          `,
        }
      ],
      invalid: [
        {
          code: `
            function Component() {
              return (
                <div>
                  {/* Removed extra code */}
                  <span>Hello</span>
                  <span>World</span>
                </div>
              );
            }
          `,
          output: `
            function Component() {
              return (
                <div>
                  
                  <span>Hello</span>
                  <span>World</span>
                </div>
              );
            }
          `,
          errors: [{ messageId: 'changelogComment' }]
        },
        {
          code: `
            function Component() {
              return (
                <div>
                  <span>Hello</span> {/* Updated text for clarity */}
                  <span>World</span>
                </div>
              );
            }
          `,
          output: `
            function Component() {
              return (
                <div>
                  <span>Hello</span> 
                  <span>World</span>
                </div>
              );
            }
          `,
          errors: [{ messageId: 'changelogComment' }]
        },
        {
          // Test with multiple JSX changelog comments
          code: `
            function Component() {
              return (
                <div>
                  {/* Added header */}
                  <h1>Title</h1>
                  {/* Updated text for better UX */}
                  <span>Hello</span>
                </div>
              );
            }
          `,
          output: `
            function Component() {
              return (
                <div>
                  
                  <h1>Title</h1>
                  
                  <span>Hello</span>
                </div>
              );
            }
          `,
          errors: [
            { messageId: 'changelogComment' },
            { messageId: 'changelogComment' }
          ]
        }
      ]
    });
  });
});