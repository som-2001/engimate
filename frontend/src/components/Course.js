import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
const item = [
    {
      title: "MERN Stack",
      image: "MERN.jpg",
      price: 5000,
      video: "video.mp4",
      description:
        "Full stack development with MongoDB, Express, React, and Node.js.",
      card_description:
        "MERN Full Stack Web development React projects & Web Application with React JS, NodeJS, Express JS, Mongodb: Mern Stack For IT & Computer science Engineers",
      learn: [
        "MERN Full Stack Web Application with React & Web Development",
        "Learn components, props, states and component life cycle methods in React JS.",
        "Create reusable React Components for Web development and Mern stack project",
        "The best testing framework for NodeJS",
        "Learn how to build powerful and fully functional social media website using MERN.",
        "Frameworks provide an opinionated approach to building an entire application.",
        "Learn how to create Single Page Web Application with React JS",
        "User Inputs, Forms and Events in React with Redux, hooks and context",
        "Learn the key concepts of the NodeJS",
        "Learn how to build backend API using node and express",
        "Learn about Redux (Best state management tool)",
      ],
      course_description: [
        {
          title: "Course Description",
          content:
            "Embark on a comprehensive journey into the world of Full Stack Development with our MERN (MongoDB, Express.js, React, Node.js) stack course. This hands-on program is designed to equip you with the skills and knowledge needed to create dynamic and scalable web applications. MERN is a free and open-source JavaScript software stack for building dynamic websites and web applications. Because all components of the MERN stack support programs that are written in JavaScript, MERN applications can be written in one language for both server-side and client-side execution environments.",
        },
        {
          title: "Course Objective",
          content:
            "The main objective of this course is to provide comprehensive knowledge on MongoDB, Express.js, React, and Node.js. This includes gaining a solid understanding of HTML, CSS, and JavaScript to build a strong foundation for web development, backend development proficiency, frontend development mastery, and integration and full stack connectivity. By the end of this course, participants will emerge as proficient Full Stack Developers, equipped with the skills and knowledge necessary to tackle the challenges of modern web development using the MERN stack.",
        },
        {
          title: "Roles in Industry",
          content: [
            "Full Stack Developer",
            "Frontend Developer",
            "Backend Developer",
            "JavaScript Developer",
            "MERN Stack Developer",
            "UI/UX Developer",
            "DevOps Engineer",
            "Technical Lead",
            "Entrepreneur/Startup Developer",
            "Freelance Developer",
          ],
        },
        {
          title: "Course Highlights",
          content: [
            "Introduction to Hyper Text Markup Language (HTML5)",
            "Introduction to Cascading Style Sheets (CSS), Bootstrap, JavaScript, jQuery, JSON",
            "MongoDB",
            "Express JS",
            "React JS",
            "Node JS",
          ],
        },
      ],
    },
  
    {
      title: "PLC",
      price: 5000,
      video: "video.mp4",
      image: "plc.jpg",
      description: "Learn Programmable Logic Controllers.",
      card_description:
        "PLC Programming of Siemens using PLC Controller.For Electrical, Electronics, Instrumentation Engineers",
      learn: [
        "Connecting and configuring input/output devices.",
        "Understanding the architecture and operation of PLCs.",
        "Working with various field devices and sensors.",
        "Creating PLC programs using ladder logic.",
        "Establishing communication between PLC and PC.",
        "To Learn Ladder Logic Programming.",
        "Implementing timers, counters, jumps, and multi-interlocking.",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "PLC or Programmable Logic Controller is an industrial digital computer and its course makes you ready for the mechanical automation process in manufacturing units and construction buildings.",
            "You can use your expertise for dynamic development, subsequent control, counters and timers, programming ease, and control.",
            "PLC is generally used in industries which helps to eliminate the hard wiring compared with standard relay control circuits, improving productivity.",
            "PLC is a robust industrial computer which is essentially a designed task of reading field tools and controlling actuators.",
          ],
        },
        {
          title: "Course Objectives",
          content: [
            "To understand the generic architecture and constituent components of a Programmable Logic Controller.",
            "To develop a software program using modern engineering tools and techniques for PLC and SCADA.",
            "To apply knowledge gained about PLCs and SCADA systems to real-life industrial applications.",
          ],
        },
        {
          title: "Roles in Industry",
          content: [
            "Automotive industries",
            "Automatic storage and retrieval systems",
            "Power distribution plants",
            "Nuclear energy plants",
            "Automatic parking systems",
            "Robotics & automation industries",
            "Bottle filling plants",
          ],
        },
        {
          title: "Course Highlights",
          content: [
            "Pad Designer",
            "Package Symbol & Package symbol wizard",
            "Netlist creation",
            "Component and board placement",
            "Mechanical symbol placement",
            "Manual and Automatic routing",
            "Constraint Manager and Xsection",
            "Blind, Buried and through-hole VIA",
            "Copper shaping",
            "Artwork/Gerber file creation",
            "Plot Generation",
            "PCB Fabrication Process",
          ],
        },
      ],
    },
  
    {
      title: "NX CAD",
      image: "nxcad.jpg",
      description: "Advanced CAD/CAM/CAE software from Siemens.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "Siemens NX software is a flexible and powerful integrated solution that helps you deliver better products faster and more efficiently.For Mechanical and Automobile Engineers",
      learn: [
        "Introduction to Unigraphics NX and its interface",
        "File management and template usage",
        "Creating and editing sketches",
        "Applying geometric and dimensional constraints",
        "Feature modeling concepts and basics",
        "Creating extrude features with various options",
        "Revolve feature creation",
        "Datum features and their types",
        "Sweep features and blend techniques",
        "Assembly modeling and constraints",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "The NX CAD Designers course provides professional instruction in product model design, detailing, assembly modeling, and the basics of the master model concept. Unigraphics NX, owned by Siemens PLM Software, offers integrated and advanced CAD, CAE, and CAM solutions.",
          ],
        },
        {
          title: "Course Objectives",
          content: [
            "Introduce assembly modeling in a real-life context, including both student-modeled and pre-created part models",
            "Reinforce understanding of the flexibility of solid modeling and assembly tools in product development collaboration",
          ],
        },
        {
          title: "Roles in Industry",
          content: [
            "Seamless integration with other CAD systems",
            "Ability to handle complex products",
            "Visual analytics enhance decision-making",
            "Reduces development time by over 30%",
            "Increases annual production of new products",
          ],
        },
        {
          title: "Course Highlights",
          content: [
            "Open and examine NX models",
            "Create and edit basic assembly structures",
            "Create and edit drawings",
            "Use synchronous modeling",
            "Create component patterns",
            "Define revision identifiers",
            "Apply top-down assembly modeling",
            "Manage assembly arrangements",
          ],
        },
      ],
    },
  
    {
      title: "NX CAM",
      image: "nxcam.jpg",
      description: "Computer-aided manufacturing software.",
      price: 5000,
      video: "video.mp4",
      card_description:
        "NX CAM provides comprehensive and integrated NC programming capabilities in a single system.For Mechanical and Automobile Engineers",
      learn: [
        "Introduction to manufacturing and machining types",
        "Overview of milling operations",
        "Benefits of Computer-Aided Manufacturing (CAM)",
        "Introduction to NX CAM software",
        "Overview of milling machines and cutters",
        "Operation Navigator and editing operations",
        "Geometry and tool groups in CAM",
        "Visualizing and analyzing tool paths",
        "Various machining operations and techniques",
      ],
      course_description: [
        {
          title: "Course Description",
          content: [
            "NX CAM provides a comprehensive set of NC programming capabilities within a single CAM system and an integrated suite of manufacturing applications. These applications support part modeling, tool design, and inspection programming, all leveraging proven NX technology.",
          ],
        },
        {
          title: "Course Objectives",
          content: [
            "Perform 2, 3, and 5-axis milling and additive manufacturing such as 3D printing.",
            "Quickly program parts with complex geometries using the shortest tools to save time and reduce errors.",
            "Utilize mold, die, and electrode machining to produce high-quality products and decrease time to market.",
          ],
        },
        {
          title: "Roles in Industry",
          content: [
            "NX CAM is utilized across various industries including aerospace, automotive, medical devices, mold and die, and machinery.",
            "It caters to both small machine shops and large teams of manufacturing engineers.",
            "Siemens software solutions are trusted by leading organizations globally.",
          ],
        },
        {
          title: "Course Highlights",
          content: [
            "Tool and machining data libraries",
            "Accessing manufacturing wizards",
            "Shop documentation",
            "Feature-based manufacturing",
            "Templates",
            "Integrated verification and simulation",
            "Tool path optimization",
            "Automated NC code generation",
          ],
        },
      ],
    },
  ];

export const Course=()=>{
    const { name } = useParams(); 
    const [result, setResult] = useState(null);
    

    useEffect(() => {
      window.scrollTo(0,0);
      const matchedItem = item.find((course) => course.title === name);
      if (matchedItem) {
        setResult(matchedItem);
      }
    }, [name]);
  
    return (
        <Box sx={{overflowX:"hidden"}}>
        <Navbar />
  
        {/* Hero Section */}
        <Box
          sx={{
            width: "100vw",
            textAlign: "center",
            backgroundImage: "url(../images/courses.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            paddingTop: "4vh",
            paddingBottom: "4vw",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.4rem",
                    md: "2.6rem",
                    lg: "2.6rem",
                  },
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                }}
              >
                {result?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.1rem",
                    md: "1.2rem",
                    lg: "1.2rem",
                  },
                  fontWeight: "500",
                  maxWidth: "800px",
                  margin: "0 auto",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                }}
              >
                {result?.card_description}
              </Typography>
            </Grid>
  
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: { xs: "20px", lg: "0" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "50%", md: "50%", lg: "50%" },
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
                  backgroundColor: "#fff",
                  padding: "20px",
                }}
              >
                <video
                  controls
                  style={{ width: "100%", height: "auto", borderRadius: "15px" }}
                >
                  <source src="https://videos.pexels.com/video-files/5147975/5147975-uhd_2732_1440_25fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "start",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{
                      marginTop: "20px",
                      color: "black",
                      marginLeft: "10px",
                      fontSize: "1.2rem",
                    }}
                  >
                    ₹:{result?.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#0d47a1", // Matching button color with main heading
                      color: "#fff",
                      width:"95%",
                      padding: "10px 24px",
                      fontSize: "1rem",
                      textTransform: "none",
                      borderRadius: "50px",
                      "&:hover": {
                        backgroundColor: "#08306b", // Darker shade on hover
                      },
                      marginBottom:"5px"
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "95%",borderRadius:"50px",padding: "10px 24px", }}
                    onClick={(e)=>window.location.href="https://lyss.in/payment"}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
  
        {/* Content Section */}
        <Container maxWidth="lg" sx={{ padding: "40px 20px 0px 20px" }}>
          {/* What You'll Learn Section */}
          <Box mb={5}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "25px",
                textAlign: "center",
              
              }}
            >
              What You'll Learn
            </Typography>
            {result?.learn?.length>0 && <Grid container spacing={2}>
              {result?.learn?.map((item, index) => (
                <Grid item xs={12} sm={6} md={12} lg={6} key={index}>
                  <Typography
                    sx={{
                      fontSize: "1.0rem",
                      color: "#333",
                      backgroundColor: "#f5f5f5",
                      padding: "15px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                  >
                    {item}
                  </Typography>
                </Grid>
              ))}
            </Grid>}
          </Box>
  
          <Divider />
  
          {/* Course Description Section */}
          <Box sx={{padding:"5%"}}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: "5%", color: "#1976D2",}}
            >
              Description
            </Typography>
            {result?.course_description?.map((section, index) => (
              <Box key={index} mb={5}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#1976D2",
                  }}
                >
                  {section?.title}
                </Typography>
                <Typography variant="body1">
                  {section?.title === "Roles in Industry" ||
                  section?.title === "Course Highlights"
                    ? section?.content?.map((line, index) => (
                        <span key={index}>
                          <li>{line}</li>
                        </span>
                      ))
                    : section?.content}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
  
        <Footer />
      </Box>
    );
}