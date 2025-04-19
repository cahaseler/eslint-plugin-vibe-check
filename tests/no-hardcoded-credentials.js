"use strict";

const rule = require("../lib/rules/no-hardcoded-credentials");
const { RuleTester } = require("eslint");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020
  }
});

ruleTester.run("no-hardcoded-credentials", rule, {
  valid: [
    // Environment variables
    "const apiKey = process.env.API_KEY;",
    "const token = process.env.TOKEN;",
    "const secret = process.env.SECRET;",
    "let password = process.env.PASSWORD;",
    
    // Config variables
    "const apiKey = config.apiKey;",
    "const token = config.token;",
    
    // Template literals with env vars
    "const apiKey = `${process.env.API_KEY}`;",
    "const token = `${env.TOKEN}`;",
    
    // Function calls
    "const apiKey = getApiKey();",
    "const token = fetchToken();",
    "const secret = loadSecret('api-key');",
    
    // Non-sensitive variables
    "const username = 'john_doe';",
    "const email = 'user@example.com';",
    "const color = '#ff0000';",
    "const count = 123456789;",
    "const shortKey = 'abc123';" // Too short to be detected
  ],

  invalid: [
    // Variable names suggesting credentials with hardcoded values
    {
      code: "const apiKey = 'abcdef1234567890abcdef1234567890';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "let secretToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "var accessKey = 'AKIAIOSFODNN7EXAMPLE';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "const authToken = 'ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ12345678';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "const passwordHash = '5f4dcc3b5aa765d61d8327deb882cf99';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    
    // Object properties with sensitive names
    {
      code: "const config = { apiKey: 'AIzaSyC3gEZeY3KqeBYscnrpVIJYHnFU8AYBrZ0' };",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "const secrets = { 'secret-token': 'a1b2c3d4e5f6g7h8i9j0' };",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    
    // Assignment expressions
    {
      code: "user.password = 'supersecret123';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "config['api_key'] = 'abcdef1234567890abcdef1234567890';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    
    // Special API key formats
    {
      code: "const stripe_key = 'sk_test_ABCDEFghijklmnopqrstuv';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "const googleKey = 'AIzaSyC3gEZeY3KqeBYscnrpVIJYHnFU8AYBrZ0';",
      errors: [{ messageId: "hardcodedCredential" }]
    },
    {
      code: "const slackToken = 'xoxb-123456789012-345678901234-AbCdEfGhIjKlMnOpQrStUv';",
      errors: [{ messageId: "hardcodedCredential" }]
    }
  ]
});