import React, { useEffect, useState } from 'react';
import { Button, Avatar, TextField } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { json } from 'react-router-dom';
// import defaultProfile from '/Profile/defaultProfile.jpg'
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});

  const [editedUser, setEditedUser] = useState(user);

useEffect(()=>{
  const storedUser=JSON.parse(localStorage.getItem('user'))
  if(storedUser){
    setUser(storedUser);
  }
},[])

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleSaveChanges = () => {
    setUser(editedUser);
    localStorage.setItem('user',JSON.stringify(editedUser))
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <Avatar src={user.avatar} alt={user.username} className="profile-avatar" />
        <h2>{user.name ||'UserName here'}</h2>
        <p>{user.email || 'user@123.com'}</p>
        <Button className='btn-secondary' startIcon={<FaEdit />} onClick={handleEditToggle}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="profile-body">
        {isEditing ? (
          <>
            <TextField
              label="Name"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Bio"
              name="bio"
              value={editedUser.bio}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              margin="normal"
            />
            <Button className='btn-success' color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <p><strong>Bio:</strong> {user.bio}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
