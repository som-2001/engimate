import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import { URL } from '../components/BaseUrl';
import axios from 'axios';
// Validation Schema using Yup
const schema = yup.object().shape({
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
});

const VerifyEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    
    let data1 = JSON.stringify({
        "activationToken": sessionStorage.getItem("activationToken"),
        "otp": data.otp
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${URL}/verify`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data1
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert('OTP Verified');
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  return (
    <Box>
        <Navbar/>
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Verify OTP
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            {...register('otp')}
            error={!!errors.otp}
            helperText={errors.otp ? errors.otp.message : ''}
            inputProps={{ maxLength: 6 }}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Verify
          </Button>
        </form>
      </Box>
    </Container>
    <Footer/>
    </Box>
  );
};

export default VerifyEmail;
