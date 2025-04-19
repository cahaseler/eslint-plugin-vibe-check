# no-hardcoded-credentials

This rule detects hardcoded credentials, API keys, and other sensitive information in your code.

## Rule Details

Hardcoding credentials, API keys, or other sensitive information directly in source code is a security risk. This rule identifies potential security issues by detecting variables and values that appear to contain sensitive information.

The rule checks for:
1. Variable names that suggest credentials (e.g., `apiKey`, `secretToken`)
2. String values that match common credential patterns (e.g., long hexadecimal strings, base64 encoded strings)

Examples of **incorrect** code for this rule:

```js
// Variable names suggesting credentials
const apiKey = "1234567890abcdef";
let secretToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
var password = "p@ssw0rd123";

// Object properties with sensitive names
const config = {
  firebaseApiKey: "AIzaSyC3gEZeY3KqeBYscnrpVIJYHnFU8AYBrZ0",
  stripeSecretKey: "sk_test_ABCDEFghijklmnopqrstuv",
  auth_token: "ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ12345678"
};

// API keys with recognizable patterns
const githubKey = "ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ12345678";
const googleApiKey = "AIzaSyC3gEZeY3KqeBYscnrpVIJYHnFU8AYBrZ0";
const awsAccessKey = "AKIAIOSFODNN7EXAMPLE";
```

Examples of **correct** code for this rule:

```js
// Using environment variables
const apiKey = process.env.API_KEY;
const secretToken = process.env.SECRET_TOKEN;

// Using configuration management
import config from './config';
const apiKey = config.apiKey;

// Using template variables
const apiKey = `${process.env.API_KEY}`;

// Using secure storage/retrieval methods
const secretManager = require('./secret-manager');
const apiKey = await secretManager.getSecret('api-key');
```

## Options

This rule has an object option:

* `"additionalPatterns"`: an array of additional regex patterns to check for sensitive variable names
* `"excludePatterns"`: an array of regex patterns to exclude from being flagged

### additionalPatterns

Example of custom configurations:

```json
{
  "rules": {
    "vibe-check/no-hardcoded-credentials": ["error", {
      "additionalPatterns": [
        "my_company_secret",
        "internal_key"
      ]
    }]
  }
}
```

### excludePatterns

Example of excluding certain patterns:

```json
{
  "rules": {
    "vibe-check/no-hardcoded-credentials": ["error", {
      "excludePatterns": [
        "demo_key",
        "sample_token"
      ]
    }]
  }
}
```

## When Not To Use It

You might consider turning this rule off in very early development stages or in projects where no sensitive information is used. However, it's generally good practice to keep this rule enabled, as hardcoded credentials can easily find their way into source code repositories.

## Further Reading

* [OWASP - Hardcoded Credentials](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_credentials)
* [CWE-798: Use of Hard-coded Credentials](https://cwe.mitre.org/data/definitions/798.html)
* [NIST - Guide to General Server Security](https://csrc.nist.gov/publications/detail/sp/800-123/final)