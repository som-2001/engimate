import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
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
  const [loadDpp, setLoadDpp] = useState(true);
  const [loadPdf, setLoadPdf] = useState(true);
  const [dpp, setDpp] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // To handle dialog open/close
  const [selectedDpp, setSelectedDpp] = useState(null);
  const [dppDownload, setDppDownload] = useState("");
  //for pdfs
  const [pdf, setPdf] = useState([]);
  const [openpdfDialog, setOpenpdfDialog] = useState(false); // To handle dialog open/close
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfDownload, setpdfDownload] = useState("");

  // Function to open the dialog and set the selected Dpp data
  const handleCardClick = (data) => {
    setSelectedDpp(data);

    axios
      .get(`${BaseUrl}/dpp/search?title=${data.title}&dpp_id=${data._id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDppDownload(res.data.dpp);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
    setOpenDialog(true);
  };

  const handleCardClick1 = (data) => {
    setSelectedPdf(data);

    axios
      .get(
        `${BaseUrl}/materials/search?title=${data.title}&materials_id=${data._id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setpdfDownload(res.data.materials);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
    setOpenpdfDialog(true);
  };

  const handleCloseDialog1 = () => {
    setOpenpdfDialog(false);
    setSelectedPdf(null);
  };
  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDpp(null);
  };
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
        axios
          .get(`${BaseUrl}/materials/all`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setLoadPdf(false);
            setDpp(res.data.materials);
          })
          .catch((error) => {
            console.error("Error fetching categories", error);
            if (
              error?.response?.data?.message === "login first or token expired"
            ) {
              if (sessionStorage?.getItem("token")) {
                sessionStorage?.removeItem("token");
              }
              navigate("/login");
            }
          });
        break;
      case 2:
        setHeading("Dpps");
        axios
          .get(`${BaseUrl}/dpp/all`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setLoadDpp(false);
            setDpp(res.data.dpp);
          })
          .catch((error) => {
            console.error("Error fetching categories", error);
            if (
              error?.response?.data?.message === "login first or token expired"
            ) {
              if (sessionStorage?.getItem("token")) {
                sessionStorage?.removeItem("token");
              }
              navigate("/login");
            }
          });
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
    let videoId = null;

    if (url?.includes("v=")) {
      // If 'v=' is present, extract the video ID before any other query parameters
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url?.includes("youtube.com/shorts/")) {
      // Handle YouTube Shorts
      videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    } else if (url?.includes("youtu.be/")) {
      // Handle shortened YouTube URLs
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else {
      console.error("Unsupported YouTube URL format");
    }

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
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  }, [navigate, id]);

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
              <Box sx={{ textAlign: "center", marginTop: "8vh" }}>
                <Grid container spacing={4} justifyContent="center">
                  {[...Array(3)].map(
                    (
                      _,
                      index // Show 3 skeletons as placeholders
                    ) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
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
                    )
                  )}
                </Grid>
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
                              <PlayCircleOutlineIcon
                                sx={{ fontSize: "2.5rem" }}
                              />
                            </IconButton>
                          </>
                        )}
                        <CardContent sx={{ padding: "16px", height: "80px" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: "12px" }}
                          >
                            {data.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {data?.description.length > 80
                              ? `${data?.description.slice(0, 80)}...`
                              : data?.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            ))}
          {value === 1 &&
            (loadPdf ? (
              <Box sx={{ textAlign: "center", marginTop: "7vh" }}>
                <Grid container spacing={4} justifyContent="center">
                  {[...Array(3)].map(
                    (
                      _,
                      index // Show 3 skeletons as placeholders
                    ) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
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
                    )
                  )}
                </Grid>
              </Box>
            ) : (
              <Grid container spacing={2} justifyContent="center">
                {pdf?.length === 0 ? (
                  <Typography variant="body1" marginTop="10%" marginBottom="5%">
                    pdf materials will be displayed here.
                  </Typography>
                ) : (
                  pdf?.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          boxShadow: 5,
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: "80px",
                          position: "relative",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "10px 10px 30px rgba(0,0,0,0.3)",
                          },
                        }}
                        onClick={() => handleCardClick1(data)} // Trigger dialog on card click
                      >
                        <CardContent sx={{ padding: "16px", height: "80px" }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", marginBottom: "12px" }}
                          >
                            {data.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            ))}

          {/* Dialog to display the PDF */}
          <Dialog
            open={openpdfDialog}
            onClose={handleCloseDialog1}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedPdf?.title} {/* Display title */}
            </DialogTitle>
            <DialogContent dividers>
              {/* Display PDF in an iframe */}
              <iframe
                src={dppDownload}
                title={selectedPdf?.title}
                width="100%"
                height="500px"
                style={{ border: "none" }}
              />
            </DialogContent>
            <DialogActions>
              {/* Download Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#25D366", // WhatsApp-like color for download button
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#1DA354", // Darker shade on hover
                  },
                }}
                href={dppDownload} // Download URL
                download={selectedPdf?.title} // Name of the file to be downloaded
              >
                Download PDF
              </Button>
              <Button onClick={handleCloseDialog1} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {value === 2 &&
            (loadDpp ? (
              <Box sx={{ textAlign: "center", marginTop: "8vh" }}>
                <Grid container spacing={4} justifyContent="center">
                  {[...Array(3)].map(
                    (
                      _,
                      index // Show 3 skeletons as placeholders
                    ) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
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
                    )
                  )}
                </Grid>
              </Box>
            ) : (
              <Grid container spacing={2} justifyContent="center">
                {dpp?.length === 0 ? (
                  <Typography variant="body1" marginTop="10%" marginBottom="5%">
                    Dpp will be displayed here.
                  </Typography>
                ) : (
                  dpp?.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        sx={{
                          boxShadow: 5,
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: "auto",
                          position: "relative",
                          
                          padding: "16px",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.07)",
                            boxShadow: "15px 15px 40px rgba(0, 0, 0, 0.4)", // Stronger shadow on hover
                          },
                        }}
                        onClick={() => handleCardClick(data)} // Trigger dialog on card click
                      >
                        <CardContent
                          sx={{
                            padding: "12px",
                            height: "auto",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="h6" // Bold and larger title
                            sx={{
                              fontWeight: "600", // Bold font
                              marginBottom: "8px",
                            
                              letterSpacing: "0.5px", // Better letter spacing
                            }}
                          >
                            {data.title}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            ))}

          {/* Dialog to display the PDF */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedDpp?.title} {/* Display title */}
            </DialogTitle>
            <DialogContent dividers>
              {/* Display PDF in an iframe */}
              <iframe
                src={dppDownload}
                title={selectedDpp?.title}
                width="100%"
                height="500px"
                style={{ border: "none" }}
              />
            </DialogContent>
            <DialogActions>
              {/* Download Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#25D366", // WhatsApp-like color for download button
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#1DA354", // Darker shade on hover
                  },
                }}
                href={dppDownload} // Download URL
                download={selectedDpp?.title} // Name of the file to be downloaded
              >
                Download PDF
              </Button>
              <Button onClick={handleCloseDialog} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

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
