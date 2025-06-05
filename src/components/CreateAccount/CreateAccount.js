import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Cookies from 'js-cookie'
import './CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, currentUser } = useContext(AuthContext);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (error) setError('')

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    const { fullName, phoneNumber, email, password, companyName } = formData;

    if (!fullName || !phoneNumber || !email || !password || !companyName) {
      setError('Please fill in all required fields');
      return;
    }

    const userData = {
      fullName,
      phoneNumber,
      email,
      password,
      companyName,
      isAgency: formData.isAgency
    };

    register(userData);
    navigate('/home');
  };

  return (
    <div className="create-account-container">
      <h1>Create your<br />PopX account</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Full Name*</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Phone number*</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Enter your phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email address*</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password*</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Company name*</label>
        <input
          type="text"
          name="companyName"
          placeholder="Enter your company name"
          value={formData.companyName}
          onChange={handleChange}
        />
      </div>

      <div className="agency-group">
        <label>Are you an Agency?*</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="isAgency"
              checked={formData.isAgency}
              onChange={() => setFormData({ ...formData, isAgency: true })}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="isAgency"
              checked={!formData.isAgency}
              onChange={() => setFormData({ ...formData, isAgency: false })}
            />
            No
          </label>
        </div>
      </div>

      <button className="create-account-btn" onClick={handleSubmit}>
        Create Account
      </button>
    </div>
  );
};

export default CreateAccount;