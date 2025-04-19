/**
 * This file demonstrates examples of changelog comments that would be flagged by the
 * no-changelog-comments rule.
 */



function processData(data) {
  if (!data) {
    throw new Error('Data is required');
  }
  
  return data.map(item => item.value);
}



function validateInput(input) {
  if (input === null || input === undefined) {
    return false;
  }
  
  return typeof input === 'string' && input.length > 0;
}



let counter = 0;

function incrementCounter() {
  counter += 1;
}

function resetCounter() {
  counter = 0;
}



class ErrorHandler {
  static handle(error) {
    console.error('Error:', error.message);
  }
}



const api = {
  fetchData() {
    return fetch('/api/data').then(res => res.json());
  }
};



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