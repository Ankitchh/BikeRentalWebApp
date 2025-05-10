import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Sample user data - in a real app, this would come from an API
const sampleUser = {
  id: "2341",
  fullName: "Ankit Chhetri",
  address: "Siliguri, Bagdogra",
  email: "ankit@example.com",
  phone: "+91 90374 83940",
  profileImage:
    "https://plus.unsplash.com/premium_vector-1697729872034-3012908a1765?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication check on load
  useEffect(() => {
    const storedUser = localStorage.getItem("ecoRideUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - typically would call an API
  const login = (data) => {
    setUser(data);
    localStorage.setItem("ecoRideUser", JSON.stringify(data));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecoRideUser");
  };

  // Update user information
  const updateUser = (updatedInfo) => {
    const updatedUser = { ...user, ...updatedInfo };
    setUser(updatedUser);
    localStorage.setItem("ecoRideUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
