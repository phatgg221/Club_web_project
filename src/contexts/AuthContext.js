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

  const [isAdmin, setAdminLogin] = useState(
    () => typeof window !== 'undefined' ? Boolean(localStorage.getItem('isAdmin')) : false
  );

  const [userId, setUserId] = useState(
    () => typeof window !== 'undefined' ? localStorage.getItem('userId') : null
  );
  const [username, setUsername] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('username') : null);

  const login = (id, username2) => {
    setIsLoggedIn(true);
    setUserId(id);
    setUsername(username2);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userId', id);
    localStorage.setItem('username', username2);
  };

  const adminLogin = () => {
    setAdminLogin(true);
    localStorage.setItem('isAdmin', 'true'); // Store as a string
  };

  const adminLogout = () => {
    setAdminLogin(false);
    localStorage.removeItem('isAdmin');
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
    <AuthContext.Provider value={{ username, isLoggedIn, userId, isAdmin, adminLogin, adminLogout, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
