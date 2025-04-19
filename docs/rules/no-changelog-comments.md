# no-changelog-comments

This rule identifies and flags comments that contain changelog-like language, such as "added", "changed", "updated", "fixed", etc. These comments often indicate that AI assistance was used to generate or modify code and the AI left explanatory comments about changes made.

Such comments are generally not appropriate for a production codebase, as they:
1. Don't provide valuable information about the code's purpose or functionality
2. Quickly become outdated as code evolves
3. Create noise that can distract from more meaningful documentation

## Rule Details

This rule aims to identify and report comments that contain common changelog terms like "added", "updated", "fixed", etc.

Examples of **incorrect** code for this rule:

```js
// Added error handling for edge cases
function processData(data) {
  // ...
}

/**
 * Updated the validation logic to handle null values
 */
function validateInput(input) {
  // ...
}

// Fixed bug where the counter wasn't being reset
let counter = 0;
```

Examples of **correct** code for this rule:

```js
// This function processes data with comprehensive error handling
function processData(data) {
  // ...
}

/**
 * Validates user input and handles edge cases including null values
 */
function validateInput(input) {
  // ...
}

// Counter is reset in the resetCounter function
let counter = 0;
```

## When Not To Use It

You might want to disable this rule if:

1. You use comments to track changes within your codebase intentionally
2. You have a specific workflow that benefits from including changelog information in comments
3. You're using comments for in-progress development notes that will be removed before committing

## Further Reading

- [Code Documentation Best Practices](https://www.atlassian.com/blog/add-ons/10-tips-clean-code)
- [Clean Code: A Handbook of Agile Software Craftsmanship by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)