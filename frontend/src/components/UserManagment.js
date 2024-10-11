import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Role is required"),
});

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [selectedUserId1, setSelectedUserId1] = useState(null);
  const [role,setRole]=useState('');
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // Fetch users from the API
    axios
      .get(`${BaseUrl}/users/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
        setLoading(false);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    setOpenDialog(true);
    setSelectedUserId(userId);
  };

  const handleEditUser = (userId, role) => {
    setOpenDialog1(true);
    setSelectedUserId1(userId);
    setValue("role", role);
    setRole(role);
    reset({role:role});
  };

  const confirmEditUser = (data) => {
    setUsers((users) =>
      users.map((item) =>
        item._id === selectedUserId1 ? { ...item, role: data.role } : item
      )
    );
    setOpenDialog1(false);
    setSelectedUserId1(null);
  };

  const confirmDeleteUser = () => {
    axios
      .delete(`${BaseUrl}/users/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== selectedUserId));
        setOpenDialog(false);
        setSelectedUserId(null);
      })
      .catch((error) => {
        console.error(error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
    setSelectedUserId1(null);
  };

  return (
    <Box p={2}>
      {loading ? (
        <Grid container spacing={4} justifyContent="center">
          {[...Array(3)].map(
            (
              _,
              index // Show 3 skeletons as placeholders
            ) => (
              <Grid item xs={12} sm={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton
                      variant="rectangular"
                      height={48}
                      sx={{ marginTop: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {users.length === 0 ? (
            <center>
              <p
                style={{
                  marginTop: "25%",
                  marginBottom: "10%",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                }}
              >
                No users currently available.
              </p>
            </center>
          ) : (
            users.map((user) => (
              <Grid item xs={12} sm={12} md={4} key={user._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Email:</b>{" "}
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      <b>Phone:</b>{" "}
                      <a href={`tel:${user.phone_number}`}>
                        {user.phone_number}
                      </a>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Course Enrolled:</b> {user.course_enrolled}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Specialization:</b> {user.specialization || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Role:</b> {user.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Purchased Courses:</b> {user.subscription.length}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <b>Referral Code:</b> {user.referral_code}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteUser(user._id)}
                      sx={{
                        backgroundColor: "#e53935",
                        color: "#fff",
                        padding: "5px 24px",
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#e53935",
                        },
                        marginTop: "20px",
                        marginRight: "10px",
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditUser(user._id, user.role)}
                      sx={{
                        backgroundColor: "#0d47a1",
                        color: "#fff",
                        padding: "5px 24px",
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "#0d47a1",
                        },
                        marginTop: "20px",
                      }}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this user?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Once deleted, the user will be
            permanently removed from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Role Dialog */}
      <Dialog
        open={openDialog1}
        onClose={handleCloseDialog1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="body1" marginBottom="10px">
          Are you sure you want to edit this user's role?
        </DialogTitle>
        <DialogContent>
          <Box >
            <form onSubmit={handleSubmit(confirmEditUser)}>
              {/* Role Selection */}
              <FormControl fullWidth >
                {/* <InputLabel id="role-label">Role</InputLabel> */}
                <Select
                  labelId="role-label"
                  focused
                  defaultValue={role}
                  label="Role"
                  {...register("role", { required: "Role is required" })} // Register with validation
                  error={!!errors.role} // Show error state if validation fails
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="instructor">Instructor</MenuItem>
                </Select>
              </FormControl>

              {/* Error message */}
              {errors.role && (
                <Typography variant="body2" color="error">
                  {errors.role.message}
                </Typography>
              )}

            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog1} color="secondary">
            Cancel
          </Button>
          <Button
                type="submit"
                color="primary"
                onClick={handleSubmit(confirmEditUser)}
              >
                Confirm Edit
              </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
