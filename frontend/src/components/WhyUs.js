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
    "industry_oriented_courses.jpg",
    "experts.jpg",
    "training4.jpg",
    "project.jpg",
    "placement.jpg",
  ];

  const Cards = ["Industry-Aligned Curriculum", "Experienced Instructors", "Hands-On Training", " Flexible Learning Options", "Career Support"];

  const Tagline = [
    'Our courses are designed in collaboration with industry experts to ensure relevance and practical applicability.',
    'Learn from seasoned professionals with years of experience in their respective fields.',
    "Our approach emphasizes practical knowledge with real-world projects and lab work.",
    'We offer both in-person and online courses to fit your schedule and learning style.',
    'We provide job placement assistance, helping you transition from learning to earning with confidence.'
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
