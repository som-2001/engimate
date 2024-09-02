import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = {
    CSE: [
      {
        title: "MERN Stack",
        image: "/images/mern.jpg",
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
    "Electrical & Electronics": [
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
        description: "Finite element pre-processor for high-performance analysis.",
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
        description: "BIM software for architecture, engineering, and construction.",
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
  

export const OurCourses = () => {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          textAlign: "center",
          backgroundImage:
            "url(./images/courses.jpg)",
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
              Our Courses
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
              Discover our expertly crafted courses designed to equip you with the skills needed to excel in today's competitive job market.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} md={6}></Grid>
        </Grid>
      </Box>
      <Container sx={{ padding: "20px" }}>
      
      <Box mb={4}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Our Courses
          </Typography>
          <Typography variant="h6" align="center" gutterBottom sx={{fontWeight:"600"}}>
            Explore All Industry-Leading IT Courses by Engimate and Get Placed!
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Skill up with new IT courses training or improve your technical knowledge with the best IT courses in Bihar offered by Engimate. Industry-leading courses developed with expertise and experience to help learners stay ahead in technological innovation. Choosing the best IT job-oriented courses and pre-placement training courses helps you find that dream job and navigate better in a competitive work environment.
          </Typography>
          <Typography variant="h6" align="center" paragraph sx={{fontWeight:"600"}}>
            Explore our wide range of IT courses today and get placed!
          </Typography>
        </Box>
        {Object.keys(categories).map((category) => (
          <Box key={category} mb={4}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              {category}
            </Typography>
            <Grid container spacing={4}>
              {categories[category].map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.title}>
                  <Card
                    sx={{
                      boxShadow: 5,
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={course.image}
                      alt={course.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ backgroundColor: "#f5f5f5" }}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
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
          </Box>
        ))}
      </Container>
      <Footer />
    </Box>
  );
};
