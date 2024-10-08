import React, { useState } from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const [open,setOpen]=useState(true);

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Remove token or any session data
    navigate('/login'); // Redirect to login page after logging out
  };

  // Function to cancel logout
  const handleCancel = () => {
    setOpen(false); // Redirect to the previous page
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Dialog open={open}>
        <DialogTitle>
          Are you sure you want to logout?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please confirm if you would like to log out of your session.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: '20px',
              padding: '5px 20px',
            }}
          >
            No
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '20px',
              padding: '5px 20px',
            }}

          >
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


