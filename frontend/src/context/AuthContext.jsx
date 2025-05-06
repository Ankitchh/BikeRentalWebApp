import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Sample user data - in a real app, this would come from an API
const sampleUser = {
  id: '123',
  fullName: 'John Doe',
  address: '123 Main St, Anytown, USA',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication check on load
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoRideUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - typically would call an API
  const login = () => {
    setUser(sampleUser);
    localStorage.setItem('ecoRideUser', JSON.stringify(sampleUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecoRideUser');
  };

  // Update user information
  const updateUser = (updatedInfo) => {
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser);
    localStorage.setItem('ecoRideUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};