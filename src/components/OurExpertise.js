import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Container, Box } from "@mui/material";

const expertise = [
  {
    image: "industrial_automation.png",
    title: "Industrial Automation",
    abbreviation: "IA",
    description: "Master the latest in automation technologies with courses that cover PLC, SCADA, DCS, HMI, and more.",
  },
  {
    image: "Electrical & Electronics.jpg",
    title: "Electrical & Electronics Engineering",
    abbreviation: "EEE",
    description: "Gain hands-on experience in electrical systems, circuit design, microcontroller, embedded system, power distribution, and safety protocols.",
  },
  {
    image: "mechanical.jpg",
    title: "Mechanical Engineering",
    abbreviation: "ME",
    description: "Explore the fundamentals of mechanical design, CAD/CAM software, thermodynamics, and advanced manufacturing processes.",
  },
  {
    image: "civil.jpg",
    title: "Civil Engineering",
    abbreviation: "CE",
    description: "Learn the essentials of structural analysis, construction management, and sustainable building practices.",
  },
  {
    image: "cse.jpg",
    title: "IT and Software Development",
    abbreviation: "ITSD",
    description: "Equip yourself with the skills needed in today’s tech-driven world, including programming languages, software development, and IT infrastructure management.",
  },
];

export const OurExpertise = () => {
 

  return (
    <Box>
     
      <Container sx={{ padding: "9px" }}>
        
        {/* Expertise Cards Section */}
        <Grid container spacing={4}>
          {expertise.map((course, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card
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
                  height="240"
                  image={`../images/${course.image}`}
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
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: "#333" }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
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
