import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to the homepage or any other route
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
      }}
    >
        
      <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
        Oops! Page not found.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{ padding: '10px 20px' }}
      >
        Go back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
