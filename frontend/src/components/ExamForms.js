import { KeyboardBackspace } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export const ExamForms=()=>{

    const [hide,setHide]=useState(true);
    const [courses,setCourses]=useState([]);
    const [loadCourse,setLoadCourse]=useState(true);
    const [filteredCourse,setFilteredCourse]=useState([]);
    const [visibleCourses, setVisibleCourses] = useState(3);
    const [exams,setExams]=useState([]);
    const [loadExam,setLoadExam]=useState(true);
    const navigate=useNavigate();
    const [searchTerm, setSearchTerm] = useState("");


    const loadMoreCourses = () => {
        setVisibleCourses((prevVisible) => prevVisible + 4); // Load 4 more courses
      };

    useEffect(() => {
        try {
          axios.get(`${process.env.REACT_APP_BASEURl}/course/all`).then((res) => {
            setLoadCourse(false);
            setCourses(res.data.courses);
            setFilteredCourse(res.data.courses);
          }).catch(error=>{
            console.error("Error fetching courses", error);
          toast.error(error?.response?.data?.message, { autoClose: 3000 });
          if (error?.response?.data?.message === "login first or token expired") {
            if (sessionStorage?.getItem("token")) {
              sessionStorage?.removeItem("token");
            }
            navigate("/login");
          }
          });
        } catch (error) {
          console.error("Error fetching courses", error);
          toast.error(error?.response?.data?.message, { autoClose: 3000 });
          if (error?.response?.data?.message === "login first or token expired") {
            if (sessionStorage?.getItem("token")) {
              sessionStorage?.removeItem("token");
            }
            navigate("/login");
          }
        }
    
      }, [navigate]);

      const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        console.log(term);
        const filtered = courses.filter(
          (course) => course.title.toLowerCase().includes(term.toLowerCase()) // Adjust based on your data structure
        );
        setFilteredCourse(filtered);
      };


    const ExamShow=(id)=>{
        setHide(false);
        setLoadExam(true);
        try {
            axios.get(`${process.env.REACT_APP_BASEURl}/exam/list-by-course/${id}`,{
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('token')}`
                }
            }).then((res) => {
              setLoadExam(false);
              setExams(res.data.exams);
            }).catch(error=>{
              console.error("Error fetching courses", error);
            toast.error(error?.response?.data?.message, { autoClose: 3000 });
            if (error?.response?.data?.message === "login first or token expired") {
              if (sessionStorage?.getItem("token")) {
                sessionStorage?.removeItem("token");
              }
              navigate("/login");
            }
            });
          } catch (error) {
            console.error("Error fetching categories", error);
            toast.error(error?.response?.data?.message, { autoClose: 3000 });
            if (error?.response?.data?.message === "login first or token expired") {
              if (sessionStorage?.getItem("token")) {
                sessionStorage?.removeItem("token");
              }
              navigate("/login");
            }
          }
    }
    return(
        <Box>
        {hide ? (
        <Box >
          <Typography variant="h5" style={{ marginBottom: "30px" }}>
            Courses ({courses.length} items)
          </Typography>

          <Grid container spacing={2} justifyContent="flex-end">
            <TextField
              placeholder="Search Course"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { lg: "50%", md: "50%", sm: "80%", xs: "100%" } }}
            />
            {filteredCourse.length > 0 ? (
              filteredCourse.slice(0, visibleCourses).map((data, index) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack vertically on small screens
                      alignItems: "center", // Center content on small screens
                      p: 2, // Add padding for better spacing
                      gap: 2, // Add gap between media and content
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", sm: 250 }, // Full width on small screens, 300px on larger screens
                        height: { xs: 200, sm: 240 }, // Set fixed height on small screens
                        objectFit: "cover", // Make sure image covers the container
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                      image={data.image}
                      alt=""
                      onClick={() => ExamShow(data?._id)}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent
                        sx={{ cursor: "pointer" }}
                        onClick={() => ExamShow(data?._id)}
                      >
                        <Typography component="div" variant="h5">
                          {data?.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "text.secondary",
                            wordWrap: "break-word",
                          }}
                        >
                          {data.card_description.length > 200
                            ? `${data.card_description.slice(0, 200)}...`
                            : data.card_description}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ color: "text.secondary" }}
                        >
                          Created At:{" "}
                          {dayjs(data?.createdAt).format("Do MMM YYYY")}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{ fontSize: "1.2rem", color: "green" }}
                        >
                          Rs: {data.price}
                        </Typography>
                      </CardContent>

                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid container spacing={2} textAlign="center">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <p style={{ marginTop: "50px" }}>No courses found.</p>
                </Grid>
              </Grid>
            )}
          </Grid>

          {/* Load More Courses Button */}
          {visibleCourses < courses.length && (
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                  width: { lg: "20%", xs: "60%", sm: "60%", md: "20%" },
                  padding: "10px 24px",
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "#08306b",
                  },
                  marginBottom: "20px",
                }}
                onClick={loadMoreCourses}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
    ):(  <Box>
          <Button
            onClick={(e) => setHide(true)}
            startIcon={<KeyboardBackspace />} // Add Delete Icon
            sx={{
              backgroundColor: "blueviolet", // Red color for Delete
              color: "#fff",
              width: {
                xs: "40%",
                sm: "40%",
                md: "10%",
                lg: "10%",
              },
              padding: "5px 10px", // Adjust padding
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "blueviolet", // Darker shade on hover
              },
              marginBottom: "20px",
              marginLeft: "0px",
            }}
          >
            Back
          </Button>
          <Typography
            variant="h5"
            style={{ marginBottom: "30px", fontSize: "1.7rem" }}
          >
            Exam From ({exams.length} items)
          </Typography>
          {exams.length === 0 ? (
            <center style={{ padding: "40px" }}>
              <p>No Exam forms are added yet.</p>
            </center>
          ) : null}
          <Grid container spacing={2}>
            {exams?.map((data, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: 5,
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "auto",
                    position: "relative", // Needed for overlay positioning
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  
                  <CardContent
                    sx={{
                      height: "130px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      <span
                        style={{
                          fontSize: "1.3rem",
                          color: "blueviolet",
                          fontWeight: "600",
                        }}
                      >
                        #{index + 1}
                      </span>{" "}
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      Created At: {dayjs(data?.createdAt).format("Do MMM YYYY")}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Button
                      startIcon={<DeleteIcon />} // Add Delete Icon
                      sx={{
                        backgroundColor: "#e53935", // Red color for Delete
                        color: "#fff",
                        width: {
                          xs: "100%",
                          sm: "100%",
                          md: "40%",
                          lg: "30%",
                        },
                        padding: "5px 10px", // Adjust padding
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#c62828", // Darker shade on hover
                        },
                        marginBottom: "10px",
                        marginLeft: "10px",
                      }}
                    //   onClick={(e) => handleDeleteClick(data?._id)}
                    >
                      Delete
                    </Button>

                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

         
        </Box>)}
    </Box>
    )
}