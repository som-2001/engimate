import React from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const courses = {
  CSE: [
    {
      title: "MERN Stack",
      image: "/images/MERN.jpg",
      description:
        "Full stack development with MongoDB, Express, React, and Node.js.",
    },
    {
      title: "UI/UX",
      image: "/images/ui.jpg",
      description: "Designing intuitive user interfaces and experiences.",
    },
    {
      title: "ReactJS",
      image: "/images/reactjs.jpg",
      description: "Build powerful user interfaces with ReactJS.",
    },
  ],
  EE: [
    {
      title: "AutoCAD Electrical",
      image: "/images/autocad_electrical.jpg",
      description: "Electrical design with AutoCAD software.",
    },
    {
      title: "PLC",
      image: "/images/plc.jpg",
      description: "Learn Programmable Logic Controllers.",
    },
    {
      title: "SCADA",
      image: "/images/scada.jpg",
      description: "Supervisory Control and Data Acquisition systems.",
    },
    {
      title: "MATLAB Electrical",
      image: "/images/matlab.jpg",
      description: "MATLAB for electrical system simulations.",
    },
    {
      title: "Microcontroller",
      image: "/images/microcontroller.jpg",
      description: "Programming and application of microcontrollers.",
    },
    {
      title: "PCB Designing using ORCAD",
      image: "/images/pcb_design.jpg",
      description: "Printed Circuit Board design using ORCAD.",
    },
    {
      title: "MATLAB Electronics",
      image: "/images/matlab.jpg",
      description: "MATLAB for electronics system simulations.",
    },
    {
      title: "Advanced Microcontroller",
      image: "/images/advanced_microcontroller.jpg",
      description: "Advanced programming of microcontrollers.",
    },
    {
      title: "Industrial Automation Concepts",
      image: "/images/industrial_automation.png",
      description: "Concepts in industrial automation and control.",
    },
    {
      title: "Automotive Embedded Systems",
      image: "/images/automotive_embedded.jpg",
      description: "Embedded systems for automotive applications.",
    },
  ],
  Mechanical: [
    {
      title: "AutoCAD Mechanical",
      image: "/images/autocad_mechanical.jpg",
      description: "Mechanical design with AutoCAD software.",
    },
    {
      title: "Creo Parametric",
      image: "/images/creo.jpg",
      description: "3D CAD software for product design.",
    },
    {
      title: "CATIA",
      image: "/images/catia.jpg",
      description: "3D product design and engineering software.",
    },
    {
      title: "SolidWorks",
      image: "/images/solidworks.jpg",
      description: "3D CAD design and engineering solutions.",
    },
    {
      title: "NX CAD",
      image: "/images/nxcad.jpg",
      description: "Advanced CAD/CAM/CAE software from Siemens.",
    },
    {
      title: "HyperMesh",
      image: "/images/hypermesh.jpg",
      description:
        "Finite element pre-processor for high-performance analysis.",
    },
    {
      title: "GD&T",
      image: "/images/gdt.jpg",
      description: "Geometric Dimensioning and Tolerancing in manufacturing.",
    },
    {
      title: "ANSYS Workbench",
      image: "/images/ansys_workbench.jpg",
      description: "Engineering simulation software for mechanical design.",
    },
    {
      title: "NX CAM",
      image: "/images/nxcam.jpg",
      description: "Computer-aided manufacturing software.",
    },
    {
      title: "Mastercam",
      image: "/images/mastercam.jpg",
      description: "Software for manufacturing precision parts.",
    },
  ],
  Civil: [
    {
      title: "AutoCAD Civil 3D",
      image: "/images/autocad_civil.jpg",
      description: "Design and draft civil infrastructure projects.",
    },
    {
      title: "STAAD Pro",
      image: "/images/staadpro.jpg",
      description: "Structural analysis and design software.",
    },
    {
      title: "Revit Architecture",
      image: "/images/revit_architecture.jpg",
      description:
        "BIM software for architecture, engineering, and construction.",
    },
    {
      title: "SketchUp",
      image: "/images/sketchup.jpg",
      description: "3D modeling software for design and architecture.",
    },
    {
      title: "ETABS",
      image: "/images/etabs.jpg",
      description: "Integrated software for building analysis and design.",
    },
    {
      title: "Lumion",
      image: "/images/lumion.jpg",
      description: "Real-time 3D rendering software for architects.",
    },
    {
      title: "Advanced Rendering with V-Ray",
      image: "/images/vray.jpg",
      description: "High-quality rendering software for 3D visuals.",
    },
    {
      title: "ANSYS Civil",
      image: "/images/ansys_civil.jpg",
      description: "Engineering simulation software for civil applications.",
    },
    {
      title: "3ds Max for Engineering & Architecture",
      image: "/images/3dsmax.jpg",
      description: "3D modeling, animation, and rendering software.",
    },
    {
      title: "Revit Structure",
      image: "/images/revit_structure.jpg",
      description: "BIM software for structural engineering.",
    },
    {
      title: "AutoCAD Civil 3D",
      image: "/images/autocad_civil3d.jpg",
      description: "Civil engineering design and documentation software.",
    },
    {
      title: "MxRoad",
      image: "/images/mxroad.jpg",
      description: "Advanced road design software.",
    },
    {
      title: "BIM Concepts",
      image: "/images/bim.jpg",
      description: "Building Information Modeling concepts for construction.",
    },
  ],
};
const CourseList = () => {
  const { category } = useParams();
  const selectedCourses = courses[category];

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage: "url(../images/courses.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          paddingTop: { xs: "4vw", md: "2vw" },
          paddingBottom: { xs: "20vw", md: "15vw" },
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Increased opacity for better readability
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
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.2rem", sm: "2.4rem", md: "3rem" },
                marginTop: { xs: "20px", md: "50px" },
                fontWeight: "bold",
                color: "white",
              }}
            >
              Our Courses
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.4rem" },
                marginTop: "10px",
                fontWeight: "500",
                color: "white",
                maxWidth: "90%",
              }}
            >
              Discover our expertly crafted courses designed to equip you with
              the skills needed to excel in today's competitive job market.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="lg" sx={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <Box sx={{ textAlign: "center", marginBottom: "40px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Our IT Courses
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", margin: "auto", fontSize: { xs: "1rem", md: "1.2rem" } }}>
            Explore All Industry-Leading IT Courses by Engimate and
            Get Placed! Skill up with new IT courses training or improve your
            technical knowledge with the best IT courses. Industry-leading
            courses developed with expertise and experience to help learners stay ahead in
            technological innovation.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {selectedCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 6,
                  borderRadius: "20px",
                  overflow: "hidden",
                  marginBottom:"30px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course.image}
                  alt={course.title}
                  sx={{
                    objectFit: "cover",
                    filter: "brightness(0.85)",
                    transition: "filter 0.4s",
                    "&:hover": {
                      filter: "brightness(1.0)",
                    },
                  }}
                />
                <CardContent
                  sx={{
                    backgroundColor: "#fff",
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "10px", color: "#666" }}
                  >
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default CourseList;
