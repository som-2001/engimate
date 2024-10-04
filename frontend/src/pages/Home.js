import { Box, Button, CardMedia, Grid2, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import "../App.css";
import Footer from "../components/Footer";
import WhyUs from "../components/WhyUs";
import { OurExpertise } from "../components/OurExpertise";
import PopularCard from "../components/PopularCard";
export const Home = () => {
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

  const item1 = [
    {
      image: "training1.jpg",
      title: "Job Oriented Training",
      Description:
        "Get yourself enrolled in a job-oriented course at YANTRAVED. Gain first-hand experience of working on real-time projects",
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
    <Box sx={{overflowX:"hidden"}}>
      <Navbar />
      <Box style={{ width: "100vw", }}>
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
                color: "#1976D2"
              }}
            >
              Welcome to YANTRAVED!
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
              Engineering At YANTRAVED,
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
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px",color: "#1976D2" }}
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
          Our job-oriented IT & Industrial Automation courses are designed for developing an excellent
          path for the students.
          <br /> YANTRAVED offers Complete Placement Assistance on these popular
          courses. Check it out!
        </Typography>

        <Grid2
          container
          sx={{ padding: "20px", justifyContent: "center" }}
          spacing={3}
        >
          {item.map((data, index) => (
            <Grid2 item lg={3} md={4} sm={12} xs={12}>
              <PopularCard
                image={data.image}
                title={data.title}
                text={data.card_description}
                
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
      <Box sx={{ width: "100vw", marginTop: "50px" }}>
        <h1
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px",color: "#1976D2" }}
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
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px",color: "#1976D2" }}
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
          style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "20px",color: "#1976D2" }}
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
          YANTRAVED,
          <br /> the best software training institute is your stop. Enrol on our
          professional IT & Industrial Automation courses and get trained by the industry experts.
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
          professional seeking to upgrade your skills, YANTRAVED is your partner
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
