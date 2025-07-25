# no-backward-compatibility-comments

This rule identifies and flags comments that contain backward compatibility language, such as "for backward compatibility", "legacy support", "legacy code", etc. These comments often indicate that AI assistance was used to generate or modify code and the AI left explanatory comments about maintaining compatibility with older systems, which suggests incomplete migration or unnecessary legacy code.

Such comments are generally problematic because they:
1. Suggest that code migration was incomplete or half-finished
2. May indicate unnecessary legacy code that should be removed
3. Point to areas where the codebase may be carrying technical debt
4. Create noise that distracts from more meaningful documentation

## Rule Details

This rule aims to identify and report comments that contain common backward compatibility terms like "backward compatibility", "legacy support", "legacy code", etc.

The rule provides warnings to help developers identify areas where legacy code or incomplete migrations may exist, allowing them to make informed decisions about whether to complete the migration or remove unnecessary legacy code.

Examples of **incorrect** code for this rule:

```js
// Added for backward compatibility
function processDataOld(data) {
  // ...
}

/**
 * Legacy support for IE11 - keep this method
 */
function legacySupport() {
  // ...
}

// Keep for compatibility with v1.0 API
const oldApiEndpoint = '/api/v1/data';

// Support older browsers that don't have fetch
if (!window.fetch) {
  // ...
}

// For backwards compatibility with React 16
class ComponentOld extends React.Component {
  // ...
}

// Migration compatibility layer
function migrateData(oldFormat) {
  // ...
}
```

Examples of **correct** code for this rule:

```js
// This function processes data efficiently
function processData(data) {
  // ...
}

/**
 * Handles cross-browser compatibility for modern features
 */
function ensureCompatibility() {
  // ...
}

// Current API endpoint for data retrieval
const apiEndpoint = '/api/v2/data';

// Polyfill for browsers without fetch support
if (!window.fetch) {
  // ...
}

// Modern React functional component with hooks
function Component() {
  // ...
}

// Transforms data to the new format
function transformData(data) {
  // ...
}
```

## When Not To Use It

You might want to disable this rule if:

1. You are actively working on a migration and need to temporarily maintain backward compatibility
2. Your codebase intentionally supports multiple versions of dependencies or APIs
3. You have legitimate documentation needs around compatibility concerns
4. You're working in a library that needs to support multiple versions

However, in most cases, it's better to either:
- Complete the migration and remove the old code
- Use feature detection instead of version-specific compatibility layers
- Document compatibility in external documentation rather than code comments

## Further Reading

- [Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring: Improving the Design of Existing Code by Martin Fowler](https://martinfowler.com/books/refactoring.html)
- [Managing Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html)