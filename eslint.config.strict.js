/**
 * @fileoverview ESLint flat config for vibe-check (strict mode)
 */

import maxFileLines from './lib/rules/max-file-lines.js';
import noPlaceholderComments from './lib/rules/no-placeholder-comments.js';
import noHardcodedCredentials from './lib/rules/no-hardcoded-credentials.js';
import noChangelogComments from './lib/rules/no-changelog-comments.js';
import noBackwardCompatibilityComments from './lib/rules/no-backward-compatibility-comments.js';
import neverAssume from './lib/rules/never-assume.js';

const rules = {
  'max-file-lines': maxFileLines,
  'no-placeholder-comments': noPlaceholderComments,
  'no-hardcoded-credentials': noHardcodedCredentials,
  'no-changelog-comments': noChangelogComments,
  'no-backward-compatibility-comments': noBackwardCompatibilityComments,
  'never-assume': neverAssume,
};

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'examples/typescript-example.ts',
      'examples/tsx-example.tsx'
    ]
  },
  // JavaScript files (strict mode)
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'vibe-check': {
        rules
      }
    },
    rules: {
      'vibe-check/max-file-lines': 'error',
      'vibe-check/no-placeholder-comments': 'error',
      'vibe-check/no-hardcoded-credentials': 'error',
      'vibe-check/no-changelog-comments': 'error',
      'vibe-check/no-backward-compatibility-comments': 'error',
      'vibe-check/never-assume': 'error',
    }
  },
  // TypeScript files (strict mode)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'vibe-check': {
        rules
      }
    },
    rules: {
      'vibe-check/max-file-lines': 'error',
      'vibe-check/no-placeholder-comments': 'error',
      'vibe-check/no-hardcoded-credentials': 'error',
      'vibe-check/no-changelog-comments': 'error',
      'vibe-check/no-backward-compatibility-comments': 'error',
      'vibe-check/never-assume': 'error',
    }
  }
];