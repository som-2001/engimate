import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import UserNavbar from "./userNavbar";
import { jwtDecode } from "jwt-decode";


const CourseList = () => {
  const { id } = useParams();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/course-detail/${id}`);
  };

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
    axios.get(`${BaseUrl}/course-category/${id}`).then((res) => {
      setSelectedCourses(res.data.category);
      setLoad(false);
    });
  }, []);

  if (load) {
    return (
      <center>
         {sessionStorage.getItem("token")?<UserNavbar/>:<Navbar />}
        <Box
          sx={{
            marginTop: { xs: "55%", sm: "45%", md: "25%", lg: "20%" },
            marginBottom: "20%",
          }}
        >
          <CircularProgress size={30} />
        </Box>
        <Footer />
      </center>
    );
  }
  return (
    <Box sx={{ overflowX: "hidden" }}>
      {sessionStorage.getItem("token")?<UserNavbar/>:<Navbar />}
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/courses.jpg)",
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
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Overlay with opacity
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
              Our Courses
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
              Discover our expertly crafted courses designed to equip you with
              the skills needed to excel in today's competitive job market.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "10px", color: "#1976D2" }}
          >
            Our Courses
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              margin: "auto",
              fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
            }}
          >
            Explore All Industry-Leading IT & Industrial Automation Courses by
            YANTRAVED and Get Placed! Skill up with new IT & Industrial
            Automation courses training or improve your technical knowledge with
            the best courses. Industry-leading courses developed with expertise
            and experience to help learners stay ahead in technological
            innovation.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {selectedCourses?.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginBottom: "30px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
                onClick={() => handleCardClick(course.category)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  sx={{
                    objectFit: "cover",
                    filter: "brightness(0.85)",
                    transition: "filter 0.4s",
                    "&:hover": {
                      filter: "brightness(1.0)",
                    },
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "#fff",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {course?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "10px", color: "#666" }}
                  >
                    {course?.card_description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CourseList;
