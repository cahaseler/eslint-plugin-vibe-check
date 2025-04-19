"use strict";

// These will trigger warnings for hardcoded credentials

// API keys with recognizable patterns
const googleApiKey = "AIzaSyC3gEZeY3KqeBYscnrpVIJYHnFU8AYBrZ0";
const githubToken = "ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ12345678";
const stripeSecret = "sk_test_ABCDEFghijklmnopqrstuv";

// Suspicious variable names with hardcoded values
const apiKey = "9d8f7e6c5b4a3210";
const secretToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0";
const passwordHash = "5f4dcc3b5aa765d61d8327deb882cf99";

// Object with sensitive properties
const config = {
  dbPassword: "p@ssw0rd123",
  authToken: "abcdef1234567890abcdef1234567890",
  firebaseKey: "AIzaSyC3gEZeY3KqeBYscnrpVIJYHnFU8AYBrZ0"
};

// These should NOT trigger warnings

// Using environment variables (good practice)
const safeApiKey = process.env.API_KEY;
const safeToken = process.env.AUTH_TOKEN;

// Using a configuration system
const configManager = {
  get: (key) => `value-for-${key}`
};
const safeSecret = configManager.get("secret");

// Safe variable names with non-sensitive values
const username = "admin";
const url = "https://api.example.com";
const count = 12345;

function authenticate() {
  // This will trigger a warning
  return "Bearer abcdef1234567890abcdef1234567890";
}

module.exports = {
  authenticate,
  config,
  safeApiKey,
  safeSecret,
  url
};