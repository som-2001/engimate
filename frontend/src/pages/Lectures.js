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
import { useEffect, useState } from "react";
import { BaseUrl } from "../components/BaseUrl";
import axios from "axios";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useParams } from "react-router-dom";

export const Lectures = () => {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loadLecture, setLoadLecture] = useState(true);

  const [activeVideo, setActiveVideo] = useState(null); // Track which video is being played

  const handleVideoPlay = (index) => {
    setActiveVideo(index); // Set the clicked video index as active
  };
  // Fe

  const extractVideoId = (url) => {
    const videoid = url.split("v=")[1];
    return videoid;
  };

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
      <center>
        <UserNavbar />
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
    <Box sx={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <UserNavbar />

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

        <Box>
          <Grid container spacing={2}>
            {lectures?.map((data, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
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
