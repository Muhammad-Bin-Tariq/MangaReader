import React, { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Retrieve user data from localStorage on app initialization
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  // When the user changes, store the updated user data in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if logged out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
