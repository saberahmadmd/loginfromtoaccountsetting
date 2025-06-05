import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Cookies from 'js-cookie';
import './LoginPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, currentUser } = useContext(AuthContext);

  useEffect(() => {
    const authCookie = Cookies.get('popx_auth');
    if (authCookie) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/home');
    } else {
      setError('Invalid email or password. Don\'t have an account?');
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
  };

  const goToCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="login-container">
      <h1>Signin to your<br />PopX account</h1>
      <p>Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>



      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={handleInputChange(setEmail)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleInputChange(setPassword)}
        />
      </div>

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      {error && (
        <div className="error-message">
          {error}
          {error.includes('Invalid') && (
            <button
              onClick={goToCreateAccount}
              className="create-account-link"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
