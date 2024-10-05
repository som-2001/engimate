import { Box, Typography, Button } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const PaymentSuccess = () => {

  
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Navbar />
    
      <Box
        sx={{
          textAlign: "center",
          padding: { xs: "30px 20px", md: "60px 40px" },
        }}
      >
        <CheckCircleIcon sx={{ fontSize: "9rem", color: "green" }} />
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.4rem" },
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {sessionStorage.getItem("payment_status")}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            marginTop: "10px",
            color: "gray",
          }}
        >
         Thank you for your payment.<br/>Your transaction was successful, and your payment has been processed.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0d47a1",
            color: "#fff",
            width: {xs:"80%",lg:"20%",sm:"40%",md:"40%"},
            padding: "10px 24px",
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#08306b",
            },
            marginTop:"40px",
            marginBottom: "20px",
          }}
        >
          Go to Dashboard
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};
