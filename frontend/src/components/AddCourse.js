import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText
} from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  course_description: Yup.string().required('Course description is required'),
  course_objective: Yup.string().required('Course objective is required'),
  roles_in_industry: Yup.string().required('Roles in industry are required'),
  course_highlights: Yup.string().required('Course highlights are required'),
  price: Yup.number().required('Price is required').min(1, 'Price must be greater than 0'),
  category: Yup.string().required('Category is required'),
  image: Yup.mixed().required('Image is required'),
});

export const AddCourse = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('course_description', data.course_description);
    formData.append('course_objective', data.course_objective);
    formData.append('roles_in_industry', data.roles_in_industry);
    formData.append('course_highlights', data.course_highlights);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('image', data.image[0]);

    try {
      const response = await axios.post(`/course/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Course added successfully:', response.data);
      reset(); // Reset form fields on success
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper sx={{ padding: 2, width: '100%', maxWidth: 700 }}>
       
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
                    label="Course Title"
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="course_description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Course Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    error={!!errors.course_description}
                    helperText={errors.course_description?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="course_objective"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Course Objective"
                    variant="outlined"
                    multiline
                    rows={3}
                    error={!!errors.course_objective}
                    helperText={errors.course_objective?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="roles_in_industry"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Roles in Industry"
                    variant="outlined"
                    error={!!errors.roles_in_industry}
                    helperText={errors.roles_in_industry?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="course_highlights"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Course Highlights"
                    variant="outlined"
                    multiline
                    rows={3}
                    error={!!errors.course_highlights}
                    helperText={errors.course_highlights?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Price"
                    variant="outlined"
                    type="number"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} fullWidth>
                      <MenuItem value="Web Development">Web Development</MenuItem>
                      <MenuItem value="Data Science">Data Science</MenuItem>
                      <MenuItem value="Design">Design</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.image}>
                <Button component="label" variant="outlined">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setValue('image', e.target.files)}
                  />
                </Button>
                <FormHelperText>{errors.image?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};


