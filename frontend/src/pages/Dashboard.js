import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box>
        <center>
            <img src="../images/logo.png" alt="" style={{width:"300px",marginTop:"5%"}}/>
            <h1 style={{marginBottom:"10%"}}>YANTRAVED Dashboard!</h1></center>
      </Box>
      <Footer />
    </Box>
  );
};
