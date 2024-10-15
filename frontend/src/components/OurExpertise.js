import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Container, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const OurExpertise = () => {
 
  const handleViewCourses = (id) => {
    window.location.href=`/courses/${id}`;
  };

  const navigate=useNavigate();
  const [categories,setCategories]=useState([]);
  const [loadCategory,setLoadCategory]=useState(true);

  useEffect(()=>{
    try {
      axios.get(`${process.env.REACT_APP_BASEURl}/categories/all`).then((res) => {
        setLoadCategory(false);
        setCategories(res.data.categories);
      });
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  },[navigate]);

  if (loadCategory) {
    return (
      <center>
        <Box sx={{ marginTop: { xs: "55%", sm: "45%", md: "25%", lg: "20%" },marginBottom:"20%" }}>
          <CircularProgress size={30} />
        </Box>
       
      </center>
    );
  }


  return (
    <Box>
     
      <Container sx={{ padding: "9px" }}>
        
        {/* Expertise Cards Section */}
        <Grid container spacing={4} justifyContent="center">
          {categories.length===0 ? <center><p style={{padding:"40px",marginTop:"10%",marginBottom:"10%",fontWeight:"600",fontSize:"1.5rem"}}>Expertise will be added soon.</p></center>:categories.map((course, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card
              onClick={(e)=>handleViewCourses(course?._id)}
                sx={{
                  boxShadow: 5,
                  borderRadius: "16px",
                  overflow: "hidden",
                  height: "auto",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                  marginBottom: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={`${course.image}`}
                  alt={course.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "#f5f5f5",
                    height: "170px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
                    {course.category_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" marginTop="10px">
                  {course.description.length > 150
                        ? `${course.description.slice(0, 150)}...`
                        : course.description}
                  </Typography>
                 
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
    </Box>
  );
};
