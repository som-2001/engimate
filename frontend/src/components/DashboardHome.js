import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";

export const DashboardHome = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(3); // Initially show 4 courses
  const [visibleCategories, setVisibleCategories] = useState(3); // Initially show 3 categories
  const [loadCourse, setLoadCourse] = useState(true);
  const [loadCategory, setLoadCategory] = useState(true);
  const [hide, setHide] = useState(true);
  const [lectures,setLectures]=useState([]);

  // Fetch categories and courses data
  useEffect(() => {
    try {
      axios.get(`${BaseUrl}/course/all`).then((res) => {
        setLoadCourse(false);
        setCourses(res.data.courses);
      });
    } catch (error) {
      console.error("Error fetching courses", error);
    }

    try {
      axios.get(`${BaseUrl}/categories/all`).then((res) => {
        setLoadCategory(false);
        setCategories(res.data.categories);
      });
    } catch (error) {
      console.error("Error fetching categories", error);
    }

  }, []);

  // Function to handle loading more items
  const loadMoreCourses = () => {
    setVisibleCourses((prevVisible) => prevVisible + 4); // Load 4 more courses
  };

  const loadMoreCategories = () => {
    setVisibleCategories((prevVisible) => prevVisible + 4); // Load 4 more categories
  };

  if (loadCourse || loadCategory) {
    return (
      <center>
        <Box sx={{ marginTop: "25%" }}>
          <CircularProgress size={30} />
        </Box>
      </center>
    );
  }

  const lectureShow = (id) => {
    setHide(false);
    axios.get(`${BaseUrl}/lectures/${id}`,{
      headers: {
        "Authorization":`Bearer ${sessionStorage.getItem("token")}`
      },
    }).then(res=>{
      setLectures(res.data.lectures)
    }).catch(error=>{
      console.error("Error fetching categories", error);
    })
  };

  return (
    <Box p={3}>
      {/* Courses Section */}
      {hide ? (
        <Box>
          <Typography variant="h5" style={{ marginBottom: "30px" }}>
            Courses
          </Typography>
          <Grid container spacing={2}>
            {courses.slice(0, visibleCourses)?.map((data, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
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
                    cursor: "pointer",
                  }}
                  onClick={(e)=>lectureShow(data?._id)}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={data?.image}
                    alt={data?.title} // Add alt for better accessibility
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "#f5f5f5",
                      height: "170px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6">{data?.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data?.card_description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Load More Courses Button */}
          {visibleCourses < courses.length && (
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={loadMoreCourses}
              >
                Load More Courses
              </Button>
            </Box>
          )}

          {/* Categories Section */}
          <Typography
            variant="h5"
            style={{ marginBottom: "30px", marginTop: "50px" }} // Added margin to separate from courses
          >
            Categories
          </Typography>
          <Grid container spacing={2}>
            {categories.length === 0 ? (
              <center>
                <p>No Categories Added yet.</p>
              </center>
            ) : null}
            {categories.slice(0, visibleCategories)?.map((data, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
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
                    image={data?.image}
                    alt={data?.category_name} // Add alt for better accessibility
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "#f5f5f5",
                      height: "170px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6">{data?.category_name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Load More Categories Button */}
          {visibleCategories < categories.length && (
            <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={loadMoreCategories}
              >
                Load More Categories
              </Button>
            </Box>
          )}
        </Box>
      ):(
        <Box>
          <Typography variant="h5" style={{ marginBottom: "30px" }}>
            Lectures
          </Typography>
          <Grid container spacing={2}>
            {lectures?.map((data, index) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
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
                    cursor: "pointer",
                  }}
                  onClick={(e)=>window.open(data?.video_url,"_blank")}
                >
                  <iframe src={data?.video_url} width="100%" height="250" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={data?._id}/>
                  <CardContent
                    sx={{
                      backgroundColor: "#f5f5f5",
                      height: "170px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6">{data?.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
