import { useState } from 'react';
import { Box, Menu, MenuItem, Avatar, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        alt="User Name"
        src="/path/to/profile-picture.jpg" // Replace with dynamic profile picture
        sx={{
          width: 40,
          height: 40,
          cursor: 'pointer',
          border: '2px solid #1976d2', // Add a border
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Add shadow
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#1565c0', // Change border color on hover
            transform: 'scale(1.1)', // Enlarge avatar on hover
          },
        }}
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: 2, '& .MuiMenuItem-root': { transition: 'all 0.3s ease' } }}
      >
        <MenuItem sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="User Name"
            src="/path/to/profile-picture.jpg" // Replace with dynamic profile picture
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">User Name</Typography>
            <Typography variant="body2" color="text.secondary">user@example.com</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
        component={Link}
          to="/"
          onClick={handleLogout}
          sx={{
            '&:hover': {
              backgroundColor: '#d32f2f',
              color: '#fff',
              transition: 'background-color 0.3s ease',
            },
            '&:active': {
              backgroundColor: '#c62828',
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileDropdown;
