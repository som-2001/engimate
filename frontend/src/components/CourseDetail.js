import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoIosCheckmark } from "react-icons/io";

const CourseDetail = () => {
  const location = useLocation();

  const { course } = location.state || {}; // Access the passed course details

  useEffect(()=>{

    window.scrollTo(0,0);
  },[]);
  return (
    <Box sx={{overflowX:"hidden"}}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/courses.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "4vh",
          paddingBottom: "4vw",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.4rem",
                  md: "2.6rem",
                  lg: "2.6rem",
                },
                fontWeight: "bold",
                marginBottom: "20px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              }}
            >
              {course?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.2rem",
                  lg: "1.2rem",
                },
                fontWeight: "500",
                maxWidth: "800px",
                margin: "0 auto",
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              {course?.card_description}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: { xs: "20px", lg: "0" },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "50%", md: "50%", lg: "50%" },
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                backgroundColor: "#fff",
                padding: "20px",
              }}
            >
              <video
                controls
                style={{ width: "100%", height: "auto", borderRadius: "15px" }}
              >
                <source src='https://videos.pexels.com/video-files/5147975/5147975-uhd_2732_1440_25fps.mp4' type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    marginTop: "20px",
                    color: "black",
                    marginLeft: "10px",
                    fontSize: "1.2rem",
                  }}
                >
                  ₹:{course?.price}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#0d47a1", // Matching button color with main heading
                    color: "#fff",
                    width:"95%",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "#08306b", // Darker shade on hover
                    },
                    marginBottom:"5px"
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: "95%",borderRadius:"50px",padding: "10px 24px", }}
                  onClick={(e)=>window.location.href="https://lyss.in/payment"}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ padding: "40px 20px 0px 20px" }}>
        {/* What You'll Learn Section */}
        <Box mb={5}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "25px",
              textAlign: "center",
            color: "#1976D2"
            }}
          >
            What You'll Learn
          </Typography>
          {course?.learn?.length>0 && <Grid container spacing={4}>
            {course?.learn?.map((item, index) => (
              <Grid item xs={12} sm={6} md={12} lg={6} key={index}>
                <Typography
                  sx={{
                    fontSize: "1.0rem",
                    color: "#333",
                    backgroundColor: "#f5f5f5",
                    padding: "15px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                 <IoIosCheckmark /> {item}
                </Typography>
              </Grid>
            ))}
          </Grid>}
        </Box>

        <Divider />

        {/* Course Description Section */}
        <Box sx={{padding:"5%"}}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "5%", color: "#1976D2",}}
          >
            Description
          </Typography>
          {course?.course_description?.map((section, index) => (
            <Box key={index} mb={5}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#1976D2",
                }}
              >
                {section?.title}
              </Typography>
              <Typography variant="body1">
                {section?.title === "Roles in Industry" ||
                section?.title === "Course Highlights"
                  ? section?.content?.map((line, index) => (
                      <span key={index}>
                        <li>{line}</li>
                      </span>
                    ))
                  : section?.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default CourseDetail;
