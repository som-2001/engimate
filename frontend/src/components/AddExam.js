import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  FormHelperText,
  InputLabel,
  FormControl,
  CircularProgress,
  ListSubheader,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  pdf: Yup.mixed()
    .required("PDF file is required")
    .test("fileType", "File should be a PDF", (value) => {
      if (!value || value.length === 0) return false; // If no file is uploaded
      return value[0]?.type === "application/pdf"; // Ensure it's a PDF
    })
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value || value.length === 0) return false;
      return value[0]?.size <= 5 * 1024 * 1024; // 5MB in bytes
    }),
  course: Yup.string().required("Course is required"),
});

export const AddExam = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [result, setResult] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [name, setName] = React.useState("");
  const [search, setSearch] = React.useState("")
  const navigate = useNavigate();
  const [filteredResult, setFilteredResult] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURl}/category-course/detail/all`)
      .then((res) => {
        setResult(res?.data?.categoryCourse); // Assuming the API returns categories with their respective courses
        setFilteredResult(res?.data?.categoryCourse);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const onSubmit = async (data) => {
    try {
      setLoad(true);

      // Prepare form data for submission
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", data.pdf[0]); // Assuming the pdf is a file input
      formData.append("course", data.course);

      // Post the data to the server
      axios
        .post(`${process.env.REACT_APP_BASEURl}/add/exam/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoad(false);
          console.log("Exam Form added successfully:", res?.data?.message);
          toast.success(res.data.message, { autoClose: 3000 });
          setName("");
          reset(); // Reset form fields on success
        })
        .catch((error) => {
          setLoad(false);
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
    } catch (error) {
      setLoad(false);
      console.error("Error adding lecture:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
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
        }}
      >
        <Grid container spacing={2}>
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
                src="../images/elearning3.png" // Add your image URL here
                alt="Form Side "
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
          <Grid item xs={12} sm={12} md={7}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        label="Module"
                        variant="outlined"
                        placeholder="Prefered way:-Coursename-ExamForm-serialno."
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
                  <FormControl fullWidth error={!!errors.pdf}>
                    <Button
                      component="label"
                      variant="outlined"
                      sx={{
                        backgroundColor: "blueviolet",
                        color: "#fff",
                        padding: "5px 24px",
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#08306b",
                        },
                      }}
                    >
                      SELECT A FILE
                      <input
                        type="file"
                        hidden
                        accept="application/pdf"
                        onChange={(e) => {
                          if (e.target.files.length) {
                            setValue("pdf", e.target.files); // Set the selected file
                            setName(e.target.files[0].name);
                          }
                        }}
                      />
                    </Button>
                    {name !== "" && (
                      <span
                        style={{
                          fontWeight: 100,
                          fontSize: "0.9rem",
                          marginTop: "5px",
                          marginLeft: "10px",
                        }}
                      >
                        File name:- {name}
                      </span>
                    )}
                    <FormHelperText>{errors.pdf?.message}</FormHelperText>
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
                        marginBottom: "20px",
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
