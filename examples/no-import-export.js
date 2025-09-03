// Example demonstrating the no-import-export rule
console.log("Testing no-import-export rule");

// This will be flagged by the rule
import { someFunction } from './other-file';
export { someFunction };

// This will also be flagged
import defaultFunc from './another-file';
export default defaultFunc;

// This is legitimate and won't be flagged
import { usedFunction, reExported } from './module';
console.log(usedFunction()); // Used in code
export { usedFunction, reExported }; // reExported will be flagged, usedFunction won't