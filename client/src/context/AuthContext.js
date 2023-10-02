import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
