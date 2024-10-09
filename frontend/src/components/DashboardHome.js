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

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  video_url: Yup.string()
    .url("Enter a valid URL")
    .required("Video URL is required"),
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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
 
  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
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

        setValue("title", res.data.lecture.title);
        setValue("description", res.data.lecture.description);
        setValue("video_url", res.data.lecture.video_url);
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

  const confirmCourseDelete=()=>{
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
  }
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
      reset(); // Reset form fields on success
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

  return (
    <Box p={0}>
      {/* Courses Section */}
      <ToastContainer />
      {hide ? (
        <Box>
          <Typography variant="h5" style={{ marginBottom: "30px" }}>
            Courses
          </Typography>
          {courses.length === 0 ? (
            <center style={{ padding: "40px" }}>
              <p>No courses are added yet.</p>
            </center>
          ) : null}
          <Grid container spacing={2}>
            {courses.slice(0, visibleCourses)?.map((data, index) => (
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
                    cursor: "pointer",
                  }}
                  
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={data?.image}
                    alt={data?.title} // Add alt for better accessibility
                    sx={{ objectFit: "cover",cursor:"pointer" }}
                    onClick={(e) => lectureShow(data?._id)}
                  />
                  <CardContent
                    sx={{
                      height: "140px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      cursor:"pointer"
                    }}
                    onClick={(e) => lectureShow(data?._id)}
                  >
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {data?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data.card_description.length > 70
                        ? `${data.card_description.slice(0, 70)}...`
                        : data.card_description}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Delete Button */}
                    <Button
                      startIcon={<DeleteIcon />} // Add Delete Icon
                      sx={{
                        backgroundColor: "#e53935", // Red color for Delete
                        color: "#fff",
                        width: "70%",
                        padding: "5px 16px", // Adjust padding
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#c62828", // Darker shade on hover
                        },
                        marginBottom: "10px",
                      }}
                      onClick={(e) => handleDeleteClick(data?._id)}
                    >
                      Delete
                    </Button>

                    {/* Edit Button */}
                    <Button
                      startIcon={<EditIcon />} // Add Edit Icon
                      sx={{
                        backgroundColor: "#0d47a1", // Blue color for Edit
                        color: "#fff",
                        width: "70%",
                        padding: "5px 16px", // Adjust padding
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#08306b", // Darker shade on hover
                        },
                        marginBottom: "20px",
                      }}
                      onClick={(e) => handleEditClick(data?._id)}
                    >
                      Edit
                    </Button>
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
                Are you sure you want to delete this Course? This action cannot
                be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                No
              </Button>
              <Button onClick={confirmCourseDelete} color="secondary" autoFocus>
                Yes, Delete
              </Button>
            </DialogActions>
          </Dialog>
              </Grid>
            ))}
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
            Categories
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
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h5"
            style={{ marginBottom: "30px", fontSize: "1.7rem" }}
          >
            Lectures
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
                  {/* Check if the current video is being played */}
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
                      {data?.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {data.description.length > 150
                        ? `${data.description.slice(0, 150)}...`
                        : data.description}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Delete Button */}
                    <Button
                      startIcon={<DeleteIcon />} // Add Delete Icon
                      sx={{
                        backgroundColor: "#e53935", // Red color for Delete
                        color: "#fff",
                        width: "70%",
                        padding: "5px 16px", // Adjust padding
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#c62828", // Darker shade on hover
                        },
                        marginBottom: "10px",
                      }}
                      onClick={(e) => handleDeleteClick(data?._id)}
                    >
                      Delete
                    </Button>

                    {/* Edit Button */}
                    <Button
                      startIcon={<EditIcon />} // Add Edit Icon
                      sx={{
                        backgroundColor: "#0d47a1", // Blue color for Edit
                        color: "#fff",
                        width: "70%",
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

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      {...register("title", { required: "Title is required" })} // Use register here
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
                      {...register("description", {
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
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      {...register("video_url", {
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
                      error={!!errors.video_url}
                      helperText={errors.video_url?.message}
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
                onClick={handleSubmit(onSubmit)}
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
