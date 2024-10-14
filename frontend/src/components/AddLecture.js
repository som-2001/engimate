import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
  ListSubheader,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "./BaseUrl";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .required("Description is required")
    .max(100, "Maximum 100 characters allowed."),
  video_url: Yup.string()
    .url("Enter a valid URL")
    .required("Video URL is required"),
  course: Yup.string().required("Course is required"),
});

export const AddLecture = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch categories and courses
  useEffect(() => {
    axios
      .get(`${BaseUrl}/category-course/detail/all`)
      .then((res) => {
        setResult(res?.data?.categoryCourse); // Assuming the API returns categories with their respective courses
        setFilteredResult(res?.data?.categoryCourse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter courses based on search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (value === "") {
      setFilteredResult(result);
    } else {
      const filtered = result
        .map((category) => {
          const filteredCourses = category.courses.filter((course) =>
            course.title.toLowerCase().includes(value)
          );
          return {
            ...category,
            courses: filteredCourses,
          };
        })
        .filter((category) => category.courses.length > 0); // Filter out categories with no matching courses

      setFilteredResult(filtered);
    }
  };

  // On form submit
  const onSubmit = async (data) => {
    setLoad(true);
    axios
      .post(
        `${BaseUrl}/course/${data.course}`,
        {
          title: data.title,
          description: data.description,
          video_url: data.video_url,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setLoad(false);
        toast.success(res.data.message, { autoClose: 3000 });
        reset();
        setSearch('');
        setValue("course", "");
      })
      .catch((error) => {
        setLoad(false);
        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          sessionStorage?.removeItem("token");
          navigate("/login");
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          boxShadow: { xs: 0, sm: 2 },
          padding: { sm: 2 },
          backgroundColor: { sm: "transparent" },
          borderRadius: "10px",
        }}
      >
        <Grid container spacing={2}>
          {/* Left Side - Image */}
          <Grid item xs={12} sm={12} md={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src="../images/elearning.png"
                alt="Form Side"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "15px",
                  objectFit: "cover",
                  height: "100%",
                }}
              />
            </Box>
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} sm={12} md={7}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Title"
                        variant="outlined"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        InputProps={{
                          sx: {
                            borderRadius: "22px", // Customize border radius
                            "&:hover": {
                              backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                            },
                          },
                        }}
                        sx={{
                          borderRadius: "22px", // Outer border radius
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "rgb(89, 139, 139)", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgb(107, 169, 169)", // Border color when focused
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        InputProps={{
                          sx: {
                            borderRadius: "22px", // Customize border radius
                            "&:hover": {
                              backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                            },
                          },
                        }}
                        sx={{
                          borderRadius: "22px", // Outer border radius
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "rgb(89, 139, 139)", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgb(107, 169, 169)", // Border color when focused
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="video_url"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Video URL"
                        variant="outlined"
                        error={!!errors.video_url}
                        helperText={errors.video_url?.message}
                        InputProps={{
                          sx: {
                            borderRadius: "22px", // Customize border radius
                            "&:hover": {
                              backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                            },
                          },
                        }}
                        sx={{
                          borderRadius: "22px", // Outer border radius
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                              borderColor: "rgb(89, 139, 139)", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "rgb(107, 169, 169)", // Border color when focused
                            },
                          },
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Search Course"
                    value={search}
                    onChange={handleSearch}
                    fullWidth
                    variant="outlined"
                    placeholder="Search by course name"
                    InputProps={{
                      sx: {
                        borderRadius: "22px", // Customize border radius
                        "&:hover": {
                          backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "22px", // Outer border radius
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "rgb(89, 139, 139)", // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgb(107, 169, 169)", // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!errors.course}
                  >
                    <InputLabel id="course-label">Course</InputLabel>

                    {/* Use Controller from react-hook-form */}
                    <Controller
                      name="course"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field} // Spread the field props
                          label="Course"
                          fullWidth
                          onChange={(e) => {
                            field.onChange(e.target.value); // Update the form state
                            console.log(e.target.value);
                          }}
                          onClose={field.onBlur} // Ensure the dropdown closes after selection
                          InputProps={{
                            sx: {
                              borderRadius: "22px", // Customize border radius
                              "&:hover": {
                                backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                              },
                            },
                          }}
                          sx={{
                            borderRadius: "22px", // Outer border radius
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "rgb(89, 139, 139)", // Border color on hover
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "rgb(107, 169, 169)", // Border color when focused
                              },
                            },
                          }}
                        >
                          {filteredResult?.flatMap((category_item) => [
                            <ListSubheader
                              key={`header-${category_item.category._id}`}
                              disabled
                              sx={{
                                pointerEvents: "none",
                                fontWeight: "bold",
                                fontSize: "1.2rem",
                              }}
                            >
                              {category_item.category.category_name}
                            </ListSubheader>,
                            ...category_item.courses.map((course) => (
                              <MenuItem key={course._id} value={course._id}>
                                {course.title}
                              </MenuItem>
                            )),
                          ])}
                        </Select>
                      )}
                    />

                    {/* Display error if course is not selected */}
                    {errors.course && (
                      <FormHelperText>{errors.course.message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <center>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={load}
                      color="primary"
                      fullWidth
                      sx={{
                        backgroundColor: "#0d47a1",
                        color: "#fff",
                        width: "60%",
                        padding: "5px 24px",
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#08306b",
                        },
                        marginBottom: "10px",
                      }}
                    >
                      {load ? (
                        <CircularProgress size={30} />
                      ) : (
                        <span>Submit</span>
                      )}
                    </Button>
                  </center>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
