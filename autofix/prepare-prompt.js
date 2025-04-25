#!/usr/bin/env node

/**
 * Prepare Issue Prompt for Claude Code
 * 
 * This utility script prepares a prompt for Claude Code based on issue details.
 * It's used by the claude_autofix.yml workflow to format issue content.
 */

/**
 * Format issue details into a prompt for Claude
 * @param {string} issueTitle - The title of the GitHub issue
 * @param {string} issueBody - The body content of the GitHub issue
 * @param {number} issueNumber - The issue number
 * @returns {string} Formatted prompt for Claude
 */
function formatPrompt(issueTitle, issueBody, issueNumber) {
  return `
# Task: Fix Issue #${issueNumber} - ${issueTitle}

## Issue Description
${issueBody}

## Instructions
1. Analyze the codebase to understand the issue
2. Make the necessary changes to fix the problem
3. Ensure all tests still pass
4. Prepare a concise PR description explaining your changes

## Constraints
- Only change what's needed to fix the specific issue
- Follow the existing code style and patterns
- Ensure all tests pass after your changes

Please provide a complete and well-tested solution for this issue.
`;
}

// This script can be run from command line if needed
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length >= 3) {
    const issueNumber = args[0];
    const issueTitle = args[1];
    const issueBody = args[2];
    
    console.log(formatPrompt(issueTitle, issueBody, issueNumber));
  } else {
    console.error('Usage: prepare-prompt.js <issue-number> <issue-title> <issue-body>');
    process.exit(1);
  }
}

module.exports = { formatPrompt };