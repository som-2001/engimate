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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();
  const [name, setName] = React.useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category_name", data.category_name);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);

    try {
      setLoad(true);
      axios
        .post(`${process.env.REACT_APP_BASEURl}/categories/add/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoad(false);
          setName("");
          console.log("Category added successfully:", res.data);
          toast.success(res.data.message, { autoClose: 3000 });
          reset(); // Reset form fields on success
        })
        .catch((error) => {
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
      console.error("Error adding category:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "68vh",
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
                src="../images/elearning4.png" // Add your image URL here
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
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.file}>
                    <Button
                      component="label"
                      variant="contained"
                      color="primary"
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
                      CHOOSE A FILE
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          setValue("file", e.target.files);

                          setName(e.target.files[0].name);
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
                    <FormHelperText>{errors.file?.message}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <center>
                    <Button
                      type="submit"
                      disabled={load}
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
                        marginTop: "10px",
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
