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
  Paper,
  MenuItem,
  Select,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@mui/material";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  video_url: Yup.string()
    .url("Enter a valid URL")
    .required("Video URL is required"),
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

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/course/1`, data); // Replace 1 with the course id dynamically
      console.log("Lecture added successfully:", response.data);
      reset(); // Reset form fields on success
    } catch (error) {
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
      <Paper sx={{ padding: 2, width: "100%", maxWidth: 600 }}>
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
                      <Select {...field} labelId="course-label" label="Course">
                        <MenuItem value="B.tech">B.Tech</MenuItem>
                        <MenuItem value="M.tech">M.Tech</MenuItem>
                        <MenuItem value="B.sc.">B.Sc.</MenuItem>
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
      </Paper>
    </Box>
  );
};
