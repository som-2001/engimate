import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

// Sample data for placed students
const placedStudents = [
  {
    name: "Rohit Sharma",
    company: "Wipro",
    position: "Software Engineer",
    testimonial:
      "Google has been a dream company for me, and Yantraved made it possible with excellent guidance and training.",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Aisha Khan",
    company: "Infosys",
    position: "Data Analyst",
    testimonial:
      "The real-world projects and mentorship helped me secure a great position at Microsoft.",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Karthik Verma",
    company: "Anonymous",
    position: "Cloud Engineer",
    testimonial:
      "Yantraved's industry-oriented approach was key to getting placed at Amazon.",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Priya Desai",
    company: "TCS",
    position: "Backend Developer",
    testimonial:
      "I am thankful to the trainers at Yantraved who helped me refine my skills and land this amazing opportunity.",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const PlacedStudentsPage = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
        //   backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "50px 20px",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Our Placed Students
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          sx={{ marginBottom: "40px" }}
        >
          Meet some of the students who have successfully started their careers
          with top companies.
        </Typography>

        <Grid container spacing={4}>
          {placedStudents.map((student, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={student.img}
                      alt={student.name}
                      sx={{ width: 80, height: 80, marginRight: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {student.name}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {student.position}, {student.company}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body1" color="textSecondary">
                    "{student.testimonial}"
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default PlacedStudentsPage;
