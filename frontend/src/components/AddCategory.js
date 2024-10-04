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
  
  FormHelperText,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseUrl } from "./BaseUrl";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  category_name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed().required("File is required"),
 
});

export const AddCategory = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [load,setLoad]=React.useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);

    try {
      setLoad(true);
      const response = await axios.post(`${BaseUrl}/categories/add/`, formData, {
        headers: { "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`
         },
      });

      if(response){
        setLoad(false);
      }
      console.log("Category added successfully:", response.data);
      toast.success(response.data.message, { autoClose: 3000 });
      reset(); // Reset form fields on success

    } catch (error) {
      setLoad(false);
      console.error("Error adding category:", error);
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

      <Box sx={{ padding: 0, width: "100%", maxWidth: 600 }}>
       
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="category_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Category Name"
                    variant="outlined"
                    InputProps={{
                      sx: {
                        borderRadius: "22px", // Customize border radius
                        
                        '&:hover': {
                          backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "22px", // Outer border radius
                      
                      '& .MuiOutlinedInput-root': {
                        
                        '&:hover fieldset': {
                          borderColor: 'rgb(89, 139, 139)', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(107, 169, 169)', // Border color when focused
                        },
                      },
                    }}
                    error={!!errors.category_name}
                    helperText={errors.category_name?.message}
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
                        borderRadius: "22px", // Customize border radius
                  
                        '&:hover': {
                          backgroundColor: "rgba(107, 169, 169, 0.1)", // Background color on hover
                        },
                      },
                    }}
                    sx={{
                      borderRadius: "22px", // Outer border radius
                      
                      '& .MuiOutlinedInput-root': {
                       
                        '&:hover fieldset': {
                          borderColor: 'rgb(89, 139, 139)', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(107, 169, 169)', // Border color when focused
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
              <FormControl fullWidth error={!!errors.file}>
                <Button component="label" variant="contained" color="primary"
                 sx={{
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "#08306b",
                  },
                  
                }}>
                  Upload File
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setValue("file", e.target.files)}
                  />
                </Button>
                <FormHelperText>{errors.file?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
            <center><Button
                type="submit"
                disabled={load}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  backgroundColor: "#0d47a1",
                  color: "#fff",
                  width: "60%",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "#08306b",
                  },
                  marginTop: "30px",
                }}
              >
                {load ? <CircularProgress size={30}/> :<span>Submit</span>}
              </Button></center>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
