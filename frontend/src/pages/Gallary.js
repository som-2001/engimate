import { Box,Divider, Grid, Typography } from "@mui/material";
import  Navbar  from "../components/Navbar";
import Footer from "../components/Footer";

export const Gallary = () => {



    const images = [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ];
  return (
    <Box
      sx={{
        overflowX: "hidden",
        backgroundColor: "whitesmoke",
        color: "#113",
        fontFamily: "math",
      }}
    >
    
      <Navbar />
      
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage:
            "url(../images/gallary.jpg)",
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
                color:"white"
              }}
            >
              Gallary
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
                color:"white"
              }}
            >
              You'll find a collection of images that showcase
              our innovative cutting-edge technology, and vibrant work environment.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Box sx={{marginTop:"20px",overflow:"hidden"}}>
        <p style={{marginTop:"-0%",textAlign:"center",fontSize:"2.5rem",fontWeight:"600"}} id="text001" className="header">Showroom</p>
        <center>
          <Divider
            style={{
              padding: "0.5px",
              backgroundColor: "rgb(79 79 138)",
              width: "80px",
              marginTop: "-29px",
              marginBottom: "40px",
            }}
          />
        </center>
        <p style={{textAlign:"center",fontSize:"1.2rem",fontWeight:"600",marginBottom:"2%"}} id="text001">A Visual Journey Through Our World.</p>
      </Box>

      <Box  id="text001">
      <Grid container spacing={2}  sx={{padding:"20px"}} textAlign={"center"}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Box
              component="img"
              src={image}
              alt={`Gallery Image ${index + 1}`}
              sx={{
                width: {lg:"80%",md:"80%",xs:"95%",sm:"95%"},
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Grid>
        ))}
      </Grid>
      </Box>
      <Footer/>
    </Box>
  );
};
