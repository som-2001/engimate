import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
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

// Define Yup validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").when("hide", {
    is: true,
    then: Yup.string().required("Email is required"),
  }),
  otp: Yup.string().when("hide", {
    is: true,
    then: Yup.string().required("OTP is required"),
  }),
  phone_number: Yup.string().when("hide", {
    is: true,
    then: Yup.string()
      .matches(/^\+[1-9]\d{1,14}$/, "Invalid phone number with country code")
      .required("Phone number is required"),
  }),
});

export const Login = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [load, setLoad] = useState(false);
  const [tab, setTab] = useState(0); // Track which tab is active

  // Initialize react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setHide(false); // Reset hide when switching tabs
  };

  const onSubmit = async (data) => {
    setLoad(true);
    try {
      if (!hide) {
        // Request OTP (Email or Phone based on the tab)
        if (tab === 0) {
          // Email OTP
          const response = await axios.post(`${URL}/request-login-otp`, {
            email: data.email,
          });
          toast.success("OTP has been sent to your email", { autoClose: 3000 });
          if (response?.data?.message === "OTP sent to your email.") {
            setHide(true);
          }
        } else {
          // Phone OTP
          const response = await axios.post(`${URL}/request-mobile-otp`, {
            phone_number: `+91${data.phone_number}`,
          });
          toast.success("OTP has been sent to your phone", { autoClose: 3000 });
          if (response?.data?.message === "OTP sent to your phone number.") {
            setHide(true);
          }
        }
      } else {
        // Verify OTP (Email or Phone based on the tab)
        if (tab === 0) {
          // Verify Email OTP
          const response = await axios.post(`${URL}/login/`, {
            email: data.email,
            otp: data.otp,
          });
          toast.success(response.data.message, { autoClose: 3000 });
          sessionStorage.setItem("token", response.data.token);
        } else {
          // Verify Phone OTP
          const response = await axios.post(`${URL}/mobile-login/`, {
            phone_number: `+91${data.phone_number}`,
            otp: data.otp,
          });
          toast.success(response.data.message, { autoClose: 3000 });
          sessionStorage.setItem("token", response.data.token);
        }

        // Redirect to dashboard based on role
        setInterval(() => {
          const decodedToken = jwtDecode(sessionStorage.getItem("token"));
          if (decodedToken.role === "admin" || decodedToken.role === "instructor") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/user-dashboard";
          }
        }, 2000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred", {
        autoClose: 3000,
      });
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
                marginTop: "5%",
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
                src="../images/logo1.png"
                alt="Logo"
                sx={{
                  width: { xs: "50%", sm: "25%", md: "45%", lg: "30%" },
                  height: "auto",
                  marginBottom: "10px",
                  mt: { xs: "5%", md: "0%" },
                  cursor: "pointer",
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
                sx={{ fontWeight: "400" }}
                align="center"
              >
                Crack Jobs with YANTRAVED
              </Typography>

              {/* Tabs for Email/Phone Verification */}
              <Tabs
                value={tab}
                onChange={handleTabChange}
                aria-label="login tabs"
                centered
                sx={{ mt: 3, minHeight: "auto", }}
              >
                <Tab label="Login with Email" sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem" }, // responsive font size
                minWidth: { xs: 60, sm: 80 }, // adjust width for smaller screens
                padding: { xs: "6px 12px", sm: "10px 20px" }, // responsive padding
              }} />
                <Tab label="Login with Phone" sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem" }, // responsive font size
                minWidth: { xs: 60, sm: 80 }, // adjust width for smaller screens
                padding: { xs: "6px 12px", sm: "10px 20px" }, // responsive padding
              }} />
              </Tabs>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: { xs: "100%", sm: "80%", md: "70%" },
                  mt: 4,
                }}
              >
                {tab === 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="email"
                          required
                          disabled={hide}
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
                )}

                {tab === 1 && (
                  <Box sx={{ mb: 2 }}>
                    <Controller
                      name="phone_number"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          required
                          disabled={hide}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CgProfile />
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            maxLength: 10, // Limit to 12 digits
                            minLength:10,
                            inputMode: 'numeric',  // Show numeric keyboard on mobile
                            pattern: '[0-9]*',  // Ensure only digits are entered
                          }}
                          placeholder="Phone number with country code..."
                          fullWidth
                          variant="outlined"
                          error={!!errors.phone_number}
                          helperText={errors.phone_number?.message}
                        />
                      )}
                    />
                  </Box>
                )}

                {hide && (
                  <Box sx={{ mb: 2 }}>
                    <Controller
                      name="otp"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          required
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
                <center>
                
                <Button
                  type="submit"
                  variant="contained"
                  disabled={load}
                  fullWidth
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
                  {load ? <CircularProgress size={24} /> : hide ? "Verify OTP" : "Send OTP"}
                </Button>
                </center>
                
              </Box>
              <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" textAlign="center" fontSize="0.9rem">
                    new to YANTRAVED?{" "}
                    <span
                      onClick={() => window.location.href = "/register"}
                      style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                      Register now.
                    </span>
                  </Typography>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};
