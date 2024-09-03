import { Box, Button, CardMedia, Grid2, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import "../App.css";
import Footer from "../components/Footer";
import WhyUs from "../components/WhyUs";
import { OurExpertise } from "../components/OurExpertise";

export const Home = () => {
  const item = [
    {
      image: "MERN.jpg",
      title: "MERN Stack Development Course",
      text:
        "Engimate offers best UI/UX Design full course in Bihar.Learn about course...",
    },
    {
      image: "ui.jpg",
      title: "UI/UX Design Full Course",
      text:
        "Engimate offers best UI/UX Design full course in Bihar.Learn from the leading industry about this full course...",
    },
    {
      image: "Reactjs.jpg",
      title: "Reactjs Full Course",
      text:
        "Engimate offers best Reactjs full course in Bihar.Learn from the leading industry about this full course...",
    },
    {
      image: "plc.jpg",
      title: "PLC Full Course",
      text:
        "Engimate offers best PLC full course in Bihar.Learn from the leading industry about this full course...",
    },
  ];

  const item1 = [
    {
      image: "training1.jpg",
      title: "Job Oriented Training",
      Description:
        "Get yourself enrolled in a job-oriented course at Engimate. Gain first-hand experience of working on real-time projects",
    },
    {
      image: "training2.jpg",
      title: "Pre-Placement Training",
      Description:
        "You need to develop specific skills along with software training to get placed during the placement drive on your campus.",
    },
    {
      image: "training3.jpg",
      title: "Industrial Automation Training",
      Description:
        "We believe that professional training leads to a better future for our students. Our Industrial Training prepares you for the complex challenges you will face in this",
    },
  ];
  return (
    <Box>
      <Navbar />
      <Box style={{ width: "100vw" }}>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "17px" }}
        >
          <Grid2 item xs={12} sm={12} lg={6} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "2.5rem",
                fontWeight: "600",
                lineHeight: "110%",
                overflow: "hidden",
                marginTop: "30px",
              }}
            >
              Welcome to Engimate!
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { lg: "1.1rem", xs: "0.9rem" },
                marginTop: "20px",
                wordBreak: "break-word",
                letterSpacing: { lg: "1px", xs: "0px" },
                lineHeight: "25px",
              }}
            >
              Empowering the Future with Expertise in Industrial Automation and
              Engineering At Engimate,
              <br /> we are dedicated to bridging the gap between industry needs
              and skilled professionals.
              <br /> With a focus on IT, Industrial Automation, Electrical,
              Mechanical, and Civil Engineering,
              <br /> we offer specialized training courses designed to prepare
              you for the challenges of tomorrow.
            </Typography>
          </Grid2>
          <Grid2 item xs={12} sm={12} lg={6} md={6}>
            <CardMedia
              component="img"
              image="./images/intro_pic.png"
              sx={{
                width: { lg: "500px", xs: "260px" },
                borderRadius: "1px",
                marginTop: "20px",
              }}
            />
          </Grid2>
        </Grid2>
      </Box>
      <Box style={{ width: "100vw", marginTop: "50px" }}>
        <h1
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px" }}
        >
          Our Popular courses
        </h1>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            padding: "10px",
            fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
          }}
        >
          Our job-oriented IT courses are designed for developing an excellent
          path for the students.
          <br /> Engimate offers Complete Placement Assistance on these popular
          courses. Check it out!
        </Typography>

        <Grid2
          container
          sx={{ padding: "20px", justifyContent: "center" }}
          spacing={3}
        >
          {item.map((data, index) => (
            <Grid2 item lg={3} md={4} sm={12} xs={12}>
              <CourseCard
                image={data.image}
                title={data.title}
                text={data.text}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Box sx={{ width: "100vw", marginTop: "50px" }}>
        <h1
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px" }}
        >
          Our Featured Training
        </h1>

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            padding: "10px",
            fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
          }}
        >
          Being the best software training institute, we offer excellent
          training programs to our candidates.
          <br /> Preparing them for bright career opportunities, we equip them
          with the right skills and proper training.
        </Typography>

        <Grid2
          container
          sx={{ padding: "20px", justifyContent: "center" }}
          spacing={3}
        >
          {item1.map((data, index) => (
            <Grid2 item lg={3} md={4} sm={12} xs={12}>
              <CourseCard
                image={data.image}
                title={data.title}
                text={data.Description}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Box sx={{ width: "100vw", marginTop: "50px" }}>
        <h1
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px" }}
        >
          Our Expertise
        </h1>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            padding: "10px",
            fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
            marginBottom:"40px"
          }}
        >
          we pride ourselves on offering cutting-edge courses across a diverse range of industries to meet the evolving demands of today’s job market.<br/> Our expertise spans several critical fields, providing you with the knowledge and skills needed to excel in your chosen career path.
        </Typography>
        <OurExpertise />
      </Box>

      <Box sx={{ width: "100vw", marginTop: "50px" }}>
        <h1
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px" }}
        >
          Why Choose us
        </h1>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            padding: "10px",
            fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
            marginBottom: "40px",
          }}
        >
          If you dream of having a great career with a good salary, then
          Engimate,
          <br /> the best software training institute is your stop. Enrol on our
          professional IT courses and get trained by the industry experts.
        </Typography>
        <WhyUs />
      </Box>

      <Box
        sx={{
          // backgroundColor: "#f0f4f8", // Light background color
          padding: { xs: "20px", sm: "40px", md: "60px" },
          textAlign: "center",
          borderRadius: "12px",

          // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow
          maxWidth: "800px", // Set a maximum width for larger screens
          margin: "auto", // Center the box
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#0d47a1", // Dark blue color for the main heading
            marginBottom: "16px",
            fontSize: "2.5rem",
            marginTop: "60px",
          }}
        >
          Join Us Today!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#37474f", // Darker gray for subtext
            marginBottom: "16px",
            fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
          }}
        >
          Whether you are a fresh graduate looking to jumpstart your career or a
          professional seeking to upgrade your skills, Engimate is your partner
          in success.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#546e7a", // Grayish blue for additional text
            marginBottom: "24px",
            fontSize: { lg: "1.1rem", xs: "0.9rem", md: "0.7rem" },
          }}
        >
          Explore our courses, get in touch with our team, and take the first
          step towards a brighter future.
        </Typography>
        <Button
          variant="contained"
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
          onClick={(e) => (window.location.href = "/our-courses")}
        >
          Explore Courses
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};
