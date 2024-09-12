import {
    Box,
    Button,
    CardMedia,
    Grid,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  import { CgProfile } from "react-icons/cg";
  

import { useNavigate } from "react-router-dom";

  
  export const Login = () => {
    
    const navigate=useNavigate();
    // const navigate=useNavigate();
  
    // const onSubmit = () => {
    //   axios
    //     .post("/login", {
    //       email: email,
    //       password: password,
    //     })
    //     .then((res) => {
    //       sessionStorage.setItem("accesstoken", res.token.accesstoken);
    //       sessionStorage.setItem("refreshtoken", res.token.refreshtoken);
  
    //       if (res.token.role === "Employee") {
    //         navigate("/dashboard-employee");
    //       } else if (res.token.role === "Intern") {
    //         navigate("/dashboard-intern");
    //       }
    //     });
    // };
  
    return (
      <Box sx={{ backgroundColor: "white" }}>
        <Navbar />
        <Box>
          <Grid
            container
            spacing={4}
            sx={{ height: "100vh", alignItems: "center", px: { xs: 2, sm: 3, md: 4 } }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <img
                src="https://blog.ahgora.com/wp-content/uploads/2020/04/Como-fazer-a-gestao-do-trabalho-home-office-de-um-modo-eficaz.jpg"
                alt="Registration"
                style={{ width: "100%", height: "100%", objectFit: "cover",marginTop:"10%" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: { xs: -5, sm: 3, md: 5 },
                  px: { xs: 2, sm: 4, md: 6 },
                }}
              >
                <CardMedia
                  component="img"
                  src="../images/logo.png"
                  alt="Logo"
                  sx={{
                    width: { xs: "60%", sm: "50%", md: "45%",lg:"45%" },
                    height: "auto",
                    marginBottom: "20px",
                    mt: { xs: "5%", md: "0%" },
                  }}
                />
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mb: 1, fontSize: { xs: "1.5rem", md: "1.8rem" } }}
                  id="hero1"
                  className="header"
                >
                  Welcome Back!
                </Typography>
                <Typography
                  id="hero2"
                  variant="body1"
                  sx={{ fontWeight: "600" }}
                  className="header"
                  align="center"
                >
                  An Online Learning Platform
                </Typography>
                <Box
                  sx={{
                    width: { xs: "100%", sm: "80%", md: "70%" },
                    mt: 4,
                  }}
                >
                  <Box
                    sx={{ mb: 2 }}
                    
                  >
                    <TextField
                      type="text"
                      
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CgProfile />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Email..."
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
  
                  

                  <Box sx={{ mb: 2 }} id="hero4">
                    <Typography variant="body1" textAlign="center" fontSize="0.9rem">New to Engimate? <span onClick={(e)=>navigate('/register')} style={{cursor:"pointer",textDecoration:"underline" }}>Register now.</span></Typography>
                  </Box>
                  <center>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#0d47a1", // Matching button color with main heading
                        color: "#fff",
                        width:"60%",
                        padding: "10px 24px",
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#08306b", // Darker shade on hover
                        },
                        marginBottom:"30px"
                      }}
                    >
                      Send OTP
                    </Button>
                  </center>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Footer />
      </Box>
    );
  };
  