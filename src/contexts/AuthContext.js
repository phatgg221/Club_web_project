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
     const [username, setUsername] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('username') : null);

     const login = (id,username2) => {
        setIsLoggedIn(true);
        setUserId(id);
        setUsername(username2);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', id);
        localStorage.setItem('username', username2)
     };
    
     const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setUsername(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
     };

  return (
    <AuthContext.Provider value={{ username,isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
