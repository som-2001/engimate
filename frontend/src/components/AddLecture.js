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
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required").max(100,"maximum 100 characters can be added."),
  video_url: Yup.string()
    .url("Enter a valid URL")
    .required("Video URL is required"),
  course:Yup.string().required("Course is required")
});


export const AddLecture = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [result,setResult]=React.useState([]);
  const [load,setLoad]=React.useState(false);
  const [key,setKey]=React.useState(false);
  const navigate=useNavigate();

  React.useEffect(() => {
    axios.get(`${BaseUrl}/course/all`).then((res) => {
      setResult(res?.data?.courses);
    }).catch(error=>{
      console.log(error);
    })
  }, []);

  const onSubmit = async (data) => {

    
      setLoad(true);
      axios.post(`${BaseUrl}/course/${data.course}`, {title:data.title ,description:data.description,video_url:data.video_url},{
        headers: {
          "Content-Type": 'application/json',
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`

        },
      }).then(res=>{
        setLoad(false);
        setKey(true);
        console.log("Lecture added successfully:", res?.data?.message);
        toast.success(res.data.message, { autoClose: 3000 });
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
      <ToastContainer/>

      <Box sx={{width: "100%", maxWidth: 800,boxShadow:{xs:0,sm:2},padding:{sm:2},backgroundColor:{sm:"transparent"},borderRadius:'10px' }}>
       
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
        src="../images/elearning.png" // Add your image URL here
        alt="Form Side "
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "15px",
          objectFit: "cover",
          height:"100%"
        }}
      />
    </Box>
  </Grid>

  {/* Right Side - Form */}
  <Grid item xs={12} sm={12} md={7}>
    <form onSubmit={handleSubmit(onSubmit)} >
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
                    borderRadius: "22px",
                    '&:hover': {
                      backgroundColor: "rgba(107, 169, 169, 0.1)",
                    },
                  },
                }}
                sx={{
                  borderRadius: "22px",
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'rgb(89, 139, 139)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(107, 169, 169)',
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
                InputProps={{
                  sx: {
                    borderRadius: "22px",
                    '&:hover': {
                      backgroundColor: "rgba(107, 169, 169, 0.1)",
                    },
                  },
                }}
                sx={{
                  borderRadius: "22px",
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'rgb(89, 139, 139)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(107, 169, 169)',
                    },
                  },
                }}
                error={!!errors.description}
                helperText={errors.description?.message}
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
                InputProps={{
                  sx: {
                    borderRadius: "22px",
                    '&:hover': {
                      backgroundColor: "rgba(107, 169, 169, 0.1)",
                    },
                  },
                }}
                sx={{
                  borderRadius: "22px",
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'rgb(89, 139, 139)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgb(107, 169, 169)',
                    },
                  },
                }}
                error={!!errors.video_url}
                helperText={errors.video_url?.message}
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
                    sx={{
                      borderRadius: "22px",
                      '&:hover': {
                        backgroundColor: "rgba(107, 169, 169, 0.1)",
                      },
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'rgb(89, 139, 139)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(107, 169, 169)',
                        },
                      },
                    }}
                  >
                    {result.map((course) => (
                      <MenuItem
                        key={course._id}
                        value={course._id}
                      >
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
              {load ? <CircularProgress size={30} /> : <span>Submit</span>}
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
