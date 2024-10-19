import { Box, Typography, Avatar, Button, Grid, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState({});
  const navigate=useNavigate();

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
  }, []);

  const [openDialog, setOpenDialog] = useState(false); // For the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const Logout=()=>{

    toast.success("Logging out",{autoClose:3000});
    window.location.href='/';
    if(sessionStorage.getItem('token'))
      sessionStorage.removeItem('token');
  
   }

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <UserNavbar />
      <ToastContainer/>
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
             Your personal hub for all your personal details, settings, and updates.
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
            boxShadow:{xs:0,lg:2,md:2,sm:2},
            p: 4,
            maxWidth: "800px",
            width: "100%",
            borderRadius: 2,
            textAlign: "center",
             backgroundColor:{lg:"whitesmoke",md:"whitesmoke",xs:"transparent",sm:"whitesmoke"}
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            src={profile?.profileImage || "/default-avatar.png"}
            alt="Profile Image"
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />

          {/* Profile Information */}
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {profile?.name || <Skeleton animation={"wave"}/>}
          </Typography>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
            Total points earned: {profile?.points ?? <Skeleton animation={"wave"}/>}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "gray" }}>
            {profile?.email || <Skeleton animation={"wave"}/>}
          </Typography>

          {/* Grid for additional information */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} sm={6}>
              <Typography variant="body2" fontWeight="bold">
                Phone Number
              </Typography>
              <Typography variant="body1">
                {profile?.phone_number || <Skeleton animation={"wave"}/>}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Typography variant="body2" fontWeight="bold">
                Course Enrolled
              </Typography>
              <Typography variant="body1">
                {profile?.course_enrolled || <Skeleton animation={"wave"}/>}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="center" >
            <Grid item xs={12} sm={6} margin="15px">
              <Typography variant="body2" fontWeight="bold" >
                Specialization
              </Typography>
              <Typography variant="body1">
                {profile?.specialization || <Skeleton animation={"wave"}/>}
              </Typography>
            </Grid>
            
          </Grid>

          {/* Additional Sections */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {/* Edit Profile Button */}
            {/* <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#0d47a1", // Matching button color with main heading
                color: "#fff",
                width:{lg:"25%",md:"25%",sm:"25%",xs:"95%"},
                padding: "10px 24px",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#08306b", // Darker shade on hover
                },
                
              }}
            //   onClick={() => (window.location.href = "/edit-profile")}
            >
              Edit Profile
            </Button> */}

            {/* Logout Button */}
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                backgroundColor: "#0d47a1", // Matching button color with main heading
                color: "#fff",
                width:{lg:"25%",md:"25%",sm:"25%",xs:"90%"},
                padding: "10px 24px",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#08306b", // Darker shade on hover
                },
                }}
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to Logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                No
              </Button>
              <Button onClick={Logout} color="primary" autoFocus>
                Yes, Logout
              </Button>
            </DialogActions>
          </Dialog>
      </Box>
      <Footer />
    </Box>
  );
};
