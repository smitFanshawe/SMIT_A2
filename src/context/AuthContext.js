import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials (hardcoded for this example)
      if (username === 'admin','Admin' && password === 'admin') {
        setUser({ username: 'admin', name: 'Admin User' });
        setUser({ username: 'Admin', name: 'Admin User' });
        return true;
      } else {
        setError('Invalid username or password');
        return false;
      }
    } catch (err) {
      setError('An error occurred during sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={ {
        user,
        loading,
        error,
        signIn,
        signOut,
        isAuthenticated: !!user,
      } }
    >
      {children}
    </AuthContext.Provider>
  );
};