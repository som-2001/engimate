import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdPerson,
  MdSubject,
} from "react-icons/md";
import "../App.css";
import React, { useState } from "react";
import UserNavbar from "../components/userNavbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

export const Contact = () => {
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setLoad(true);
    axios
      .post(`${process.env.REACT_APP_BASEURl}/contact/us`, data)
      .then((response) => {
        setLoad(false);
        toast.success(response.data.message, { autoClose: 3000 });
        reset(); // Reset form on success
      })
      .catch((error) => {
        setLoad(false);
        console.error("Error sending message:", error);
        alert("Failed to send message, please try again.");
      });
  };
  return (
    <Box
      style={{
        overflowX: "hidden",
        backgroundColor: "whitesmoke",
        color: "#113",
        fontFamily: "math",
      }}
    >
      {sessionStorage.getItem("token") ? <UserNavbar /> : <Navbar />}

      <ToastContainer/>
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(./images/contact.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "2vw",
          paddingBottom: "15vw",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay with opacity
            zIndex: 1,
          },
        }}
      >
        <Grid
          container
          sx={{
            position: "relative",
            zIndex: 2,
            color: "white",
            padding: { xs: "20px", sm: "20px", md: "50px" },
          }}
        >
          <Grid item xs={12} sm={12} lg={6} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.4rem",
                  md: "2.6rem",
                  lg: "2.6rem",
                },
                marginTop: { xs: "20px", md: "50px" },
                fontWeight: "bold",
                color: "white",
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.2rem",
                },
                marginTop: "10px",
                fontWeight: "500",
                padding: { xs: "10px", sm: "10px", md: "0px" },
                color: "white",
              }}
            >
              If you have any questions, suggestions, or require assistance,
              please do not hesitate to reach out to us. We are here to help and
              look forward to hearing from you.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100vw", textAlign: "center", marginTop: "20px" }}>
        <span style={{ color: "blue", fontSize: "1.2rem" }}>Let's Connect</span>
        <br />
        <p style={{ fontSize: "3rem", marginTop: "5px" }} className="header">
          Contact Us
        </p>

        <Grid container spacing={6} sx={{ padding: "20px" }}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              flexDirection: "column",
              display: "flex",
              gap: "10px",
              position: { lg: "relative" },
              left: { lg: "10px" },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <TextField
                type="text"
                placeholder="Name..."
                fullWidth
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdPerson />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email Field */}
              <TextField
                type="text"
                placeholder="Email..."
                fullWidth
                margin="small"
                {...register("email")}
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

              {/* Phone Field */}
              <TextField
                type="number"
                placeholder="Phone..."
                fullWidth
                sx={{marginTop:'10px'}}
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdPhone />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Subject Field */}
              <TextField
                type="text"
                placeholder="Subject..."
                fullWidth
                sx={{marginTop:'10px'}}
                {...register("subject")}
                error={!!errors.subject}
                helperText={errors.subject ? errors.subject.message : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSubject />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Message Field */}
              <TextField
                type="text"
                placeholder="Message..."
                multiline
                rows={4}
                fullWidth
                sx={{marginTop:'10px'}}
                {...register("message")}
                error={!!errors.message}
                helperText={errors.message ? errors.message.message : ""}
              />

              {/* Submit Button */}
              <center>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={load}
                  sx={{
                    backgroundColor: "#0d47a1",
                    color: "#fff",
                    width:"60%",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "#08306b",
                    },
                    marginTop:'10px'
                  }}
                >
                  {load?<CircularProgress size={30}/>:"Send Message"}
                </Button>
              </center>
            </form>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              flexDirection: "column",
              textAlign: "initial",
              marginLeft: { xs: "20px", lg: "0px", sm: "30px", md: "0px" },
            }}
          >
            <Typography variant="h4" mb={2} className="header">
              Get in touch
            </Typography>
            <Divider
              sx={{
                backgroundColor: "blue",
                width: { lg: "30vw", xs: "70vw", md: "40vw" },
                fontWeight: "700",
              }}
            />
            <Box my={2}>
              <Typography variant="h6" color="textPrimary">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <MdLocationOn />
                  </Box>
                  <Box style={{ marginTop: "-3px" }}>Address</Box>
                </Box>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                NH-83, Boond Vihar Colony, Street no.- 02,
                <br />
                Near Jehanabad Court Halt,
                <br />
                Jehanabad, Bihar, India
                <br />
                Pin-804417
              </Typography>
            </Box>
            <Box my={2}>
              <Typography variant="h6" color="textPrimary">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <MdEmail />
                  </Box>
                  <Box style={{ marginTop: "-3px" }}>Email</Box>
                </Box>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                lyssstartup24@gmail.com
              </Typography>
            </Box>
            <Box my={2}>
              <Typography variant="h6" color="textPrimary">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <MdPhone />
                  </Box>
                  <Box style={{ marginTop: "-3px" }}>Phone</Box>
                </Box>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                +91 7905682392
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ display: { lg: "block", sm: "none", md: "block", xs: "none" } }}
      >
        <center>
          <p style={{ fontSize: "1.5rem", marginBottom: "15px" }}>
            Our Location
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.874539845016!2d84.98324217498582!3d25.173713777726057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2cbff1fdab43b%3A0xef68a9692b9d0a91!2sLYSS%20Technology%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1725302354472!5m2!1sen!2sin"
            width="750"
            height="400"
            title="map"
            style={{ borderRadius: "15px", zoom: 1.1 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </center>
      </Box>

      <Footer />
    </Box>
  );
};
