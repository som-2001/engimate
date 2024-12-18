import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";
import Footer from "../components/Footer";
import { ArrowRightAlt } from "@mui/icons-material";
import axios from "axios";
import UserNavbar from "./userNavbar";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // Import advancedFormat for ordinal dates
dayjs.extend(advancedFormat);


export const AllCourses = () => {
  const handleViewCourses = (id) => {
    window.location.href = `/courses/${id}`;
  };

  const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadCategory, setLoadCategory] = useState(true);

  useEffect(() => {
    try {
      axios.get(`${process.env.REACT_APP_BASEURl}/categories/all`).then((res) => {
        setLoadCategory(false);
        setCategories(res.data.categories);
      });
    } catch (error) {
      console.error("Error fetching categories", error);
      if (error?.response?.data?.message === "login first or token expired") {
        if (sessionStorage?.getItem("token")) {
          sessionStorage?.removeItem("token");
        }
        navigate("/login");
      }
    }
  }, [navigate]);

  if (loadCategory) {
    return (
      <center style={{ overflowX: "hidden" }}>
        <UserNavbar />
        <Box
          sx={{
           
            marginBottom: "20%",
          }}
        >
          <Box
            sx={{
              width: "100vw",
              textAlign: "center",
              backgroundImage: "url(./images/courses.jpg)",
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
                  Our Domains
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
                  Discover our expertly crafted domains designed to equip you
                  with the skills needed to excel in today's competitive job
                  market.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
            </Grid>
          </Box>
          <Container sx={{ padding: "9px" }}>
            <Box mb={4}>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{
                  marginTop: "20px",
                  fontWeight: "600",
                  fontSize: {
                    lg: "1.8em",
                    xs: "1.25rem",
                    sm: "1.5rem",
                    md: "1.8rem",
                    color: "#1976D2",
                  },
                }}
              >
                Explore All Industry-Leading IT & Industrial Automation Courses
                by YANTRAVED and Get Placed!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  padding: "10px",
                  fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
                }}
                align="center"
                paragraph
              >
                Skill up with new IT & Industrial Automation courses training or
                improve your technical knowledge with the best courses offered
                by YANTRAVED. Industry-leading courses developed with expertise
                and experience to help learners stay ahead in technological
                innovation.
              </Typography>
              <Typography
                variant="h6"
                align="center"
                paragraph
                sx={{ fontWeight: "600", color: "#1976D2" }}
              >
                Explore our wide range of IT & Industrial Automation courses
                today and get placed!
              </Typography>
            </Box>
          </Container>
          <CircularProgress size={30} sx={{marginTop:"10%"}}/>
        </Box>
        <Footer />
      </center>
    );
  }
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <UserNavbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(./images/courses.jpg)",
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
              Our Domains
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
              Discover our expertly crafted domains designed to equip you with
              the skills needed to excel in today's competitive job market.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Container sx={{ padding: "9px" }}>
        <Box mb={4}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              marginTop: "20px",
              fontWeight: "600",
              fontSize: {
                lg: "1.8em",
                xs: "1.25rem",
                sm: "1.5rem",
                md: "1.8rem",
                color: "#1976D2",
              },
            }}
          >
            Explore All Industry-Leading IT & Industrial Automation Courses by
            YANTRAVED and Get Placed!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              padding: "10px",
              fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
            }}
            align="center"
            paragraph
          >
            Skill up with new IT & Industrial Automation courses training or
            improve your technical knowledge with the best courses offered by
            YANTRAVED. Industry-leading courses developed with expertise and
            experience to help learners stay ahead in technological innovation.
          </Typography>
          <Typography
            variant="h6"
            align="center"
            paragraph
            sx={{ fontWeight: "600", color: "#1976D2" }}
          >
            Explore our wide range of IT & Industrial Automation courses today
            and get placed!
          </Typography>
        </Box>

        {/* Course Cards Section */}
        <Grid container spacing={4} justifyContent="center">
          {categories.length===0 ? <center><p style={{padding:"20px",marginTop:"10%",marginBottom:"10%",fontWeight:"600",fontSize:"1.5rem",textAlign:"center"}}>Domains will be added soon.</p></center>:categories.map((course, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card
                sx={{
                  boxShadow: 5,
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "auto",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                  marginBottom: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={`${course.image}`}
                  alt={course.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    height: "140px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {course?.category_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginTop="20px"
                  >
                    {course.description.length > 100
                        ? `${course.description.slice(0, 100)}...`
                        : course.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Posted At: {dayjs(course.createdAt).format('Do MMM YYYY')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="standard"
                    sx={{
                      backgroundColor: "#0d47a1",
                      color: "#fff",
                      width: "95%",
                      padding: "5px 24px",
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: "50px",
                      "&:hover": {
                        backgroundColor: "#08306b",
                      },
                      marginBottom: "5px",
                    }}
                    onClick={() => handleViewCourses(course?._id)}
                  >
                    View Courses <ArrowRightAlt />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};
