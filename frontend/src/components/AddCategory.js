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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);

    try {
      const response = await axios.post(`${BaseUrl}/categories/add/`, formData, {
        headers: { "Content-Type": "multipart/form-data",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`
         },
      });
      console.log("Category added successfully:", response.data);
      toast.success(response.data.message, { autoClose: 3000 });
      reset(); // Reset form fields on success

    } catch (error) {
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
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.file}>
                <Button component="label" variant="contained" color="primary">
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
