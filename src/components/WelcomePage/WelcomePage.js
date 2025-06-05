import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  return (
    <div className='welcome-main-container'>
      <div className="welcome-container">
        <h1>Welcome to PopX</h1>
        <p>Lorem ipsum dolor sit amet,</p>
        <p>consectetur adipiscing elit.</p>
        <button
          className="create-account-btn"
          onClick={() => navigate('/create-account')}
        >
          Create Account
        </button>
        <button
          className="login-btn"
          onClick={() => navigate('/login')}
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;