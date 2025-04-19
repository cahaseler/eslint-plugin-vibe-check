/**
 * This file demonstrates examples of comments that would be flagged by the
 * never-assume rule.
 */

// Example 1: Assumption about function behavior
// I assume this function always returns a string
function processData(data) {
  if (!data) {
    return '';
  }
  
  return data.toString();
}

// Example 2: Assuming input validation
/**
 * Assuming the input is always valid, this function will work correctly.
 */
function validateInput(input) {
  return input.length > 0;
}

// Example 3: Assumed authentication state
// We can assume the user is authenticated at this point
function getUserProfile(userId) {
  return fetchUserData(userId);
}

// Example 4: Assumptions about API responses
/* This assumes the API will always return JSON */
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// Example 5: Assumptions in object parameters
// Assumed to be a valid configuration object
function initialize(config) {
  const apiKey = config.apiKey;
  const endpoint = config.endpoint;
  
  connect(apiKey, endpoint);
}

// Example 6: Assumptions about user behavior
// The assumption is that users won't enter negative values
function calculateTotal(price, quantity) {
  return price * quantity;
}

module.exports = {
  processData,
  validateInput,
  getUserProfile,
  fetchData,
  initialize,
  calculateTotal
};