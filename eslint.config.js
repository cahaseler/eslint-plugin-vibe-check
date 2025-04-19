/**
 * @fileoverview ESLint flat config for vibe-check
 */

import maxFileLines from './lib/rules/max-file-lines.js';
import noPlaceholderComments from './lib/rules/no-placeholder-comments.js';
import noHardcodedCredentials from './lib/rules/no-hardcoded-credentials.js';
import noChangelogComments from './lib/rules/no-changelog-comments.js';

const rules = {
  'max-file-lines': maxFileLines,
  'no-placeholder-comments': noPlaceholderComments,
  'no-hardcoded-credentials': noHardcodedCredentials,
  'no-changelog-comments': noChangelogComments,
};

/** @type {import('eslint').FlatConfig[]} */
export default [
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