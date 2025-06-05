import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import './AccountSettings.css';

const AccountSettings = () => {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [previewUrl, setPreviewUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState(currentUser?.fullName || '');
  const [tempEmail, setTempEmail] = useState(currentUser?.email || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser?.profilePic) {
      setPreviewUrl(currentUser.profilePic);
    }
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const removeProfilePic = () => {
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const cameraModal = document.createElement('div');
      cameraModal.style.position = 'fixed';
      cameraModal.style.top = '0';
      cameraModal.style.left = '0';
      cameraModal.style.width = '100%';
      cameraModal.style.height = '100%';
      cameraModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
      cameraModal.style.zIndex = '1000';
      cameraModal.style.display = 'flex';
      cameraModal.style.flexDirection = 'column';
      cameraModal.style.alignItems = 'center';
      cameraModal.style.justifyContent = 'center';

      const videoContainer = document.createElement('div');
      videoContainer.style.width = '300px';
      videoContainer.style.height = '300px';
      videoContainer.style.overflow = 'hidden';
      video.style.width = '100%';
      videoContainer.appendChild(video);

      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Capture';
      Object.assign(captureBtn.style, {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#6c25ff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      });

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      Object.assign(cancelBtn.style, {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      });

      cameraModal.appendChild(videoContainer);
      cameraModal.appendChild(captureBtn);
      cameraModal.appendChild(cancelBtn);
      document.body.appendChild(cameraModal);

      captureBtn.onclick = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setPreviewUrl(imageDataUrl);
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(cameraModal);
      };

      cancelBtn.onclick = () => {
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(cameraModal);
      };
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please check permissions.');
    }
  };

  const handleSave = () => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      fullName: tempName,
      email: tempEmail,
      profilePic: previewUrl || null
    };

    updateUserProfile(updatedUser);
    setEditMode(false);
  };

  if (!currentUser) {
    return <div className="account-settings-container">Please log in to view account settings.</div>;
  }

  //const hasProfilePic = (previewUrl !== null) && (previewUrl || currentUser.profilePic);

  const hasProfilePic = previewUrl?.trim().length > 0;

  return (
    <div className="account-settings-container">
      <h1>Account Settings</h1>

      <div className="profile-section">
        <div className="profile-pic-container">
          {hasProfilePic ? (
            <img
              src={previewUrl || currentUser.profilePic}
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <div className="profile-pic-placeholder">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          {editMode && (
            <div className="profile-pic-options">
              <button onClick={triggerFileInput} className="pic-option-btn">
                Choose from Device
              </button>
              <button onClick={triggerCamera} className="pic-option-btn">
                Take Photo
              </button>
              {hasProfilePic && (
                <button
                  onClick={removeProfilePic}
                  className="pic-option-btn remove-btn"
                >
                  Remove Photo
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        <div className="user-info">
          {editMode ? (
            <>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="edit-input"
              />
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="edit-input"
              />
            </>
          ) : (
            <>
              <h2>{currentUser.fullName}</h2>
              <p>{currentUser.email}</p>
            </>
          )}
        </div>
      </div>

      <div className="description">
        <p>Lorem Ipsum Dolor Sit Amet, Consetetur Sedipiscing</p>
        <p>Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut</p>
        <p>Labore Et Dolore Magna Aliquyam Erat, Sed Diam</p>
      </div>

      <div className="action-buttons">
        {editMode ? (
          <>
            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setTempName(currentUser.fullName);
                setTempEmail(currentUser.email);
                setPreviewUrl(currentUser.profilePic || '');
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="edit-btn">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
