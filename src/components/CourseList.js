import React from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,

} from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";

const courses = {
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
  <Box sx={{ padding: "20px" }}>
    <Typography variant="h4" align="center" gutterBottom>
      Courses
    </Typography>
    <Grid container spacing={4}>
      {selectedCourses.map((course, index) => (
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
              image={course.image}
              alt={course.title}
              sx={{
                objectFit: "cover",
                filter: "brightness(0.9)",
                transition: "filter 0.4s",
                "&:hover": {
                  filter: "brightness(1.1)",
                },
              }}
            />
            <CardContent
               sx={{
                backgroundColor: "#f5f5f5",
                height: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
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
               
              >
                {course.description}
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

export default CourseList;
