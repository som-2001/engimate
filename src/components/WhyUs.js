import React from "react";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const CardContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px', // Adjust the gap between cards
  justifyContent: 'center',
  padding: '16px',
});

const StyledCard = styled(Card)({
  maxWidth: "320px",
  width: "100%",
  height: "auto",
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
  },
});

const WhyUs = () => {
  const images = [
    "training4.jpg",
    "matlab.jpg",
    "experts.jpg",
    "project.jpg",
    "industry_oriented_courses.jpg"
  ];

  const Cards = ["Best Training Institute", "Outstanding Placement Record", "Industry-Experts as Trainers", "Real-Time Projects", "Industry-Oriented Course Modules"];

  const Tagline = [
    'Engimate offers top-notch job-oriented IT courses Bihar. Having the best interest of our students in mind, we offer professional courses, industry experts, the latest infrastructure, and real-time projects for our candidates.',
    'Engimate, the best IT training institute in Bihar, provides Complete Placement Assistance to its candidates. We offer assistance for job placement in our job-oriented courses. Your career is our priority, and we are dedicated to helping you build it.',
    "Engimate, the best software IT training institute in Bihar, provides its students with proper training from industry experts. Having hands-on experience, our industry experts provide you with comprehensive training and prepare you for the competitive market landscape.",
    'Work on real-time projects with our trainers. Our professionals guide you to handle real-time projects. We prepare you for the market, train you to handle the live projects, and understand the pressure. Our trainers are here to help to get prepared for the market.',
    'Our industry-oriented course modules are designed by the professionals of the market. Our software training professionals curate the course modules, according to the current industry trends. We help you to gain an in-depth understanding of the sector.'
  ];

  return (
    <CardContainer>
      {images.map((image, index) => (
        <StyledCard key={index} variant="outlined">
          <Grid container>
            <Grid item xs={12}>
              <CardMedia
                component="img"
                alt={`Card ${index + 1}`}
                image={`./images/${image}`} // Adjust the path if needed
                sx={{
                  objectFit: "cover",
                  height: 200,
                  width: "320px",
                }}
                onError={() =>
                  console.error(`Failed to load image: ${image}`)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                  sx={{ fontSize: "1.4rem" }}
                >
                  {Cards[index]}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "1.0rem", marginTop: "20px" }}
                >
                  {Tagline[index]}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </StyledCard>
      ))}
    </CardContainer>
  );
};

export default WhyUs;
