import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { URL } from "../components/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {jwtDecode} from 'jwt-decode';

// Define your Yup validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  otp: Yup.string().when("hide", {
    is: true,
    then: Yup.string().required("OTP is required"),
  }),
});

export const Login = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [load, setLoad] = useState(false);

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoad(true);

    try {
      if (!hide) {
        // Request OTP
        const response = await axios.post(`${URL}/request-login-otp/`, {
          email: data.email,
        });
        toast.success("OTP has been sent to your email", { autoClose: 3000 });
        if (response?.data?.message === "OTP sent to your email.") {
          setHide(true);
        }
      } else {
        // Verify OTP
        const response = await axios.post(`${URL}/login/`, {
          email: data.email,
          otp: data.otp,
        });
        toast.success(response.data.message, { autoClose: 3000 });
        sessionStorage.setItem("token",response.data.token);
        // You can handle successful login here (e.g., navigate to dashboard)
        setInterval(()=>{
          if(jwtDecode(response.data.token).role==='admin' || jwtDecode(response.data.token).role==='instructor')
            navigate('/dashboard');
          else{
            navigate('/user-dashboard');
          }
        },2000);  
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred", { autoClose: 3000 });
    } finally {
      setLoad(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Navbar />
      <ToastContainer />
      <Box>
        <Grid
          container
          spacing={4}
          sx={{
            height: "100vh",
            alignItems: "center",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
            <img
              src="https://blog.ahgora.com/wp-content/uploads/2020/04/Como-fazer-a-gestao-do-trabalho-home-office-de-um-modo-eficaz.jpg"
              alt="Registration"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginTop: "10%",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: { xs: -5, sm: 3, md: 5 },
                px: { xs: 2, sm: 4, md: 6 },
              }}
            >
              <CardMedia
                component="img"
                src="../images/logo.png"
                alt="Logo"
                sx={{
                  width: { xs: "60%", sm: "50%", md: "45%", lg: "45%" },
                  height: "auto",
                  marginBottom: "20px",
                  mt: { xs: "5%", md: "0%" },
                  cursor:"pointer"
                }}
              />
              <Typography
                variant="body2"
                align="center"
                sx={{ mb: 1, fontSize: { xs: "1.5rem", md: "1.8rem" } }}
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "600" }}
                align="center"
              >
                An Online Learning Platform
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: { xs: "100%", sm: "80%", md: "70%" },
                  mt: 4,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CgProfile />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Email..."
                        fullWidth
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Box>

                {hide && (
                  <Box sx={{ mb: 2 }}>
                    <Controller
                      name="otp"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CgProfile />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="OTP..."
                          fullWidth
                          variant="outlined"
                          error={!!errors.otp}
                          helperText={errors.otp?.message}
                        />
                      )}
                    />
                  </Box>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body1"
                    textAlign="center"
                    fontSize="0.9rem"
                  >
                    New to YANTRAVED?{" "}
                    <span
                      onClick={() => navigate("/register")}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Register now.
                    </span>
                  </Typography>
                </Box>
                <center>
                  <Button
                    type="submit"
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
                      marginBottom: "30px",
                    }}
                    disabled={load} // Disable button when loading
                  >
                    {load ? <CircularProgress size={30}/> : (hide ? "Verify OTP" : "Send OTP")}
                  </Button>
                </center>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};
