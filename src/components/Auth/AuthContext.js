import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUsers, saveUsers, getCurrentUser, saveCurrentUser, clearCurrentUser } from '../../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadedUsers = getUsers();
    const loadedCurrentUser = getCurrentUser();

    if (loadedUsers) setUsers(loadedUsers);
    if (loadedCurrentUser) setCurrentUser(loadedCurrentUser);
  }, []);

  const updateUserProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    saveCurrentUser(updatedUser);

    const updatedUsers = users.map(user =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    
    if (Cookies.get('popx_auth')) {
      Cookies.set('popx_auth', JSON.stringify(updatedUser), { expires: 7 });
    }
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      profilePic: ''
    };
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    saveUsers(newUsers);
    setCurrentUser(newUser);
    saveCurrentUser(newUser);
    Cookies.set('popx_auth', JSON.stringify(newUser), { expires: 7 });
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      saveCurrentUser(user);
      Cookies.set('popx_auth', JSON.stringify(user), { expires: 7 });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    clearCurrentUser();
    Cookies.remove('popx_auth');
  };

  const deleteAccount = () => {
    if (!currentUser) return false;

    const updatedUsers = users.filter(u => u.email !== currentUser.email);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    logout();
    return true;
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      register,
      login,
      logout,
      deleteAccount,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};