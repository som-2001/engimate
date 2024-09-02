import { Box, Button, CardMedia, Grid2, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import "../App.css";
import Footer from "../components/Footer";

export const Home = () => {
    const item=[
        {
            image:"MERN.jpg",
            title:"MERN Stack Development Course",
            text:"Engimate offers best UI/UX Design full course in Bihar.Learn about course..."
        },
        {
            image:"ui.jpg",
            title:"UI/UX Design Full Course",
            text:"Engimate offers best UI/UX Design full course in Bihar.Learn from the leading industry about this full course..."

        },
        {
            image:"ui.jpg",
            title:"UI/UX Design Full Course",
            text:"Engimate offers best UI/UX Design full course in Bihar.Learn from the leading industry about this full course..."

        },
        {
            image:"ui.jpg",
            title:"UI/UX Design Full Course",
            text:"Engimate offers best UI/UX Design full course in Bihar.Learn from the leading industry about this full course..."

        }
    ]

    const item1=[
       {
        image:"training1.jpg",
        title:"Job Oriented Training",
        Description:"Get yourself enrolled in a job-oriented course at Engimate. Gain first-hand experience of working on real-time projects"
       },
       {
        image:"training2.jpg",
        title:"Pre-Placement Training",
        Description:"You need to develop specific skills along with software training to get placed during the placement drive on your campus."
       },
       {
        image:"training3.jpg",
        title:"Industrial Automation Training",
        Description:"We believe that professional training leads to a better future for our students. Our Industrial Training prepares you for the complex challenges you will face in this"
       }
    ]
  return (
    <Box >
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
                fontSize: { lg: "3.5rem", xs: "2.2rem" },
                fontWeight: "600",
                lineHeight:"99%",
                overflow:"hidden"
              }}
            >
              Free Online
              <br />
              Demo Classes
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
              Interested in unlocking golden career opportunities?<br/> Join Engimate,
              the leading platform in Bihar for internships, placements, and
              training!<br/> We are renowned for offering top-notch professional
              development programs, both online and offline,<br/> designed to equip
              our students with the skills needed to excel in the IT industry.<br/> 
              Our successful placement track record speaks volumes about the
              quality of our training.
            </Typography>

            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                marginTop: "20px",
                display: { xs: "none", lg: "block", md: "block", sm: "none" },
                marginBottom:"20px"
              }}
            >
              Enroll Now
            </Button>
          </Grid2>
          <Grid2 item xs={12} sm={12} lg={6} md={6}>
            <CardMedia
              component="img"
              image="./images/intro_pic.png"
              sx={{ width: { lg: "500px", xs: "260px" }, borderRadius: "1px",marginTop:"20px" }}
            />
          </Grid2>
        </Grid2>

        <center>
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              marginTop: "20px",
              display: { xs: "block", lg: "none", md: "none", sm: "block" },
            }}
          >
            Enroll Now
          </Button>
        </center>
      </Box>
      <Box style={{width:"100vw",marginTop:"50px"}}>
        <h1 style={{textAlign:"center",fontSize:"2.5rem",marginTop:"20px"}}>Our Popular courses</h1>
        <p style={{textAlign:"center",padding:"10px"}}>Our job-oriented IT courses in Bihar are designed for developing an excellent path for the students.<br/> Engimate offers Complete Placement Assistance on these popular courses. Check it out!</p>
       
        <Grid2 container sx={{padding:"20px",justifyContent:"center"}} spacing={3}>
            {item.map((data,index)=>(
                <Grid2 item lg={3} md={4} sm={12} xs={12}>
                    <CourseCard image={data.image} title={data.title} text={data.text}/>
                </Grid2>
            ))}
        </Grid2>
        

        <center><Button variant="contained" sx={{borderRadius:"20px",marginBottom:"20px"}}>View All Courses</Button></center>
      </Box>
      <Box sx={{width:"100vw",marginTop:"50px"}}>
        <h1 style={{textAlign:"center",fontSize:"2.5rem",marginTop:"20px"}}>Our Featured Training</h1>
        
        <p style={{textAlign:"center",padding:"10px"}}>Being the best software training institute Bihar, we offer excellent training programs to our candidates.<br/> Preparing them for bright career opportunities, we equip them with the right skills and proper training.</p>

        <Grid2 container sx={{padding:"20px",justifyContent:"center"}} spacing={3}>
            {item1.map((data,index)=>(
                <Grid2 item lg={3} md={4} sm={12} xs={12}>
                    <CourseCard image={data.image} title={data.title} text={data.Description}/>
                </Grid2>
            ))}
        </Grid2>
        

      </Box>
      <Footer/>
    </Box>
  );
};
