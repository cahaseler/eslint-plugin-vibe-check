#!/bin/bash

# Local test script for Claude Autofix
# Usage: ./test-autofix.sh "Issue title" "Issue body"

# Check if we have required arguments
if [ $# -lt 2 ]; then
  echo "Usage: $0 \"Issue title\" \"Issue body\""
  exit 1
fi

ISSUE_TITLE="$1"
ISSUE_BODY="$2"
ISSUE_NUMBER="local-test-$(date +%s)"
BRANCH_NAME="fix/claude-autofix-test-$ISSUE_NUMBER"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Testing Claude Autofix with:${NC}"
echo -e "${YELLOW}Issue Title:${NC} $ISSUE_TITLE"
echo -e "${YELLOW}Issue Body:${NC} $ISSUE_BODY"
echo ""

# Create a new branch for testing
echo -e "${YELLOW}Creating test branch: $BRANCH_NAME${NC}"
git checkout -b $BRANCH_NAME

# Create prompt file
echo -e "${YELLOW}Creating prompt file for Claude...${NC}"
node ./autofix/prepare-prompt.js "$ISSUE_NUMBER" "$ISSUE_TITLE" "$ISSUE_BODY" > claude_prompt.txt

# Check if CLAUDE_API_KEY is set
if [ -z "$CLAUDE_API_KEY" ]; then
  echo -e "${RED}ERROR: CLAUDE_API_KEY environment variable is not set${NC}"
  echo "Please set it with: export CLAUDE_API_KEY=your-api-key"
  exit 1
fi

# Simulate running Claude Code
echo -e "${YELLOW}Running Claude Code in headless mode (simulated)...${NC}"
echo "This would normally call the Claude Code API."
echo "For testing purposes, just checking if claude_prompt.txt was created properly."
cat claude_prompt.txt

echo ""
echo -e "${GREEN}Test completed.${NC}"
echo "In the real workflow, Claude would now:"
echo "1. Make code changes to fix the issue"
echo "2. Run tests to validate the changes"
echo "3. Create a pull request with the solution"

# Clean up
echo -e "${YELLOW}Cleaning up test branch...${NC}"
git checkout -
git branch -D $BRANCH_NAME
rm claude_prompt.txt

echo -e "${GREEN}Test cleanup complete.${NC}"