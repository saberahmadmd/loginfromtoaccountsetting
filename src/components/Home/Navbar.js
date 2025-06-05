import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import './Home.css';

const Navbar = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, deleteAccount, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const success = deleteAccount();
    if (success) {
      navigate('/');
    } else {
      alert('Failed to delete account. User data not available.');
    }
    setShowDeleteConfirm(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">PopX</div>
      <div className="navbar-actions">
        {currentUser && (
          <div className="user-menu">
            <button
              className="user-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {currentUser.fullName}
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <Link
                  to="/account-settings"
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  Account Settings
                </Link>
                <button
                  className="dropdown-item logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
                <button
                  className="dropdown-item delete-btn"
                  onClick={() => {
                    setShowDropdown(false);
                    setShowDeleteConfirm(true);
                  }}
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="modal-content">
            <h3>Confirm Account Deletion</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={handleDeleteAccount}
              >
                Yes, Delete
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;