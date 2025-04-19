# eslint-plugin-vibe-check

ESLint rules to provide warnings and guardrails for AI coding assistance

## Installation

```bash
npm install eslint-plugin-vibe-check --save-dev
```

## Usage

### Traditional Config (`.eslintrc`)

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

### Flat Config (`eslint.config.js`)

For ESLint's new flat config format:

```js
import vibeCheck from 'eslint-plugin-vibe-check/eslint.config.js';

export default [
  // Your other configs...
  vibeCheck,
  
  // Or configure individually:
  {
    plugins: {
      'vibe-check': vibeCheck.plugins['vibe-check']
    },
    rules: {
      'vibe-check/max-file-lines': ['warn', { max: 300 }]
    }
  }
];
```

Or you can use the flat configuration directly:

```js
import vibeCheckPlugin from 'eslint-plugin-vibe-check';

export default [
  {
    plugins: {
      'vibe-check': vibeCheckPlugin
    },
    rules: {
      'vibe-check/max-file-lines': 'warn',
      'vibe-check/no-placeholder-comments': 'warn',
      'vibe-check/no-hardcoded-credentials': 'warn',
      'vibe-check/no-changelog-comments': 'warn'
    }
  }
];
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