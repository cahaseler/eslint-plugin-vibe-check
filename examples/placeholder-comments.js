"use strict";

// This will trigger the rule
// In a real app, we would connect to a database
const users = ["user1", "user2"];

function processUserData(userId) {
  // This is a valid comment
  const user = users.find(u => u === userId);
  
  // This will trigger the rule
  // TODO: make secure
  if (user) {
    return { authenticated: true };
  }
  
  return { authenticated: false };
}

// This will trigger the rule
// This is just for demo purposes
function paymentHandler(amount) {
  // This will trigger the rule
  // In production, we would integrate with a payment API
  console.log(`Processing payment: $${amount}`);
  return { success: true };
}

// This will not trigger the rule
// Custom implementation for testing environment
function dataStorage() {
  return {
    save: (data) => console.log('Saving:', data),
    load: (id) => ({ id, name: 'Test' })
  };
}

module.exports = {
  processUserData,
  paymentHandler,
  dataStorage
};