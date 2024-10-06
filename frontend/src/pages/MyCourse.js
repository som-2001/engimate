import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../components/BaseUrl";
import axios from "axios";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const MyCourse = () => {
  const [result, setResult] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = sessionStorage?.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);

      // Check if token is expired
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        sessionStorage.removeItem("token"); // Clear expired token
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {

    axios
      .get(`${BaseUrl}/mycourses`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        setResult(res.data);
      });
  }, []);

  if (load) {
    return (
      <center style={{overflowX:"hidden"}}>
        <UserNavbar />
        <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/my_course.png)",
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
              My Courses
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
              Explore a dynamic environment where technology meets creativity, providing you with a vibrant and engaging platform to master new concepts.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg" sx={{ paddingY: "3rem" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#333",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          My Courses
        </Typography>

        <center>
          <Divider
            sx={{
              backgroundColor: "blue",
              width: { lg: "10vw", xs: "30vw", md: "15vw",sm:"20vw" },
              fontWeight: "700",
              marginTop:"10px",
              marginBottom:"40px"
            }}
          />
        </center>
    
      </Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <CircularProgress size={40} sx={{ marginY: "20vh" }} />
        </Box>
        <Footer />
      </center>
    );
  }

  const handleViewCourses = (id) => {
    window.location.href = `/lectures/${id}`;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <UserNavbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/my_course.png)",
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
              My Courses
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
              Explore a dynamic environment where technology meets creativity, providing you with a vibrant and engaging platform to master new concepts.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg" sx={{ paddingY: "3rem" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            marginBottom: "2rem",
            color: "#333",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          My Courses
        </Typography>

        <center>
          <Divider
            sx={{
              backgroundColor: "blue",
              width: { lg: "10vw", xs: "30vw", md: "15vw",sm:"20vw" },
              fontWeight: "700",
              marginTop:"10px",
              marginBottom:"40px"
            }}
          />
        </center>
        <Grid container spacing={4}>
          {result.length === 0 ? (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                sx={{ color: "gray", fontSize: "1.2rem" }}
              >
                You have not bought any courses yet.
              </Typography>
            </Grid>
          ) : (
            result.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card
                  onClick={() => handleViewCourses(course?._id)}
                  sx={{
                    boxShadow: 4,
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                    },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.image}
                    alt={course.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "#fff",
                      padding: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: { xs: "1rem", md: "1.25rem" },
                      }}
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: "0.75rem" }}
                    >
                      {course.card_description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};
