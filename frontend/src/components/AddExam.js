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
} from "@mui/material";
import { BaseUrl } from "./BaseUrl";
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
  }).test("fileSize", "File size must be less than 5MB", (value) => {
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
  const [name,setName]=React.useState('');
  const navigate=useNavigate();

  React.useEffect(() => {
    axios.get(`${BaseUrl}/course/all`).then((res) => {
      setResult(res?.data?.courses);
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoad(true);
      
      // Prepare form data for submission
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("pdf", data.pdf[0]); // Assuming the pdf is a file input
      formData.append("course", data.course);

      // Post the data to the server
      axios
        .post(`${BaseUrl}/course/${data.course}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoad(false);
          console.log("Lecture added successfully:", res?.data?.message);
          toast.success(res.data.message, { autoClose: 3000 });
          setName('');
          reset(); // Reset form fields on success
        }).catch (error=>{
            setLoad(false);
            toast.error(error?.response?.data?.message, { autoClose: 3000 });
            if(error?.response?.data?.message==='login first or token expired')
            {
              if(sessionStorage?.getItem("token"))
              {
                sessionStorage?.removeItem("token");
              }
              navigate('/login');
            }
          })
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

      <Box sx={{ width: "100%", maxWidth: 600 }}>
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
                )}
              />
            </Grid>

            

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.course}
                >
                  <InputLabel id="course-label">Course</InputLabel>
                  <Controller
                    name="course"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
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
                        {result.map((course) => (
                          <MenuItem key={course._id} value={course._id}>
                            {course.title}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.course && (
                    <FormHelperText>{errors.course.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.pdf}>
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
                  Upload PDF
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
                {name!=='' && <span style={{fontWeight:100,fontSize:"0.9rem",marginTop:"5px",marginLeft:'10px'}}>File name:- {name}</span>}
                <FormHelperText>{errors.pdf?.message}</FormHelperText>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <center>
                <Button
                  type="submit"
                  variant="contained"
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
                  {load ? <CircularProgress size={30} /> : <span>Submit</span>}
                </Button>
              </center>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
