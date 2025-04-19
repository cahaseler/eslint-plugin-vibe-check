import React, { useState, useEffect } from 'react';

// TypeScript React component with changelog comments

// Added type for component props
interface UserProfileProps {
  userId: number;
  showEmail?: boolean;
}

// Renamed component for better clarity
const UserProfile: React.FC<UserProfileProps> = ({ userId, showEmail = false }) => {
  // Added state for user data
  const [userData, setUserData] = useState<{name: string; email: string} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Changed to use async function
    const fetchUser = async () => {
      setLoading(true);
      try {
        // Removed direct fetch call
        // Replaced with mocked data
        setTimeout(() => {
          setUserData({
            name: 'John Doe',
            email: 'john@example.com'
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  // Added loading state handling
  if (loading) {
    return (
      <div>
        {/* Improved loading indicator */}
        <p>Loading user data...</p>
      </div>
    );
  }
  
  return (
    <div className="user-profile">
      {/* Fixed styling issues */}
      <h2>User Profile</h2>
      
      {userData ? (
        <>
          <p>Name: {userData.name}</p>
          {showEmail && <p>Email: {userData.email}</p>}
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserProfile;