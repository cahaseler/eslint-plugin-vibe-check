# no-placeholder-comments

This rule catches placeholder comments that often indicate code shortcuts or unfinished implementations, which are common in AI-generated code.

## Rule Details

This rule aims to identify comments that suggest the code is incomplete, simplified, or missing important components like security or error handling.

Examples of **incorrect** code for this rule:

```js
// If this was a real app, we would validate the input
function processUserInput(input) {
  return input.toUpperCase();
}

// In a real app, we would connect to a database
const users = ["user1", "user2"];

// TODO: make secure
function authenticate(username, password) {
  return true;
}

// This is just a dummy implementation
function paymentProcessor() {
  // In production, we would integrate with a payment gateway
  return { success: true };
}
```

Examples of **correct** code for this rule:

```js
// Validate input by checking for non-empty string
function processUserInput(input) {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error('Invalid input');
  }
  return input.toUpperCase();
}

// Using in-memory array for testing purposes
const users = ["user1", "user2"];

// Authenticate against local credentials
function authenticate(username, password) {
  // Implement proper authentication logic
  return username === 'admin' && password === 'secure123';
}

// Test implementation for development environment
function paymentProcessor() {
  // Logging payment attempt for tracking
  console.log('Processing payment');
  return { success: true };
}
```

## Options

This rule has an object option:

* `"patterns"`: an array of string patterns to look for in comments (default: predefined list of common placeholder phrases)

### patterns

Example of custom patterns configuration:

```json
{
  "rules": {
    "vibe-check/no-placeholder-comments": ["error", {
      "patterns": [
        "shortcut",
        "simplified version",
        "not production ready",
        "TODO security"
      ]
    }]
  }
}
```

## When Not To Use It

You might consider turning this rule off in very early development stages or prototype applications where placeholder comments are intentionally used to mark areas for future development.

## Further Reading

* [Common Pitfalls in AI-Generated Code](https://example.com)
* [Best Practices for Secure Code Implementation](https://example.com)