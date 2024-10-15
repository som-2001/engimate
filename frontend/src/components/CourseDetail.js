import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoIosCheckmark } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserNavbar from "./userNavbar";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [load, setLoad] = useState(true);

  const [paymentLoad, setPaymentLoad] = useState(false);
  const [profile, setProfile] = useState([]);
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState("Buy Now");
  const id = window.location.href.split("/course-detail/")[1];
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

  const handleVideoPlay = (index) => {
    setActiveVideo(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURl}/course/${id}`).then((res) => {
      setCourse(res.data.course); // Assuming the API returns an array
      console.log(res.data.course);
      setLoad(false);
    });
    axios
      .get(`${process.env.REACT_APP_BASEURl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.user);
        setProfile(res.data.user);
        sessionStorage.setItem("name",res.data.user.name);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "login first or token expired") {
          window.location.href = "/login";
        }
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURl}/mycourses`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const courseIds = res.data.map((data) => data._id);
        setResult(courseIds);
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

  const parseStringToArray = (str) => {
    return str?.split("\n");
  };

  const [activeVideo, setActiveVideo] = useState(0); 

  if (load) {
    return (
      <center>
        {sessionStorage.getItem("token") ? <UserNavbar /> : <Navbar />}
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
  

  const MakePayment = (id) => {
    setPaymentLoad(true);
    axios
      .post(
        `${process.env.REACT_APP_BASEURl}/course/checkout/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const options = {
          key: "rzp_test_xR9MFUWgZJnmPN",
          amount: res.data.order.amount,
          currency: "INR",
          name: "Yantraved",
          description: "Test Transaction",
          image: "https://engimate-pt2s.vercel.app/images/logo.png",
          order_id: res.data.order.id,
          // callback_url:`${BaseUrl}/verifypayment/${res.data.order.id}`,
          handler: function (response) {
            // Extract the fields from the response
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            // Log the response for debugging purposes
            console.log(response);

            // Make sure the token exists and is valid
            const token = sessionStorage.getItem("token");

            // Post to backend with verification data
            axios
              .post(
                `${process.env.REACT_APP_BASEURl}/verifypayment/${id}`, // Sending order.id to verify with the backend
                {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                // Log the response from the server
                if (res.data.message === "Course purchased successfully")
                  navigate(`/paymentSuccess/${res.data.message}`);

                console.log(res.data);
              })
              .catch((error) => {
                // Handle any errors during the Axios request
                console.error("Payment verification error:", error);
                toast.error(error?.response?.data?.message, {
                  autoClose: 3000,
                });
                if (
                  error?.response?.data?.message ===
                  "login first or token expired"
                ) {
                  if (sessionStorage?.getItem("token")) {
                    sessionStorage?.removeItem("token");
                  }
                  navigate("/login");
                }
              });
          },
          prefill: {
            name: profile?.name,
            email: profile?.email,
            contact: profile?.phone_number,
          },
          notes: {
            address: "India",
          },
          theme: {
            color: "#3399cc",
          },
        };

        setPaymentLoad(false);
        setStatus("Continue");
        var rzp1 = new window.Razorpay(options);
        document.getElementById("rzp-button1").onclick = function (e) {
          rzp1.open();
        };
      })
      .catch((error) => {
        setPaymentLoad(false);
        console.log(error);

        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {sessionStorage.getItem("token") ? <UserNavbar /> : <Navbar />}
      {/* Hero Section */}
      <ToastContainer />
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
              {course?.caption}
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
              {activeVideo === 0 ? (
                          // YouTube Video Embed without autoplay
                          <iframe
                            width="100%"
                            height="250"
                            src={`https://www.youtube.com/embed/${extractVideoId(course?.display_video_url)}`}
                            title={course?._id}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          // YouTube Thumbnail with Play Button
                          <>
                            <img
                              src={`https://img.youtube.com/vi/${extractVideoId(course?.display_video_url)}/hqdefault.jpg`}
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
                              onClick={() => handleVideoPlay(0)} // Play video on click
                            >
                              <PlayCircleOutlineIcon
                                sx={{ fontSize: "2.5rem" }}
                              />
                            </IconButton>
                          </>
                        )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "start",
                  marginTop: "20px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    color: "grey",
                    marginRight: "8px",
                    marginTop:"2px"
                  }}
                >
                  ₹{Math.floor(2.2*course?.price)}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "black", fontSize: "1.2rem" }}
                >
                  ₹{course?.price}
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
                {/* <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#0d47a1",
                    color: "#fff",
                    width: "95%",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "#08306b",
                    },
                    marginBottom: "5px",
                  }}
                >
                  Add to Cart
                </Button> */}
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={paymentLoad || result?.includes(course?._id)}
                  sx={{
                    backgroundColor: "#0d47a1", // Matching button color with main heading
                    color: "#fff",
                    width: "95%",
                    padding: "10px 24px",
                    fontSize: "1rem",
                    textTransform: "none",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "#08306b", // Darker shade on hover
                    },
                    marginBottom: "5px",
                  }}
                  onClick={(e) => MakePayment(course?._id)}
                  id="rzp-button1"
                >
                  {paymentLoad ? <CircularProgress size={30} /> : status}
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
              color: "#1976D2",
            }}
          >
            What You'll Learn
          </Typography>
          {course?.learn && (
            <Grid container spacing={4}>
              {parseStringToArray(course.learn).map((item, index) => (
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
            </Grid>
          )}
        </Box>

        <Divider />

        {/* Course Description Section */}
        <Box sx={{ padding: "5%" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "5%", color: "#1976D2" }}
          >
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {course?.course_description}
          </Typography>

          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "5%", color: "#1976D2" }}
          >
            Objective
          </Typography>
          <Typography variant="body1" paragraph>
            {course?.course_objective}
          </Typography>

          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "5%", color: "#1976D2" }}
          >
            Roles in Industry
          </Typography>
          <ul>
            {parseStringToArray(course?.roles_in_industry)?.map(
              (role, index) => (
                <li key={index}>{role}</li>
              )
            )}
          </ul>

          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "5%", color: "#1976D2" }}
          >
            Course Highlights
          </Typography>
          <ul>
            {parseStringToArray(course?.course_highlights)?.map(
              (highlight, index) => (
                <li key={index}>{highlight}</li>
              )
            )}
          </ul>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default CourseDetail;
