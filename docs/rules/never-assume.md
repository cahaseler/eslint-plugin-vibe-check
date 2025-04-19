# never-assume

This rule identifies and flags comments that contain forms of the word "assume" (such as "assume", "assuming", "assumed", etc.). Making assumptions about a codebase can lead to errors and bugs.

Instead of making assumptions, developers should always check and validate their understanding before making decisions or implementing solutions.

## Rule Details

This rule aims to identify and report comments that contain words related to making assumptions.

Examples of **incorrect** code for this rule:

```js
// I assume this function always returns a string
function processData(data) {
  // ...
}

/**
 * Assuming the input is always valid, this function will work.
 */
function validateInput(input) {
  // ...
}

// We can assume the user is authenticated at this point
function getUserData() {
  // ...
}
```

Examples of **correct** code for this rule:

```js
// This function returns a string when given valid input
function processData(data) {
  // ...
}

/**
 * Check if input is valid before proceeding
 */
function validateInput(input) {
  // Validate input first
  if (!isValid(input)) {
    throw new Error('Invalid input');
  }
  // ...
}

// Check authentication status before proceeding
function getUserData() {
  if (!isAuthenticated()) {
    throw new Error('User not authenticated');
  }
  // ...
}
```

## When Not To Use It

You might want to disable this rule if:

1. You have a specific reason to intentionally document assumptions
2. You're describing known assumptions in a system design document or comments
3. You're referring to assumptions in a context unrelated to the code's behavior

## Further Reading

- [Defensive Programming](https://en.wikipedia.org/wiki/Defensive_programming)
- [Design by Contract](https://en.wikipedia.org/wiki/Design_by_contract)