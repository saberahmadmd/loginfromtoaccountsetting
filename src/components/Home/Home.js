import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Navbar from './Navbar';
import './Home.css';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1>Welcome, {currentUser.fullName}</h1>
        <p>Email: {currentUser.email}</p>
        <p>Company: {currentUser.companyName}</p>
        <p>Account Type: {currentUser.isAgency ? 'Agency' : 'Regular User'}</p>
      </div>
    </div>
  );
};

export default Home;