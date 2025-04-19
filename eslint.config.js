/**
 * @fileoverview ESLint flat config for vibe-check
 */

'use strict';

const rules = {
  'max-file-lines': require('./lib/rules/max-file-lines'),
  'no-placeholder-comments': require('./lib/rules/no-placeholder-comments'),
  'no-hardcoded-credentials': require('./lib/rules/no-hardcoded-credentials'),
  'no-changelog-comments': require('./lib/rules/no-changelog-comments'),
};

/** @type {import('eslint').FlatConfig[]} */
module.exports = [
  {
    files: ['**/*.js'],
    plugins: {
      'vibe-check': {
        rules
      }
    },
    rules: {
      'vibe-check/max-file-lines': 'warn',
      'vibe-check/no-placeholder-comments': 'warn',
      'vibe-check/no-hardcoded-credentials': 'warn',
      'vibe-check/no-changelog-comments': 'warn',
    }
  }
];