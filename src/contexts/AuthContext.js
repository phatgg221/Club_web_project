// contexts/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(
      () => typeof window !== 'undefined' ? Boolean(localStorage.getItem('isLoggedIn')) : false
    );
    
  
     const [userId, setUserId] = useState(
        () => typeof window !== 'undefined' ? localStorage.getItem('userId') : null
     );
    
     const login = (id) => {
        setIsLoggedIn(true);
        setUserId(id);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', id);
     };
    
     const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
     };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
