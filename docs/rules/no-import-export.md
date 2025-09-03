# no-import-export

Disallow importing a module only to immediately re-export it.

## Rule Details

This rule flags cases where code imports something from a module and then immediately re-exports it without using it elsewhere in the code. This pattern often occurs when AI assistants refactor code by moving implementations to different files but leave the original location as a simple import/re-export stub instead of updating all references.

Examples of **incorrect** code for this rule:

```js
// Import and immediately re-export
import { someFunction } from './other-file';
export { someFunction };

// Default import and re-export
import someFunction from './other-file';
export default someFunction;

// Import and re-export as different name
import { foo as bar } from './module';
export { bar };

// Mixed case: some used, some just re-exported
import { usedFunction, justReExported } from './module';
usedFunction(); // This is used
export { justReExported }; // This will be flagged

// Export all with redundant import
import { someFunction } from './module';
export * from './module'; // Redundant since someFunction is already imported
```

Examples of **correct** code for this rule:

```js
// Import and use in code
import { someFunction } from './other-file';
console.log(someFunction());

// Import, use AND export (legitimate pattern)
import { someFunction } from './other-file';
const result = someFunction();
export { someFunction };

// Direct re-export (legitimate ES6 re-export syntax)
export { someFunction } from './other-file';
export * from './other-file';

// Barrel exports (common pattern)
export { ComponentA } from './ComponentA';
export { ComponentB } from './ComponentB';
```

## Why This Rule Exists

This rule helps prevent unnecessary import/re-export patterns that can occur when:

1. AI assistants refactor code by moving implementations but leave stubs
2. Code is restructured but references aren't updated properly
3. Developers create temporary workarounds that become permanent

The rule encourages:
- Using direct ES6 re-export syntax when appropriate
- Updating import references at their usage sites
- Removing unnecessary intermediate files

## When Not to Use

This rule might not be suitable if your codebase intentionally uses import/re-export patterns for:
- Legacy compatibility layers
- Gradual migration strategies
- Complex module federation scenarios

## Further Reading

- [ES6 Export and Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Module Re-exports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#re-exporting_aggregating)