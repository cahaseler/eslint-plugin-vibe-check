/**
 * Example initialization script for eslint-plugin-vibe-check
 * 
 * This script shows how to programmatically set up ESLint with the vibe-check plugin
 */

import { ESLint } from 'eslint';
import vibeCheckPlugin from '../lib/index.js';

async function main() {
  // Create an instance of ESLint with the vibe-check plugin
  const eslint = new ESLint({
    overrideConfig: {
      plugins: ['vibe-check'],
      rules: {
        'vibe-check/max-file-lines': ['warn', { max: 300 }],
        'vibe-check/no-placeholder-comments': 'warn',
        'vibe-check/no-hardcoded-credentials': 'warn',
        'vibe-check/no-changelog-comments': 'warn',
      },
      parserOptions: {
        ecmaVersion: 2020
      }
    },
    // Add plugin directly to avoid needing it installed globally
    plugins: {
      'vibe-check': vibeCheckPlugin
    }
  });

  // Lint files
  const filePaths = [
    './examples/placeholder-comments.js', 
    './examples/test-large-file.js',
    './examples/hardcoded-credentials.js',
    './examples/changelog-comments.js'
  ];
  const results = await eslint.lintFiles(filePaths);

  // Format and print the results
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});