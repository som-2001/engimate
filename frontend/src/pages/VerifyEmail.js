import {
  Box,
  Button,
  CardMedia,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCodeBranch } from "react-icons/fa";
import { URL } from "../components/BaseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useState } from "react";

export const VerifyEmail = () => {
  
  const [load,setLoad]=useState(false);
  const schema = yup.object().shape({
    otp: yup.string().required('OTP is required')
  });
  
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    
    setLoad(true);

    let data1 = JSON.stringify({
        "activationToken": sessionStorage.getItem("activationToken"),
        "otp": parseInt(data.otp)
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
        console.log((response.data));
        setLoad(false);
        toast.success('OTP Verified',{autoClose:3000});
        setInterval(()=>{
          window.location.href="/login";
        },3000);
      })
      .catch((error) => {
        setLoad(false);
        toast.error(error?.response?.data?.message,{autoClose:3000});
        console.log(error);
      });
    
  };
  
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Navbar />
     
      <ToastContainer  />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={4}
          sx={{ alignItems: "center", px: { xs: 2, sm: 3, md: 4 } }}
        >
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src="https://blog.ahgora.com/wp-content/uploads/2020/04/Como-fazer-a-gestao-do-trabalho-home-office-de-um-modo-eficaz.jpg"
              alt="Registration"
              style={{ width: "100%", height: "100%", objectFit: "cover", marginTop: "8%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: { xs: 2, sm: 3, md: 5 },
                px: { xs: 2, sm: 4, md: 6 },
              }}
            >
              <CardMedia
                component="img"
                src="../images/logo.png"
                alt="Logo"
                sx={{
                  width: { xs: "60%", sm: "50%", md: "45%" },
                  height: "auto",
                  mt: { xs: "5%", md: "0%" },
                }}
              />
              <Typography
                variant="body2"
                align="center"
                sx={{ mb: 1, fontSize: { xs: "1.2rem", md: "1.4rem" } }}
                className="header"
              >
                OTP Verification
              </Typography>
            
              <Box sx={{ width: { xs: "100%", sm: "90%", md: "90%" }, mt: 4 }}>
               
                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="OTP..."
                        fullWidth
                        variant="outlined"
                        error={!!errors.otp}
                        helperText={errors.otp ? errors.otp.message : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FaCodeBranch />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
                <center>
                  <Button
                    type="submit"
                    disabled={load}
                    variant="contained"
                    sx={{
                      backgroundColor: "#0d47a1",
                      color: "#fff",
                      width: "60%",
                      padding: "10px 24px",
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: "50px",
                      "&:hover": {
                        backgroundColor: "#08306b",
                      },
                      marginBottom: "20px",
                    }}
                  >
                    {load ? <CircularProgress  size={30}/>:<span>Verify OTP</span>}
                  </Button>
                </center>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Footer />
    </Box>
  );
};
