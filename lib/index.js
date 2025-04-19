/**
 * @fileoverview ESLint rules to provide warnings and guardrails for AI coding assistance
 * @author eslint-plugin-vibe-check
 */

// Rule definitions
import maxFileLines from './rules/max-file-lines.js';
import noPlaceholderComments from './rules/no-placeholder-comments.js';
import noHardcodedCredentials from './rules/no-hardcoded-credentials.js';
import noChangelogComments from './rules/no-changelog-comments.js';
import neverAssume from './rules/never-assume.js';

const rules = {
  'max-file-lines': maxFileLines,
  'no-placeholder-comments': noPlaceholderComments,
  'no-hardcoded-credentials': noHardcodedCredentials,
  'no-changelog-comments': noChangelogComments,
  'never-assume': neverAssume,
};

// Recommended config
const recommended = {
  plugins: ['vibe-check'],
  rules: {
    'vibe-check/max-file-lines': 'warn',
    'vibe-check/no-placeholder-comments': 'warn',
    'vibe-check/no-hardcoded-credentials': 'warn',
    'vibe-check/no-changelog-comments': 'warn',
    'vibe-check/never-assume': 'error',
  },
};

// Strict config - all rules are errors
const strict = {
  plugins: ['vibe-check'],
  rules: {
    'vibe-check/max-file-lines': 'error',
    'vibe-check/no-placeholder-comments': 'error',
    'vibe-check/no-hardcoded-credentials': 'error',
    'vibe-check/no-changelog-comments': 'error',
    'vibe-check/never-assume': 'error',
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
    'vibe-check/never-assume': 'error',
  }
};

// Strict flat config - all rules are errors
const strictFlat = {
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
    'vibe-check/never-assume': 'error',
  }
};

export default {
  rules,
  configs: {
    recommended,
    strict,
    flat,
    'strict-flat': strictFlat
  },
};