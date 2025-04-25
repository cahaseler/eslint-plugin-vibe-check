# eslint-plugin-vibe-check

ESLint rules to provide warnings and guardrails for AI coding assistance

## Installation

```bash
npm install eslint-plugin-vibe-check --save-dev
```

### Requirements

- Node.js >=20.8.1
- ESLint >=8.0.0

### Compatibility

This plugin supports both:
- **ESLint Flat Config** (modern format using `eslint.config.js`)
- **Legacy ESLint Config** (traditional format using `.eslintrc.*` files)

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

Or use one of the provided configurations:

```json
{
  "extends": ["plugin:vibe-check/recommended"]
}
```

For stricter enforcement (all rules as errors):

```json
{
  "extends": ["plugin:vibe-check/strict"]
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

For stricter enforcement (all rules as errors):

```js
import vibeCheckStrict from 'eslint-plugin-vibe-check/eslint.config.strict.js';

export default [
  // Your other configs...
  vibeCheckStrict
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
      'vibe-check/no-changelog-comments': 'warn',
      'vibe-check/never-assume': 'error'
    }
  }
];
```

Or use one of the predefined configurations:

```js
import vibeCheckPlugin from 'eslint-plugin-vibe-check';

export default [
  {
    plugins: {
      'vibe-check': vibeCheckPlugin
    },
    extends: ['plugin:vibe-check/recommended'] // or 'plugin:vibe-check/strict'
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

Flags comments containing changelog-like terms such as "added", "updated", "fixed", "changed", etc., that often appear when AI tools explain their changes in comments. This rule is fixable - the VSCode quick fix feature (lightbulb) or ESLint's `--fix` option will automatically remove these comments.

### never-assume

Detects comments containing forms of the word "assume" (such as "assume", "assuming", "assumed", etc.) and flags them as errors. Making assumptions about a codebase can lead to errors and bugs. Instead of making assumptions, developers should check and validate their understanding before making decisions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests to ensure they pass: `npm test`
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Release Process

This project uses semantic-release for automated versioning and releases:

1. When changes are merged to the `main` branch, semantic-release analyzes commit messages
2. Version numbers are automatically determined based on semantic commit messages
   - `fix:` - Patch release (1.0.0 -> 1.0.1)
   - `feat:` - Minor release (1.0.0 -> 1.1.0)
   - `feat!:`, `fix!:`, `refactor!:`, etc. - Major release (1.0.0 -> 2.0.0)
3. CHANGELOG.md is automatically updated with release notes
4. A GitHub release is created with the same notes
5. The package is published to npm automatically

To contribute changes that will be released:

1. Make your changes following the [Conventional Commits](https://www.conventionalcommits.org/) specification
2. Create a PR and merge it to the `main` branch
3. The GitHub Actions workflow will handle releasing and publishing automatically