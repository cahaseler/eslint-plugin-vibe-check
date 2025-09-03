import rule from "../lib/rules/no-import-export.js";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015, sourceType: "module" }
});

ruleTester.run("no-import-export", rule, {
  valid: [
    // Regular imports without re-exports
    "import { foo } from './module'; console.log(foo);",
    "import foo from './module'; console.log(foo);",
    "import * as foo from './module'; console.log(foo);",
    
    // Regular exports without imports
    "const foo = 'bar'; export const bar = 'baz';",
    "function myFunc() {} export default myFunc;",
    "const foo = 'bar'; const bar = 'baz'; export { foo, bar };",
    
    // Imports and exports of different things
    "import { foo } from './module1'; const bar = 'bar'; export { bar };",
    "import foo from './module1'; const bar = 'bar'; export default bar;",
    
    // Direct re-exports (this is actually a legitimate pattern)
    "export { foo } from './module';",
    "export * from './module';",
    
    // Import used in code and also exported (legitimate)
    `import { foo } from './module';
     console.log(foo);
     export { foo };`,
    
    // Import with different local name, export with original name - used in code
    `import { foo as localFoo } from './module';
     console.log(localFoo);
     export { localFoo as foo };`,
     
    // Namespace import used properly
    `import * as utils from './utils';
     export const helper = utils.someFunction();`,
     
    // Multiple imports from same module, all used
    `import { foo, bar, baz } from './module';
     console.log(foo, bar, baz);`
  ],

  invalid: [
    // Basic named import/export
    {
      code: "import { foo } from './module'; export { foo };",
      errors: [
        {
          messageId: "importExport",
          data: { name: "foo", source: "./module" }
        }
      ]
    },
    
    // Default import/export
    {
      code: "import foo from './module'; export default foo;",
      errors: [
        {
          messageId: "importExport",
          data: { name: "foo", source: "./module" }
        }
      ]
    },
    
    // Multiple named imports, all re-exported
    {
      code: "import { foo, bar } from './module'; export { foo, bar };",
      errors: [
        {
          messageId: "importExport",
          data: { name: "foo", source: "./module" }
        },
        {
          messageId: "importExport",
          data: { name: "bar", source: "./module" }
        }
      ]
    },
    
    // Import with alias, export with original name
    {
      code: "import { foo as bar } from './module'; export { bar };",
      errors: [
        {
          messageId: "importExport",
          data: { name: "bar", source: "./module" }
        }
      ]
    },
    
    // Import default, export as named
    {
      code: "import foo from './module'; export { foo };",
      errors: [
        {
          messageId: "importExport",
          data: { name: "foo", source: "./module" }
        }
      ]
    },
    
    // Named import, export as default
    {
      code: "import { foo } from './module'; export default foo;",
      errors: [
        {
          messageId: "importExport",
          data: { name: "foo", source: "./module" }
        }
      ]
    },
    
    // Export all with redundant import
    {
      code: "import { foo } from './module'; export * from './module';",
      errors: [
        {
          messageId: "importExport",
          data: { name: "*", source: "./module" }
        }
      ]
    },
    
    // Multiple files, same pattern
    {
      code: `import { config } from './config';
             import { helper } from './helper';
             export { config };
             export { helper };`,
      errors: [
        {
          messageId: "importExport",
          data: { name: "config", source: "./config" }
        },
        {
          messageId: "importExport",
          data: { name: "helper", source: "./helper" }
        }
      ]
    },
    
    // Mixed legitimate use and re-export - only bar should be flagged
    {
      code: `import { foo, bar } from './module';
             console.log(foo); // legitimate use
             export { bar }; // just re-export`,
      errors: [
        {
          messageId: "importExport",
          data: { name: "bar", source: "./module" }
        }
      ]
    },

    // Multiple imports from same module, only some re-exported - baz should be flagged
    {
      code: `import { foo, bar, baz } from './module';
             console.log(foo, bar);
             export { baz };`,
      errors: [
        {
          messageId: "importExport",
          data: { name: "baz", source: "./module" }
        }
      ]
    },
    
    // Namespace import re-exported
    {
      code: "import * as utils from './utils'; export { utils };",
      errors: [
        {
          messageId: "importExport",
          data: { name: "utils", source: "./utils" }
        }
      ]
    }
  ]
});