/**
 * @fileoverview ESLint rules to provide warnings and guardrails for AI coding assistance
 * @author eslint-plugin-vibe-check
 */

'use strict';

// Export for CommonJS/Legacy ESLint
// Note: This is a CommonJS wrapper around the ESM module to ensure compatibility
// with legacy ESLint configurations (.eslintrc)

// Rule definitions - require instead of import
const maxFileLines = require('./rules/max-file-lines.cjs');
const noPlaceholderComments = require('./rules/no-placeholder-comments.cjs');
const noHardcodedCredentials = require('./rules/no-hardcoded-credentials.cjs');
const noChangelogComments = require('./rules/no-changelog-comments.cjs');
const noBackwardCompatibilityComments = require('./rules/no-backward-compatibility-comments.cjs');
const neverAssume = require('./rules/never-assume.cjs');

// Legacy ESLint format has rules directly on exports
module.exports = {
  rules: {
    'max-file-lines': maxFileLines,
    'no-placeholder-comments': noPlaceholderComments,
    'no-hardcoded-credentials': noHardcodedCredentials,
    'no-changelog-comments': noChangelogComments,
    'no-backward-compatibility-comments': noBackwardCompatibilityComments,
    'never-assume': neverAssume,
  },
  // Legacy configs
  configs: {
    recommended: {
      plugins: ['vibe-check'],
      rules: {
        'vibe-check/max-file-lines': 'warn',
        'vibe-check/no-placeholder-comments': 'warn',
        'vibe-check/no-hardcoded-credentials': 'warn',
        'vibe-check/no-changelog-comments': 'warn',
        'vibe-check/no-backward-compatibility-comments': 'warn',
        'vibe-check/never-assume': 'error',
      },
    },
    strict: {
      plugins: ['vibe-check'],
      rules: {
        'vibe-check/max-file-lines': 'error',
        'vibe-check/no-placeholder-comments': 'error',
        'vibe-check/no-hardcoded-credentials': 'error',
        'vibe-check/no-changelog-comments': 'error',
        'vibe-check/no-backward-compatibility-comments': 'error',
        'vibe-check/never-assume': 'error',
      },
    },
  },
};