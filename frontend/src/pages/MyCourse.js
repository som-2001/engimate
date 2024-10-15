import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import FAQPurchasedCourses from "../components/FAQPurchasedCourses";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // Import advancedFormat for ordinal dates

dayjs.extend(advancedFormat);

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
      .get(`${process.env.REACT_APP_BASEURl}/mycourses`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoad(false);
        setResult(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  }, [navigate]);

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
              Explore a dynamic environment where technology meets creativity,
              providing you with a vibrant and engaging platform to master new
              concepts.
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
              width: { lg: "10vw", xs: "30vw", md: "15vw", sm: "20vw" },
              fontWeight: "700",
              marginTop: "10px",
              marginBottom: "40px",
            }}
          />
        </center>
        {load ? (
          <Box sx={{ textAlign: "center" }}>
            <Grid container spacing={4} justifyContent="center">
              {[...Array(3)].map((_, index) => (
                <Grid item xs={12} sm={12} md={12} key={index}>
                  <Card>
                    <CardContent>
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton
                        variant="rectangular"
                        height={48}
                        sx={{ marginTop: 2 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : result.length === 0 ? (
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
          <Grid container spacing={4} justifyContent="center">
            {result.map((course, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
   

                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack vertically on small screens
                    alignItems: "center", // Center content on small screens
                    p: 2, // Add padding for better spacing
                    gap: 2, // Add gap between media and content
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: "100%", sm: 300 }, // Full width on small screens, 300px on larger screens
                      height: { xs: 200, sm: "auto" }, // Set fixed height on small screens
                      objectFit: "cover", // Make sure image covers the container
                    }}
                    image={course.image}
                    alt=""
                    onClick={() => handleViewCourses(course?._id)}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // flex: "1 0 auto",
                    }}
                  >
                    <CardContent cc>
                      <Typography component="div" variant="h5">
                        {course?.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary", wordWrap: "break-word" }}
                      >
                        {course.card_description.length > 200
                          ? `${course.card_description.slice(0, 200)}...`
                          : course.card_description}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary" }}
                      >
                        Created At:{" "}
                        {dayjs(course?.createdAt).format("Do MMM YYYY")}
                      </Typography>
                      <span
                        
                        style={{ fontSize: "1.0rem", color: "red",textDecoration:"line-through" }}
                      >
                        Rs: {course.price} 
                      </span>
                      <span style={{color:"green",textDecoration:"none",fontSize:"1.2rem"}}> 
                     {" "}Enrolled</span>
                     
                    </CardContent>
                    <Button
                     
                     sx={{
                       backgroundColor: "#0d47a1", // Blue color for Edit
                       color: "#fff",
                       width: {xs:"80%",md:"40%",sm:"40%",lg:"30%"},
                       padding: "5px 16px", // Adjust padding
                       fontSize: "1rem",
                       textTransform: "none",
                       borderRadius: "50px",
                       "&:hover": {
                         backgroundColor: "#08306b", // Darker shade on hover
                       },
                       marginBottom: "5px",
                     }}
                     onClick={() => handleViewCourses(course?._id)}
                   >
                     View
                   </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <FAQPurchasedCourses />
      </Container>
      <Footer />
    </Box>
  );
};
