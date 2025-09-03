/**
 * @fileoverview ESLint rules to provide warnings and guardrails for AI coding assistance
 * @author eslint-plugin-vibe-check
 */

// Rule definitions
import maxFileLines from './rules/max-file-lines.js';
import noPlaceholderComments from './rules/no-placeholder-comments.js';
import noHardcodedCredentials from './rules/no-hardcoded-credentials.js';
import noChangelogComments from './rules/no-changelog-comments.js';
import noBackwardCompatibilityComments from './rules/no-backward-compatibility-comments.js';
import neverAssume from './rules/never-assume.js';
import noImportExport from './rules/no-import-export.js';

const rules = {
  'max-file-lines': maxFileLines,
  'no-placeholder-comments': noPlaceholderComments,
  'no-hardcoded-credentials': noHardcodedCredentials,
  'no-changelog-comments': noChangelogComments,
  'no-backward-compatibility-comments': noBackwardCompatibilityComments,
  'never-assume': neverAssume,
  'no-import-export': noImportExport,
};

// Recommended config
const recommended = {
  plugins: ['vibe-check'],
  rules: {
    'vibe-check/max-file-lines': 'warn',
    'vibe-check/no-placeholder-comments': 'warn',
    'vibe-check/no-hardcoded-credentials': 'warn',
    'vibe-check/no-changelog-comments': 'warn',
    'vibe-check/no-backward-compatibility-comments': 'warn',
    'vibe-check/never-assume': 'error',
    'vibe-check/no-import-export': 'warn',
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
    'vibe-check/no-backward-compatibility-comments': 'error',
    'vibe-check/never-assume': 'error',
    'vibe-check/no-import-export': 'error',
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
    'vibe-check/no-backward-compatibility-comments': 'warn',
    'vibe-check/never-assume': 'error',
    'vibe-check/no-import-export': 'warn',
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
    'vibe-check/no-backward-compatibility-comments': 'error',
    'vibe-check/never-assume': 'error',
    'vibe-check/no-import-export': 'error',
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