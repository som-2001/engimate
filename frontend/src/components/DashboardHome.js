import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";

export const DashboardHome = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(4); // Tracks number of visible courses
  const [visibleCategories, setVisibleCategories] = useState(4); // Tracks number of visible categories

  // Fetch categories and courses data
  useEffect(() => {
    try {
      axios.get(`${BaseUrl}/course/all`).then((res) => {
        setCourses(res.data.courses);
      });
    } catch (error) {
      console.error("Error fetching courses", error);
    }

    try {
      axios.get(`${BaseUrl}/categories/all`).then((res) => {
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

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        
        {/* Courses Section */}
        <Typography variant="h5" style={{ marginBottom: "30px" }}>
          Courses
        </Typography>
        <Grid container spacing={2}>
          {courses.slice(0, visibleCourses)?.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={data?.image}
                  alt={data?.category_name} // Add alt for better accessibility
                />
                <CardContent>
                  <Typography variant="h6">{data?.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data?.course_description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* {courses.length>0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={loadMoreCourses}
            sx={{ marginTop: 2 }}
          >
            Load More Courses
          </Button>
        )} */}

        {/* Categories Section */}
        <Typography
          variant="h5"
          style={{ marginBottom: "30px", marginTop: "30px" }}
        >
          Categories
        </Typography>
        <Grid container spacing={2}>
          {categories.slice(0, visibleCategories)?.map((data, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={data?.image}
                  alt={data?.category_name} // Add alt for better accessibility
                />
                <CardContent>
                  <Typography variant="h6">{data?.category_name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {visibleCategories < categories.length && (
          <Button
            variant="contained"
            color="primary"
            onClick={loadMoreCategories}
            sx={{ marginTop: 2 }}
          >
            Load More Categories
          </Button>
        )}
      </Grid>
    </Box>
  );
};
