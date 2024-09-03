import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Styled components




const ContentSection = styled(Box)({
  padding: "2rem 1rem",
});

const About = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage:
            "url(./images/about-us.png)",
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
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Overlay with opacity
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
              About Us
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
             Building Tomorrow’s Experts, Today 

            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Container>
        <ContentSection>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Who We Are
          </Typography>
          <Typography variant="body1" paragraph>
            Founded on the principles of excellence and innovation, Engimate has
            become a trusted name in professional training and development. We
            understand that the rapidly evolving technological landscape
            requires a new breed of professionals—individuals who are not just
            knowledgeable, but also adaptable, innovative, and ready to face
            real-world challenges.
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            What We Offer
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Comprehensive Courses:</strong> Our curriculum spans across
            critical industries, offering specialized courses in Industrial
            Automation, Electrical, Mechanical, and Civil Engineering, as well
            as IT and Software Development. Whether you're interested in
            mastering the intricacies of automation systems, designing
            sustainable infrastructure, or developing cutting-edge software, we
            have a course tailored for you.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Expert Instructors & Trainers:</strong> Our team of
            instructor/trainers brings years of industry experience and academic
            knowledge, ensuring that you receive not just theoretical
            understanding, but also practical insights and hands-on training.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Flexible Learning Options:</strong> We offer a variety of
            learning formats to accommodate your schedule and preferences,
            including online and hybrid courses.
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            To be a leading provider of professional education and training,
            producing industry-ready professionals who are equipped to
            contribute meaningfully to their fields and drive innovation.
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            To deliver high-quality, relevant, and accessible education that
            empowers individuals to achieve their career goals, meet industry
            demands, and lead in their respective fields.
          </Typography>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Why Choose Engimate?
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Industry-Relevant Skills:</strong> Our programs are designed
            to ensure that you are learning the most current and applicable
            skills in your field.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Career-Focused Education:</strong> We aim to make you
            job-ready, with a curriculum that includes not just theoretical
            knowledge but also practical, hands-on experience.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Supportive Community:</strong> At Engimate, you are part of
            a community of learners and professionals dedicated to growth and
            success. We offer ongoing support, from enrollment to job placement.
          </Typography>

          <Box textAlign="center" mt={4}>
            <Typography variant="h6" marginBottom="5%" marginTop="10%" sx={{  fontSize: { lg: "1.1rem", xs: "1.0rem", md: "0.7rem" },}}>At Engimate, we believe that the right education can transform
            lives. To enhance your skills, advance your career,<br/> and contribute
            to the technology and engineering advancements of the future.</Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/contact-us")}
              sx={{
                backgroundColor: "#0d47a1", // Matching button color with main heading
                color: "#fff",
                padding: "10px 24px",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#08306b", // Darker shade on hover
                },
              }}
            >
              Join Us on the Path to Success
            </Button>
          </Box>
        </ContentSection>
      </Container>
      <Footer />
    </Box>
  );
};

export default About;
