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
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import { useNavigate } from "react-router-dom";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate=useNavigate();

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
        console.error("Error fetching categories", error);
            if (
              error?.response?.data?.message === "login first or token expired"
            ) {
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

  const confirmDeleteUser = () => {
    // Call API to delete user
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
        setOpenDialog(false);
        console.error("Error fetching categories", error);
        if (
          error?.response?.data?.message === "login first or token expired"
        ) {
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

  return (
    <Box p={2}>
     {loading ? (
        <Grid container spacing={4} justifyContent="center">
          {[...Array(3)].map((_, index) => ( // Show 3 skeletons as placeholders
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="rectangular" height={48} sx={{ marginTop: 2 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {users.length===0 ? <center><p style={{marginTop:"25%",marginBottom:"10%",fontWeight:"500",fontSize:"1.5rem"}}>No users currently Available.</p></center>:users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {user.phone_number}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Course Enrolled: {user.course_enrolled}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Specialization: {user.specialization || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Role: {user.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Referral Code: {user.referral_code}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user._id)}
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
                      marginTop: "20px",
                    }}
                  >
                    Delete User
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
          <Button
            onClick={confirmDeleteUser}
            color="secondary"
            autoFocus
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

