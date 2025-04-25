# Claude Autofix

This directory contains documentation for the automatic issue-fixing workflow powered by Claude Code.

## How It Works

The Claude Autofix feature automatically attempts to fix issues labeled with `claude-fix`. Here's how it works:

1. When an issue is labeled with `claude-fix`, a GitHub Action is triggered
2. Claude Code analyzes the issue and repository
3. Claude makes the necessary code changes and runs tests
4. If the changes pass tests, a pull request is automatically created
5. The issue receives a comment linking to the new PR

## Usage

To use the autofix feature:

1. Create a new issue describing the bug or enhancement in detail
2. Add the `claude-fix` label to the issue
3. Wait for the workflow to complete (usually takes a few minutes)
4. Review the automatically created PR

## Tips for Good Results

To get the best results from Claude Autofix:

1. **Be specific**: Clearly describe the issue and expected behavior
2. **Provide context**: Include relevant file names or code snippets
3. **Keep it focused**: Each issue should address a single, well-defined problem
4. **Include reproduction steps**: If it's a bug, explain how to reproduce it

## Limitations

The autofix feature works best for:

- Small bug fixes
- Simple refactoring
- Adding documentation
- Minor enhancements

It may not be suitable for:

- Complex architectural changes
- Major new features
- Issues requiring deep domain knowledge

## Workflow Configuration

The workflow is defined in `.github/workflows/claude_autofix.yml`.