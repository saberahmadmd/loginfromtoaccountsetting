import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const authCookie = Cookies.get('popx_auth');

  if (!currentUser && !authCookie) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;