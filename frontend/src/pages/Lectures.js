import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export const Lectures = () => {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [heading, setHeading] = useState("Lectures");
  const [lectures, setLectures] = useState([]);
  const [loadLecture, setLoadLecture] = useState(true);
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState(null); // Track which video is being played

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setHeading("Lectures");
        break;
      case 1:
        setHeading("Pdfs");
        break;
      case 2:
        setHeading("Dpps");
        break;
      default:
        setHeading("Exam");
        break;
    }
  };

  const handleVideoPlay = (index) => {
    setActiveVideo(index); // Set the clicked video index as active
  };

  const extractVideoId = (url) => {
    const videoId = url?.split("v=")[1];
    return videoId;
  };

  useEffect(() => {
    const token = sessionStorage?.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
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
              {heading}
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
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            marginBottom: "40px",
            borderRadius: "30px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={{
              minHeight: "auto", // to reduce the default height of tabs
            }}
          >
            <Tab
              label="Lectures"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem" }, // responsive font size
                minWidth: { xs: 60, sm: 80 }, // adjust width for smaller screens
                padding: { xs: "6px 12px", sm: "10px 20px" }, // responsive padding
              }}
            />
            <Tab
              label="Pdfs"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem" },
                minWidth: { xs: 60, sm: 80 },
                padding: { xs: "6px 12px", sm: "10px 20px" },
              }}
            />
            <Tab
              label="Dpps"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem" },
                minWidth: { xs: 60, sm: 80 },
                padding: { xs: "6px 12px", sm: "10px 20px" },
              }}
            />
            <Tab
              label="Exam"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem" },
                minWidth: { xs: 60, sm: 80 },
                padding: { xs: "6px 12px", sm: "10px 20px" },
              }}
            />
          </Tabs>
        </Box>

        <Box>
          {value === 0 &&
            (loadLecture ? (
              <Box sx={{ textAlign: "center", marginTop: "20vh" }}>
                <CircularProgress size={40} />
              </Box>
            ) : (
              <Grid container spacing={2} justifyContent="center">
                {lectures?.length === 0 ? (
                  <Typography variant="body1" marginTop="10%" marginBottom="5%">
                    Lectures will be displayed here.
                  </Typography>
                ) : (
                  lectures?.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          boxShadow: 5,
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: "auto",
                          position: "relative",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "10px 10px 30px rgba(0,0,0,0.3)",
                          },
                        }}
                      >
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
                                top: "40%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                color: "red",
                                
                              }}
                              onClick={() => handleVideoPlay(index)} // Play video on click
                            >
                              <PlayCircleOutlineIcon sx={{fontSize:"2.5rem"}} />
                            </IconButton>
                          </>
                        )}
                        <CardContent sx={{ padding: "16px" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: "12px" }}
                          >
                            {data.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {data.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            ))}
          {value === 1 && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              Pdf content will be displayed here.
            </Typography>
          )}

          {value === 2 && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              Dpp content will be displayed here.
            </Typography>
          )}

          {value === 3 && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginTop: "2rem" }}
            >
              Exam content will be displayed here.
            </Typography>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};
