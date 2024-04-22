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
  const [isHighestAdmin, setHighestAdmin]= useState(
    ()=> typeof window !== 'undefined' ? Boolean(localStorage.getItem('isHighestAdmin')):false
  )
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
    // setHighestAdmin(true);
    localStorage.setItem('isAdmin', 'true'); // Store as a string
    // localStorage.setItem('isHighestAdmin','true');
  };
  const highestAdminLogin=()=>{
    setAdminLogin(true);
    setHighestAdmin(true);
    localStorage.setItem('isHighestAdmin','true');
    localStorage.setItem('isAdmin','true');
  }
  const adminLogout = () => {
    setAdminLogin(false);
    setHighestAdmin(false);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isHighestAdmin');
  };
  

  const logout = () => {
    setIsLoggedIn(false);
    setAdminLogin(false);
    setHighestAdmin(false);

    setUserId(null);
    setUsername(null);
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isHighestAdmin')
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{isHighestAdmin ,username, isLoggedIn, userId, isAdmin,highestAdminLogin ,adminLogin, adminLogout, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
