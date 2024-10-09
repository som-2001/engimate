import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import UserNavbar from "../components/userNavbar";
import Footer from "../components/Footer";
import { BaseUrl } from "../components/BaseUrl";
import axios from "axios";
import FAQReferEarn from "../components/FAQ";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ReferEarn = () => {
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
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

  const wpShareButton = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(referralLink)}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    axios
      .get(`${BaseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setReferralLink(res.data.user.referral_code);
        sessionStorage.setItem("name",res.data.user.name);
      }).catch((error)=>{
        console.log(error);
        if(error?.reponse?.data?.message==='login first or token expired')
        {
          window.location.href='/login';
        }
      })
  }, []);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <UserNavbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/referEarn.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: "4vh",
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
              Refer & Earn
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
              Earn cash upto ₹1000 in your bank account for <b>Every Friend</b>{" "}
              you refer.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Box
        sx={{ maxWidth: "600px", margin: "auto", mt: 5, textAlign: "center" }}
      >
      
        <Typography variant="body1" gutterBottom sx={{padding:2,fontWeight:'600'}}>
          Refer your friends and earn rewards when they sign up and make a
          purchase.
        </Typography>

        <Card  sx={{ p: 2, mt: 4,backgroundColor:"#fdfafa",borderRadius:"15px" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom marginBottom="20px">
              Your Referral Code
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  value={referralLink}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Tooltip title={copied ? "Copied!" : "Copy Link"}>
                  <IconButton color="primary" onClick={handleCopy}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                backgroundColor: "#0d47a1",
                color: "#fff",
                width: { lg: "60%", md: "60%", sm: "60%", xs: "80%" },
                padding: "10px 24px",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#08306b",
                },
                marginTop: "20px",
                marginBottom: "10px",
              }}
              onClick={wpShareButton}
            >
              Share with Friends
            </Button>
          </CardContent>
        </Card>

        {/* <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Referral Progress</Typography>
          <Typography variant="body1">
            Referrals Completed: <strong>3</strong>
          </Typography>
          <Typography variant="body1">
            Rewards Earned: <strong>$50</strong>
          </Typography>
        </Box> */}

       
      </Box>
      <FAQReferEarn />
      <Footer />
    </Box>
  );
};

export default ReferEarn;
