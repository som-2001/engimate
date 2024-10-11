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
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // Import advancedFormat for ordinal dates
import SearchIcon from '@mui/icons-material/Search';
import { KeyboardBackspace } from "@mui/icons-material";

dayjs.extend(advancedFormat); // Extend dayjs with the plugi
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required").max(100,"maximum 100 characters can be added."),
  video_url: Yup.string()
    .url("Enter a valid URL")
    .required("Video URL is required"),
});

const validationSchema1 = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  learn: Yup.string().required("Learn is required"),
  card_description: Yup.string().required("Card description is required"),
  course_description: Yup.string().required("Course description is required"),
  course_objective: Yup.string().required("Course objective is required"),
  roles_in_industry: Yup.string().required("Roles in industry are required"),
  caption: Yup.string().required("Caption is required"),
  course_highlights: Yup.string().required("Course highlights are required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
  display_video_url: Yup.string()
    .url("Enter a valid URL")
    .required("Video URL is required"),
  image: Yup.mixed().required("Image is required"),
});

export const DashboardHome = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(3); // Initially show 4 courses
  const [visibleCategories, setVisibleCategories] = useState(3); // Initially show 3 categories
  const [loadCourse, setLoadCourse] = useState(true);
  const [loadCategory, setLoadCategory] = useState(true);
  const [loadLecture, setLoadLecture] = useState(false);
  const [hide, setHide] = useState(true);
  const [lectures, setLectures] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null); // Track which video is being played
  const [openDialog, setOpenDialog] = useState(false); // For the confirmation dialog
  const [selectedLecture, setSelectedLecture] = useState(null); // Track the lecture to delete
  const [selectedLecture1, setSelectedLecture1] = useState(null);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourse, setFilteredCourse] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    handleSubmit: firstSchemaHandleSubmit,
    register: firstSchemaregister,
    formState: { errors: firstSchemaerror },
    reset: firstSchemareset,
    setValue: firstSchemasetValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema1),
  });
  const handleVideoPlay = (index) => {
    setActiveVideo(index); // Set the clicked video index as active
  };
  const navigate = useNavigate();
  // Fetch categories and courses data
  useEffect(() => {
    try {
      axios.get(`${BaseUrl}/course/all`).then((res) => {
        setLoadCourse(false);
        setCourses(res.data.courses);
        setFilteredCourse(res.data.courses);
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

    try {
      axios.get(`${BaseUrl}/categories/all`).then((res) => {
        setLoadCategory(false);
        setCategories(res.data.categories);
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
  const handleCloseDialog = () => {
    setOpenDialog(false);
    firstSchemareset();
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    reset();
  };
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
        <Box sx={{ marginTop: { xs: "55%", sm: "45%", md: "25%", lg: "20%" } }}>
          <CircularProgress size={30} />
        </Box>
      </center>
    );
  }

  if (loadLecture) {
    return (
      <center>
        <Box sx={{ marginTop: { xs: "55%", sm: "45%", md: "25%", lg: "20%" } }}>
          <CircularProgress size={30} />
        </Box>
      </center>
    );
  }
  const lectureShow = (id) => {
    setHide(false);
    setLoadLecture(true);
    axios
      .get(`${BaseUrl}/lectures/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoadLecture(false);
        setLectures(res.data.lectures);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  };

  const extractVideoId = (url) => {
    let videoId = null;

    if (url?.includes("v=")) {
      // If 'v=' is present, extract the video ID before any other query parameters
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url?.includes("youtube.com/shorts/")) {
      // Handle YouTube Shorts
      videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    } else if (url?.includes("youtu.be/")) {
      // Handle shortened YouTube URLs
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else {
      console.error("Unsupported YouTube URL format");
    }

    return videoId;
  };
  const handleDeleteClick = (id) => {
    setSelectedLecture(id);
    setOpenDialog(true);
  };

  const handleEditCourse = (id) => {
    setSelectedCourse(id);
    setOpenDialog1(true);

    axios
      .get(`${BaseUrl}/course/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoadLecture(false);

        setValue("title", res.data.course.title);
        setValue("caption", res.data.course.caption);
        setValue("card_description", res.data.course.card_description);
        setValue("course_description", res.data.course.course_description);
        setValue("course_objective", res.data.course.course_objective);
        setValue("learn", res.data.course.learn);
        setValue("roles_in_industry", res.data.course.roles_in_industry);
        setValue("course_highlights", res.data.course.course_highlights);
        setValue("price", res.data.course.price);
        setValue("file", res.data.course.image[0]);
        setValue("display_video_url", res.data.course.display_video_url);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  };

  const handleEditClick = (id) => {
    setSelectedLecture1(id);
    setOpenDialog1(true);

    axios
      .get(`${BaseUrl}/lecture/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLoadLecture(false);

        firstSchemasetValue("title", res.data.lecture.title);
        firstSchemasetValue("description", res.data.lecture.description);
        firstSchemasetValue("video_url", res.data.lecture.video_url);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        toast.error(error?.response?.data?.message, { autoClose: 3000 });
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  };
  const confirmDelete = () => {
    if (selectedLecture) {
      axios
        .delete(`${BaseUrl}/lecture/${selectedLecture}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message, { autoClose: 3000 });
          setLectures((prevLectures) =>
            prevLectures.filter((item) => item._id !== selectedLecture)
          );
          setOpenDialog(false); // Close dialog after deletion
        })
        .catch((error) => {
          console.error("Error deleting lecture", error);
          toast.error(error?.response?.data?.message, { autoClose: 3000 });
          if (
            error?.response?.data?.message === "login first or token expired"
          ) {
            if (sessionStorage?.getItem("token")) {
              sessionStorage?.removeItem("token");
            }
            navigate("/login");
          }
        });
    }
  };

  const confirmCourseDelete = () => {
    if (selectedLecture) {
      axios
        .delete(`${BaseUrl}/course/${selectedLecture}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          toast.success(res.data.message, { autoClose: 3000 });
          setCourses((prevLectures) =>
            prevLectures.filter((item) => item._id !== selectedLecture)
          );
          setOpenDialog(false); // Close dialog after deletion
        })
        .catch((error) => {
          console.error("Error deleting Course", error);
          toast.error(error?.response?.data?.message, { autoClose: 3000 });
          if (
            error?.response?.data?.message === "login first or token expired"
          ) {
            if (sessionStorage?.getItem("token")) {
              sessionStorage?.removeItem("token");
            }
            navigate("/login");
          }
        });
    }
  };
  const onSubmit = async (data) => {
    if (!selectedLecture1) return; // Early exit if no lecture is selected

    setLoad(true);

    try {
      const res = await axios.put(
        `${BaseUrl}/lecture/${selectedLecture1}`,
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
      );

      setLoad(false);
      console.log("Lecture updated successfully:", res?.data?.message);
      toast.success(res.data.message, { autoClose: 3000 });
      firstSchemareset(); // Reset form fields on success
      handleCloseDialog1(); // Close the dialog after submission
      setLectures((prev) =>
        prev.map((item) =>
          item._id === selectedLecture1
            ? {
                ...item,
                title: data.title,
                description: data.description,
                video_url: data.video_url,
              }
            : item
        )
      );
    } catch (error) {
      setLoad(false);
      toast.error(error?.response?.data?.message, { autoClose: 3000 });
      if (error?.response?.data?.message === "login first or token expired") {
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const onSubmit1 = async (data) => {
    if (!selectedCourse) return; // Early exit if no lecture is selected
    console.log("podpod");
    setLoad(true);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("caption", data.caption);
    formData.append("card_description", data.card_description);
    formData.append("course_description", data.course_description);
    formData.append("course_objective", data.course_objective);
    formData.append("learn", data.learn);
    formData.append("roles_in_industry", data.roles_in_industry);
    formData.append("course_highlights", data.course_highlights);
    formData.append("price", data.price);
    formData.append("file", data.image[0]);
    formData.append("display_video_url", data.display_video_url);

    try {
      const res = await axios.put(
        `${BaseUrl}/course/${selectedCourse}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setLoad(false);
      console.log("Course updated successfully:", res?.data?.message);
      setCourses((prev) =>
        prev.map((item) =>
          item._id === selectedCourse
            ? {
                ...item,
                title: data.title,
                caption: data.caption,
                card_description: data.card_description,
                course_description: data.course_description,
                course_objective: data.course_objective,
                learn: data.learn,
                roles_in_industry: data.roles_in_industry,
                course_highlights: data.course_highlights,
                price: data.price,
                category: data.category,
                file: data.image[0],
                display_video_url: data.display_video_url,
              }
            : item
        )
      );
      toast.success(res.data.message, { autoClose: 3000 });
      reset(); // Reset form fields on success
      handleCloseDialog1(); // Close the dialog after submission
      setLectures((prev) =>
        prev.map((item) =>
          item._id === selectedCourse
            ? {
                ...item,
                title: data.title,
                description: data.description,
                video_url: data.video_url,
              }
            : item
        )
      );
    } catch (error) {
      setLoad(false);
      toast.error(error?.response?.data?.message, { autoClose: 3000 });
      if (error?.response?.data?.message === "login first or token expired") {
        sessionStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <Box p={0}>
      {/* Courses Section */}
      <ToastContainer />
      {hide ? (
        <Box>
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
          filteredCourse.map((data,index) => (
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
                      width: { xs: "100%", sm: 300 }, // Full width on small screens, 300px on larger screens
                      height: { xs: 200, sm: "auto" }, // Set fixed height on small screens
                      objectFit: "cover", // Make sure image covers the container
                      cursor: "pointer",
                    }}
                    image={data.image}
                    alt=""
                    onClick={() => lectureShow(data?._id)}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // flex: "1 0 auto",
                    }}
                  >
                    <CardContent
                      sx={{ cursor: "pointer" }}
                      onClick={() => lectureShow(data?._id)}
                    >
                      <Typography component="div" variant="h5">
                        {data?.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary", wordWrap: "break-word" }}
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

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }, // Stack buttons vertically on small screens, row on larger screens
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Button
                        startIcon={<DeleteIcon />}
                        sx={{
                          backgroundColor: "#e53935",
                          color: "#fff",
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "40%",
                            lg: "30%",
                          }, // Full width button on small screens
                          padding: "8px 16px",
                          fontSize: "1rem",
                          textTransform: "none",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#c62828",
                          },
                          mb: { xs: "10px", sm: 0 }, // Adjust bottom margin for small screens
                        }}
                        onClick={() => handleDeleteClick(data?._id)}
                      >
                        Delete
                      </Button>

                      <Button
                        startIcon={<EditIcon />}
                        sx={{
                          backgroundColor: "#0d47a1",
                          color: "#fff",
                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "40%",
                            lg: "30%",
                          }, // Full width button on small screens
                          padding: "8px 16px",
                          fontSize: "1rem",
                          textTransform: "none",
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#08306b",
                          },
                        }}
                        onClick={() => handleEditCourse(data?._id)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>
                </Card>

                <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this Course? This action
                      cannot be undone.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      No
                    </Button>
                    <Button
                      onClick={confirmCourseDelete}
                      color="secondary"
                      autoFocus
                    >
                      Yes, Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            ))):( <Grid container spacing={2} textAlign="center">
              <Grid item xs={12} sm={12} md={12} lg={12}>
              <p style={{fontSize:"1.2rem",marginTop:"50px"}}>No courses found.</p>
              </Grid>
            </Grid>)}
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

          {/* Categories Section */}
          <Typography
            variant="h5"
            style={{ marginBottom: "30px", marginTop: "50px" }} // Added margin to separate from courses
          >
            Categories ({categories.length} items)
          </Typography>
          {categories.length === 0 ? (
            <center style={{ padding: "40px" }}>
              <p>No categories are added yet.</p>
            </center>
          ) : null}
          <Grid container spacing={2}>
            {categories.slice(0, visibleCategories)?.map((data, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
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
                      height: "170px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {data?.category_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data?.description.length > 100
                        ? `${data?.description.slice(0, 100)}...`
                        : data?.description}
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
                onClick={loadMoreCategories}
              >
                Load More
              </Button>
            </Box>
          )}

          <Dialog
            open={openDialog1}
            onClose={handleCloseDialog1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                marginBottom="20px"
              >
                Are you sure you want to Edit this course?
              </DialogContentText>

              <Box sx={{ width: "100%", maxWidth: 700 }}>
                <Typography
                  variant="body2"
                  textAlign="center"
                  marginBottom="20px"
                  color="red"
                >
                  * To get a new line/point in student course section frontend
                  you have to start the line from new line using cntl+shift.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit1)} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        {...register("title")}
                        fullWidth
                        focused
                        label="Title"
                        variant="outlined"
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
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("caption")}
                        fullWidth
                        focused
                        label="Caption"
                        variant="outlined"
                        InputProps={{
                          sx: {
                            borderRadius: "22px",
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
                        error={!!errors.caption}
                        helperText={errors.caption?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("card_description")}
                        fullWidth
                        variant="outlined"
                        focused
                        label="Card Description"
                        multiline
                        rows={4}
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
                        error={!!errors.card_description}
                        helperText={errors.card_description?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("course_description")}
                        fullWidth
                        focused
                        label="Course Description"
                        variant="outlined"
                        multiline
                        rows={4}
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
                        error={!!errors.course_description}
                        helperText={errors.course_description?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("course_objective")}
                        fullWidth
                        variant="outlined"
                        multiline
                        focused
                        label="Course Objective"
                        rows={3}
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
                        error={!!errors.course_objective}
                        helperText={errors.course_objective?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("learn")}
                        fullWidth
                        variant="outlined"
                        multiline
                        focused
                        label="Learn"
                        rows={4}
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
                        error={!!errors.learn}
                        helperText={errors.learn?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("roles_in_industry")}
                        fullWidth
                        focused
                        label="Roles In Industry"
                        variant="outlined"
                        multiline
                        rows={3}
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
                        error={!!errors.roles_in_industry}
                        helperText={errors.roles_in_industry?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("course_highlights")}
                        fullWidth
                        focused
                        label="Course Highlights"
                        variant="outlined"
                        multiline
                        rows={3}
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
                        error={!!errors.course_highlights}
                        helperText={errors.course_highlights?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...register("price")}
                        fullWidth
                        variant="outlined"
                        type="number"
                        focused
                        label="Price"
                        error={!!errors.price}
                        helperText={errors.price?.message}
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
                      <TextField
                        {...register("display_video_url")}
                        fullWidth
                        focused
                        label="Video Url"
                        variant="outlined"
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
                        error={!!errors.display_video_url}
                        helperText={errors.display_video_url?.message}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.image}>
                        <Button
                          component="label"
                          variant="outlined"
                          sx={{
                            backgroundColor: "#0d47a1",
                            color: "#fff",
                            padding: "5px 24px",
                            fontSize: "1rem",
                            textTransform: "none",
                            borderRadius: "50px",
                            "&:hover": {
                              backgroundColor: "#08306b",
                            },
                          }}
                        >
                          Upload Image
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            {...register("image")} // Registering the input
                            onChange={(e) => {
                              const files = e.target.files;
                              setValue("image", files); // Set the file value
                              setName(files[0]?.name || ""); // Set file name
                            }}
                          />
                        </Button>
                        {name && (
                          <span
                            style={{
                              fontWeight: 100,
                              fontSize: "0.9rem",
                              marginTop: "5px",
                              marginLeft: "10px",
                            }}
                          >
                            File name: {name}
                          </span>
                        )}
                        <FormHelperText>{errors.image?.message}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog1} color="primary">
                No
              </Button>
              <Button
                onClick={handleSubmit(onSubmit1)}
                color="primary"
                autoFocus
              >
                Yes, Edit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : (
        <Box>
          <Button onClick={(e)=>setHide(true)} startIcon={<KeyboardBackspace/>} // Add Delete Icon
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
                        marginLeft:"0px"
                      }} >Back</Button>
          <Typography
            variant="h5"
            style={{ marginBottom: "30px", fontSize: "1.7rem" }}
          >
            Lectures ({lectures.length} items)
          </Typography>
          {lectures.length === 0 ? (
            <center style={{ padding: "40px" }}>
              <p>No lectures are added yet.</p>
            </center>
          ) : null}
          <Grid container spacing={2}>
            {lectures?.map((data, index) => (
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
               
                  {activeVideo === index ? (
                    // YouTube Video Embed without autoplay
                    <iframe
                      width="100%"
                      height="250"
                      src={`https://www.youtube.com/embed/${extractVideoId(data?.video_url)}`}
                      title={data?._id}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // YouTube Thumbnail with Play Button
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${extractVideoId(data?.video_url)}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        width="100%"
                        height="250"
                        style={{ objectFit: "cover" }}
                      />

                      {/* Play Button Overlay */}
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "30%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "red",
                          fontSize: "3.187rem",
                        }}
                        onClick={() => handleVideoPlay(index)} // Play video on click
                      >
                        <PlayCircleOutlineIcon sx={{ fontSize: "2.8rem" }} />
                      </IconButton>
                    </>
                  )}


                  <CardContent
                    sx={{
                      height: "130px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                     
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                    <span style={{fontSize:"1.3rem",color:"blueviolet",fontWeight:"600"}}>#{index+1}</span> {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                     
                        {data.description}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: "text.secondary" }}
                      >
                        Created At:{" "}
                        {dayjs(data?.createdAt).format("Do MMM YYYY")}
                      </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap:"5px"
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
                        marginLeft:"10px"
                      }}
                      onClick={(e) => handleDeleteClick(data?._id)}
                    >
                      Delete
                    </Button>

                   
                    <Button
                      startIcon={<EditIcon />} // Add Edit Icon
                      sx={{
                        backgroundColor: "#0d47a1", // Blue color for Edit
                        color: "#fff",
                        width: {
                          xs: "100%",
                          sm: "100%",
                          md: "40%",
                          lg: "30%",
                        },
                        padding: "5px 16px", // Adjust padding
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#08306b", // Darker shade on hover
                        },
                        marginBottom: "10px",
                      }}
                      onClick={(e) => handleEditClick(data?._id)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this lecture? This action cannot
                be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                No
              </Button>
              <Button onClick={confirmDelete} color="secondary" autoFocus>
                Yes, Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openDialog1}
            onClose={handleCloseDialog1}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                marginBottom="20px"
              >
                Are you sure you want to Edit this lecture?
              </DialogContentText>

              <form onSubmit={firstSchemaHandleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      {...firstSchemaregister("title", {
                        required: "Title is required",
                      })} // Use register here
                      fullWidth
                      variant="outlined"
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
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      {...firstSchemaregister("description", {
                        required: "Description is required",
                      })} // Use register here
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
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
                      error={!!firstSchemaerror.description}
                      helperText={firstSchemaerror.description?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      {...firstSchemaregister("video_url", {
                        required: "Video URL is required",
                      })} // Use register here
                      fullWidth
                      variant="outlined"
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
                      error={!!firstSchemaerror.video_url}
                      helperText={firstSchemaerror.video_url?.message}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog1} color="primary">
                No
              </Button>
              <Button
                onClick={firstSchemaHandleSubmit(onSubmit)}
                color="primary"
                autoFocus
              >
                Yes, Edit
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};
