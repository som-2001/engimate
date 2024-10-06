import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../components/BaseUrl";
import axios from "axios";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Lectures = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loadLecture, setLoadLecture] = useState(true);
  const navigate=useNavigate();
  const [activeVideo, setActiveVideo] = useState(null); // Track which video is being played

  const handleVideoPlay = (index) => {
    setActiveVideo(index); // Set the clicked video index as active
  };
  // Fe

  const extractVideoId = (url) => {
    const videoid = url.split("v=")[1];
    return videoid;
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
    axios
      .get(`${BaseUrl}/lectures/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoadLecture(false);
        setLectures(res.data.lectures);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, [id]);

  if (loadLecture) {
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
            Lectures
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
        Lectures
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

  return (
    <Box sx={{ backgroundColor: "#f0f4f8", minHeight: "100vh",overflowX:"hidden" }}>
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
              Lectures
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
          Lectures
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
        <Box>
          <Grid container spacing={2}>
            {lectures?.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: 5,
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "auto",
                    position: "relative", // Needed for overlay positioning
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  {/* Check if the current video is being played */}
                  {activeVideo === index ? (
                    // YouTube Video Embed without autoplay
                    <iframe
                      width="100%"
                      height="250"
                      src={`https://www.youtube.com/embed/${extractVideoId(data?.video_url)}`}
                      title={data?._id}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // YouTube Thumbnail with Play Button
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${extractVideoId(data?.video_url)}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        width="100%"
                        height="250"
                        style={{ objectFit: "cover" }}
                      />

                      {/* Play Button Overlay */}
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "30%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "red",
                          fontSize: "3.187rem",
                        }}
                        onClick={() => handleVideoPlay(index)} // Play video on click
                      >
                        <PlayCircleOutlineIcon fontSize="large" />
                      </IconButton>
                    </>
                  )}

                  <CardContent
                    sx={{
                      backgroundColor: "#f5f5f5",
                      height: "170px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6">{data?.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
