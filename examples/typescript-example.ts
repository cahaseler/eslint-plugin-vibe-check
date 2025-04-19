// TypeScript example with changelog comments

// Added type definitions for better type safety
interface User {
  id: number;
  name: string;
  email: string;
}

// Improved function to handle null values
function getUser(id: number): User | null {
  // Removed direct database access for security
  if (id <= 0) {
    return null;
  }
  
  // Added mock data for testing
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com'
  };
}

// Updated to use async/await instead of promises
async function fetchUserData(id: number): Promise<User | null> {
  try {
    // Changed to use the getUser function
    const user = getUser(id);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export { User, getUser, fetchUserData };