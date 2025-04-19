/**
 * This file demonstrates examples of changelog comments that would be flagged by the
 * no-changelog-comments rule.
 */

// Example 1: Added changelog comment
// Added error handling for edge cases
function processData(data) {
  if (!data) {
    throw new Error('Data is required');
  }
  
  return data.map(item => item.value);
}

// Example 2: Updated changelog comment 
/**
 * Updated this function to handle null values properly
 */
function validateInput(input) {
  if (input === null || input === undefined) {
    return false;
  }
  
  return typeof input === 'string' && input.length > 0;
}

// Example 3: Fixed changelog comment
// Fixed bug where the counter wasn't being reset
let counter = 0;

function incrementCounter() {
  counter += 1;
}

function resetCounter() {
  counter = 0;
}

// Example 4: Ensured changelog comment
// Ensured consistent error handling throughout the module
class ErrorHandler {
  static handle(error) {
    console.error('Error:', error.message);
  }
}

// Example 5: Removed changelog comment
// Removed deprecated methods and simplified the API
const api = {
  fetchData() {
    return fetch('/api/data').then(res => res.json());
  }
};

// Example 6: Improved changelog comment
// Improved performance by using a more efficient algorithm
function sortItems(items) {
  return [...items].sort((a, b) => a.id - b.id);
}

module.exports = {
  processData,
  validateInput,
  incrementCounter,
  resetCounter,
  ErrorHandler,
  api,
  sortItems
};