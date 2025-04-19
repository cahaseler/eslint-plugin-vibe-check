/**
 * @fileoverview ESLint rules to provide warnings and guardrails for AI coding assistance
 * @author eslint-plugin-vibe-check
 */

'use strict';

module.exports = {
  rules: {
    'max-file-lines': require('./rules/max-file-lines'),
    'no-placeholder-comments': require('./rules/no-placeholder-comments'),
    'no-hardcoded-credentials': require('./rules/no-hardcoded-credentials'),
    'no-changelog-comments': require('./rules/no-changelog-comments'),
  },
  configs: {
    recommended: {
      plugins: ['vibe-check'],
      rules: {
        'vibe-check/max-file-lines': 'warn',
        'vibe-check/no-placeholder-comments': 'warn',
        'vibe-check/no-hardcoded-credentials': 'warn',
        'vibe-check/no-changelog-comments': 'warn',
      },
    },
  },
};