# eslint-plugin-vibe-check

ESLint rules to provide warnings and guardrails for AI coding assistance

## Installation

```bash
npm install eslint-plugin-vibe-check --save-dev
```

## Usage

Add `vibe-check` to the plugins section of your `.eslintrc` configuration file:

```json
{
  "plugins": ["vibe-check"]
}
```

Then configure the rules you want to use:

```json
{
  "rules": {
    "vibe-check/max-file-lines": ["warn", { "max": 300 }]
  }
}
```

Or use the recommended configuration:

```json
{
  "extends": ["plugin:vibe-check/recommended"]
}
```

## Rules

### max-file-lines

Warns when a file exceeds a configurable maximum number of lines (default: 300).

#### Options

* `max`: The maximum number of lines allowed in a file (default: 300)

#### Example

```json
{
  "rules": {
    "vibe-check/max-file-lines": ["warn", { "max": 250 }]
  }
}
```

### no-placeholder-comments

Catches placeholder comments indicating shortcuts or unimplemented features (e.g., "in a real app", "TODO: make secure").

### no-hardcoded-credentials

Detects hardcoded API keys, tokens, passwords, and other sensitive credentials.

### no-changelog-comments

Flags comments containing changelog-like terms such as "added", "updated", "fixed", "changed", etc., that often appear when AI tools explain their changes in comments.