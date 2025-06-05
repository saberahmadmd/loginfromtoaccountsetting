export const getUsers = () => {
  const users = localStorage.getItem('popx_users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem('popx_users', JSON.stringify(users));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('popx_current_user');
  return user ? JSON.parse(user) : null;
};

export const saveCurrentUser = (user) => {
  localStorage.setItem('popx_current_user', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('popx_current_user');
};