import rule from "../lib/rules/no-placeholder-comments.js";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester();

ruleTester.run("no-placeholder-comments", rule, {
  valid: [
    "// This is a valid comment",
    "// Properly implemented security measures",
    "// Using in-memory storage for testing",
    "/* Multiple line comment with valid content */",
    "/**\n     * JSDoc comment\n     * @param {string} input - The input to process\n     * @returns {string} The processed output\n     */",
    "// Custom implementation for testing environment",
    "// Note: This is a temporary solution until requirements are finalized"
  ],

  invalid: [
    {
      code: "// If this was a real app, we would do something else",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "// In a real app we would connect to a database",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "// todo: make secure",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "/* In production, this would be handled differently */",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "/**\n * This is just a dummy implementation\n * Will be fixed later\n */",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "// placeholder for authentication logic",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "// This is just for demo purposes",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "function test() {\n  // In real code we would validate input\n  return true;\n}",
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    },
    {
      code: "// Custom patterns test",
      options: [{ patterns: ["Custom patterns"] }],
      errors: [
        {
          messageId: "placeholderComment"
        }
      ]
    }
  ]
});