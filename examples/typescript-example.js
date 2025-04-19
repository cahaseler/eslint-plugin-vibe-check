// TypeScript-like example with changelog comments


// interface User {
//   id: number;
//   name: string;
//   email: string;
// }


function getUser(id) {
  
  if (id <= 0) {
    return null;
  }
  
  
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com'
  };
}


async function fetchUserData(id) {
  try {
    
    const user = getUser(id);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export { getUser, fetchUserData };