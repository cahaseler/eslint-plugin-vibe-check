# ESLint Plugin Vibe-Check

ESLint plugin that provides warnings and guardrails specifically designed for AI coding assistance. It helps maintain high code quality and enforce best practices when using AI tools to generate or modify code.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

- Bootstrap the repository:
  - `npm install` -- takes ~25 seconds to complete. NEVER CANCEL. Set timeout to 60+ seconds.
- Run tests:
  - `npm test` -- takes ~1 second. Uses Mocha test runner with 152 test cases.
- Run linting:
  - `npm run lint -- --max-warnings 50 --ignore-pattern "examples/*" --ignore-pattern "lib/rules/never-assume.js" --ignore-pattern "tmp.js"` -- takes ~1 second. CI expects max 50 warnings.
- Test plugin functionality:
  - `npm run example` -- takes ~1 second. Runs ESLint on example files to demonstrate plugin rules.

## Validation

- ALWAYS manually validate any new rules or changes by testing on example files:
  - `npx eslint examples/hardcoded-credentials.js --no-ignore` - Should detect 10 hardcoded credential warnings
  - `npx eslint examples/placeholder-comments.js --no-ignore` - Should detect 7 mixed warnings (placeholder + hardcoded credentials)  
  - `npx eslint examples/changelog-comments.js --no-ignore` - Should detect changelog comment warnings
- ALWAYS run through at least one complete end-to-end scenario after making changes:
  - Create a test .js file with rule violations
  - Run ESLint against it to verify rules trigger correctly
  - Test both warning and error configurations
  - Example end-to-end test:
    ```javascript
    // test-file.js
    const apiKey = "abcdef1234567890abcdef1234567890";  // hardcoded credential
    // In a real app, we would connect to a database  // placeholder comment
    // Updated error handling logic  // changelog comment
    // Added for backward compatibility  // backward compatibility comment
    // I assume this works correctly  // never-assume error
    ```
    Should produce: 1 error, 5 warnings covering all rule types
- Always run `npm test && npm run lint` before you are done or the CI (.github/workflows/ci.yml) will fail.
- When adding new rules, test with both ESM (.js) and CommonJS (.cjs) formats since the plugin supports dual format.

## Repository Structure

### Core Files
- `/lib/index.js` - Main plugin entry point (ESM format)
- `/lib/index.cjs` - Main plugin entry point (CommonJS format)  
- `/lib/rules/` - Individual ESLint rule implementations (both .js and .cjs versions)
- `/tests/` - Mocha unit tests for all rules
- `/examples/` - Example files that demonstrate rule violations
- `/docs/rules/` - Documentation for each rule

### Configuration
- `eslint.config.js` - Flat config with recommended rule settings
- `eslint.config.strict.js` - Flat config with all rules as errors
- `package.json` - Project configuration (type: "module" for ESM)

### GitHub Integration
- `.github/workflows/ci.yml` - CI pipeline (Node.js 20.x, npm ci, test, lint)
- `.github/workflows/release.yml` - Automated semantic releases
- `autofix/` - Claude Autofix integration for automated issue resolution

## Plugin Rules

The plugin implements 6 rules for AI coding guardrails:

1. **max-file-lines** - Warns when files exceed configurable line limit (default: 300)
2. **no-placeholder-comments** - Detects placeholder comments like "in a real app", "TODO: make secure"
3. **no-hardcoded-credentials** - Finds hardcoded API keys, tokens, passwords, secrets
4. **no-changelog-comments** - Flags changelog-like comments ("added", "updated", "fixed", etc.)
5. **no-backward-compatibility-comments** - Detects backward compatibility comments indicating incomplete migrations
6. **never-assume** - Flags comments containing "assume", "assuming", "assumed" as errors

## Development Guidelines

- Each rule MUST have both .js (ESM) and .cjs (CommonJS) implementations in `/lib/rules/`
- Each rule MUST have comprehensive tests in `/tests/` following the existing pattern
- Each rule MUST have documentation in `/docs/rules/`
- Add example files to `/examples/` to demonstrate rule violations
- Follow ESLint plugin conventions and patterns used by existing rules
- Use RuleTester from ESLint for writing tests with valid/invalid test cases

## Common Tasks

### Adding a New Rule

1. Create rule implementation: `/lib/rules/rule-name.js` and `/lib/rules/rule-name.cjs`
2. Export rule from `/lib/index.js` and `/lib/index.cjs`
3. Add rule to configs in `eslint.config.js` and `eslint.config.strict.js`
4. Create tests: `/tests/rule-name.js`
5. Add documentation: `/docs/rules/rule-name.md`
6. Create example file: `/examples/rule-name.js` (optional)
7. Run validation: `npm test && npm run lint`

### Testing Plugin Integration

```bash
# Test with flat config
npx eslint your-file.js

# Test specific rules
npx eslint your-file.js --rule 'vibe-check/no-hardcoded-credentials: error'

# Test on examples (bypass ignore patterns)
npx eslint examples/ --no-ignore

# Test individual example files
npx eslint examples/hardcoded-credentials.js --no-ignore
npx eslint examples/placeholder-comments.js --no-ignore
npx eslint examples/changelog-comments.js --no-ignore
```

### Package Structure
```
ls -a [repo-root]
.
..
.eslintignore
.git
.github/
.gitignore
.npmignore
.releaserc.json
CHANGELOG.md
CLAUDE.md
PROJECT_PLAN.md
README.md
autofix/
docs/
eslint.config.js
eslint.config.strict.js
examples/
lib/
package-lock.json
package.json
test-strict.js
tests/
tmp.js
```

### package.json Key Scripts
```json
{
  "scripts": {
    "test": "mocha tests/*.js",
    "lint": "eslint .",
    "example": "node examples/init.js",
    "semantic-release": "semantic-release"
  }
}
```

## Release Process

- Uses semantic-release with conventional commits
- Automated via GitHub Actions on main branch
- Version bumps: `fix:` = patch, `feat:` = minor, `feat!:` = major
- Publishes to npm automatically with proper dual format support