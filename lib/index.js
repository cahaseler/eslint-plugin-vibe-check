/**
 * @fileoverview ESLint rules to provide warnings and guardrails for AI coding assistance
 * @author eslint-plugin-vibe-check
 */

// Rule definitions
import maxFileLines from './rules/max-file-lines.js';
import noPlaceholderComments from './rules/no-placeholder-comments.js';
import noHardcodedCredentials from './rules/no-hardcoded-credentials.js';
import noChangelogComments from './rules/no-changelog-comments.js';

const rules = {
  'max-file-lines': maxFileLines,
  'no-placeholder-comments': noPlaceholderComments,
  'no-hardcoded-credentials': noHardcodedCredentials,
  'no-changelog-comments': noChangelogComments,
};

// Recommended config
const recommended = {
  plugins: ['vibe-check'],
  rules: {
    'vibe-check/max-file-lines': 'warn',
    'vibe-check/no-placeholder-comments': 'warn',
    'vibe-check/no-hardcoded-credentials': 'warn',
    'vibe-check/no-changelog-comments': 'warn',
  },
};

// Flat config
const flat = {
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
};

export default {
  rules,
  configs: {
    recommended,
    flat
  },
};