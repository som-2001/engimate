import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Skeleton,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [result, setResult] = useState([]);
  const [load, setLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
      .get(`${process.env.REACT_APP_BASEURl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfile(res.data.user);
        sessionStorage.setItem("name", res.data.user.name);
      })
      .catch((error) => {
        if (error?.response?.data?.message === "login first or token expired") {
          window.location.href = "/login";
        }
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURl}/exam/getcertificate/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setResult(res.data.certificates);
        setLoad(false);
      })
      .catch((error) => {
        if (error?.response?.data?.message === "login first or token expired") {
          window.location.href = "/login";
          setLoad(false);
        }
      });
  }, [navigate]);

  const Logout = () => {
    toast.success("Logging out", { autoClose: 3000 });
    window.location.href = "/";
    if (sessionStorage.getItem("token")) sessionStorage.removeItem("token");
  };

  // Function to handle PDF download
  const handleDownloadPdf = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURl}/exam/getcertificate/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const certificateData = response.data.certificate;
      const { title } = certificateData.exam;
      const course = certificateData.course;
      const certificateId = certificateData.certificate_id;

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [600, 400],
      });

      // Add border
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1.5);
      doc.rect(10, 10, 580, 380);

      // Add company logo at the top center
      const logoUrl = "https://engimate-pt2s.vercel.app/images/logo.png"; // Replace with actual logo URL or base64 string
      const imgWidth = 180;
      const imgHeight = 80;
      doc.addImage(logoUrl, "PNG", 260, 20, imgWidth, imgHeight);

      // Certificate title
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.text("Certificate of Achievement", 300, 120, { align: "center" });

      // Subtitle text
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(
        `This certifies that ${profile.name} has successfully completed the course in`,
        300,
        150,
        { align: "center" }
      );

      // Course title (Dynamic field)
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(`${course}`, 300, 170, { align: "center" });

      // Static congratulatory message
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text(
        "Awarded this day with distinction for demonstrated skills and accomplishments.",
        300,
        270,
        { align: "center" }
      );

      // Certificate ID (Dynamic field)
      doc.setFontSize(10);
      doc.text(`Certificate ID: ${certificateId}`, 300, 300, {
        align: "center",
      });

      // Authorized Signature section
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      doc.text("Authorized Signature", 490, 350);

      // Draw line for signature
      doc.line(420, 340, 570, 340);

      // Company footer
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Lyss.in | +91 7905682392 | www.lyss.in", 300, 380, {
        align: "center",
      });

      // Save the PDF
      doc.save(`${title}_certificate.pdf`);
    } catch (error) {
      console.error("Failed to download certificate", error);
      toast.error("Failed to download certificate");
    }
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <UserNavbar />
      <ToastContainer />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/profile.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
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
              Hello, {profile.name}
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
              Your personal hub for all your personal details, settings, and
              updates.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          minHeight: "80vh",
        }}
      >
        <Box
          sx={{
            boxShadow: { xs: 0, lg: 2, md: 2, sm: 2 },
            p: 4,
            maxWidth: "800px",
            width: "100%",
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: {
              lg: "whitesmoke",
              md: "whitesmoke",
              xs: "transparent",
              sm: "whitesmoke",
            },
          }}
        >
          <Avatar
            src={profile?.profileImage || "/default-avatar.png"}
            alt="Profile Image"
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />

          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {profile?.name || <Skeleton animation={"wave"} />}
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Total points earned:{" "}
            {profile?.points ?? <Skeleton animation={"wave"} />}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
            {profile?.email || <Skeleton animation={"wave"} />}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} sm={6}>
              <Typography variant="body2" fontWeight="bold">
                Phone Number
              </Typography>
              <Typography variant="body1">
                {profile?.phone_number || <Skeleton animation={"wave"} />}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography variant="body2" fontWeight="bold">
                Course Enrolled
              </Typography>
              <Typography variant="body1">
                {profile?.course_enrolled || <Skeleton animation={"wave"} />}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} margin="15px">
              <Typography variant="body2" fontWeight="bold">
                Specialization
              </Typography>
              <Typography variant="body1">
                {profile?.specialization || <Skeleton animation={"wave"} />}
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                backgroundColor: "#0d47a1",
                color: "#fff",
                width: { xs: "50%", sm: "auto" },
                border: "none",
                "&:hover": {
                  backgroundColor: "#0a5dd7",
                },
              }}
              onClick={Logout}
            >
              Logout
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 4, width: "100%" }}>
          <Typography variant="h5" fontWeight="bold" align="center" sx={{ mb: 2,mt:2 }}>
            Your Certificates
          </Typography>
          <Grid container spacing={2}>
            {load ? (
             <Box sx={{padding:"40px"}}><center><CircularProgress size={35} /></center> </Box>
            ) : result.length === 0 ? (
              <p>No Certificates.</p>
            ) : (
              result?.map((certificate) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={certificate._id} marginTop={"50px"}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {certificate?.exam?.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {certificate?.course}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleDownloadPdf(certificate._id)}
                      >
                        Download
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
