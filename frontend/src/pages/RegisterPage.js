import {
  Box,
  Button,
  CardMedia,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdOutlineLocalPhone, MdQrCode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaCodeBranch } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { URL } from "../components/BaseUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useState } from "react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [load,setLoad]=useState(false);
  const [referral_code,setReferral_code]=useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    course: Yup.string().required("Course selection is required"),
    specialization: Yup.string().required("Specialization is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {

    console.log("seesgs");
    setLoad(true);

    const postData = {
      email: data.email,
      name: data.name,
      phone_number: data.phone,
      course_enrolled: data.course,
      specialization: data.specialization,
      referral_code:referral_code
    };

    axios
      .post(`${URL}/register`, postData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setLoad(false);
        sessionStorage.setItem("activationToken", response.data.activationToken);
        toast.success("Otp has been sent to your email", { autoClose: 3000 });
        setInterval(()=>{
          navigate("/verify-email");
        },3000)
       
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
        toast.error(error?.response?.data?.message,{autoClose:3000});
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
              style={{ width: "100%", height: "100%", objectFit: "cover", marginTop: "25%" }}
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
                  cursor:"pointer"
                }}
              />
              <Typography
                variant="body2"
                align="center"
                sx={{ mb: 1, fontSize: { xs: "1.5rem", md: "1.8rem" } }}
                className="header"
              >
                Welcome to YANTRAVED
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "600" }}
                align="center"
              >
                An Online Learning Platform
              </Typography>
              <Box sx={{ width: { xs: "100%", sm: "90%", md: "90%" }, mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Name..."
                        fullWidth
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CgProfile />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Email..."
                        fullWidth
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdEmail />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Phone no..."
                        fullWidth
                        variant="outlined"
                        error={!!errors.phone}
                        helperText={errors.phone ? errors.phone.message : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdOutlineLocalPhone />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="Referal code"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Referal Code"
                        onChange={(e)=>setReferral_code(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdQrCode />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth variant="outlined" error={!!errors.course}>
                    <InputLabel id="course-label">Course</InputLabel>
                    <Controller
                      name="course"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          labelId="course-label"
                          label="Course"
                        >
                          <MenuItem value="B.tech">B.Tech</MenuItem>
                          <MenuItem value="M.tech">M.Tech</MenuItem>
                          <MenuItem value="B.sc.">B.Sc.</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.course && (
                      <FormHelperText>{errors.course.message}</FormHelperText>
                    )}
                  </FormControl>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="specialization"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="Specialization..."
                        fullWidth
                        variant="outlined"
                        error={!!errors.specialization}
                        helperText={errors.specialization ? errors.specialization.message : ""}
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

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" textAlign="center" fontSize="0.9rem">
                    Already Have an account?{" "}
                    <span
                      onClick={() => window.location.href = "/login"}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Login now.
                    </span>
                  </Typography>
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
                    {load ? <CircularProgress  size={30} />:<span>Register</span>}
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
