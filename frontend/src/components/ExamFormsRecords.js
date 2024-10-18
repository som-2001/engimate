import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export const ExamFormsRecords = () => {
  const [submissions, setSubmissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState(0);
  const [load, setLoad] = useState(true);
  const [loadingView, setLoadingView] = useState([]); // Track which cards are loading
  const [loadMarks, setLoadMarks] = useState(false);

  // Fetch all submissions
  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASEURl}/exam/getsubmissions/all/`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Use session storage token
      },
    };

    axios
      .request(config)
      .then((response) => {
        setLoad(false);
        setSubmissions(response.data.submissions);
        setLoadingView(Array(response.data.submissions.length).fill(false)); // Initialize loading states for each submission
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }, []);

  // Fetch submission details when dialog opens
  const handleCardClick = (submissionId, index) => {
    // Set the current card to loading
    console.log(loadingView);
    const updatedLoading = [...loadingView];
    console.log(updatedLoading);
    updatedLoading[index] = true;
    setLoadingView(updatedLoading);

    axios
      .get(`${process.env.REACT_APP_BASEURl}/exam/submission/${submissionId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSelectedSubmission(response.data.submission);
        setMarks(response.data.submission.marks); // Initialize marks field
        setOpenDialog(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // Set loading to false after the API call is finished
        updatedLoading[index] = false;
        setLoadingView(updatedLoading);
      });
  };

  // Handle dialog close
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedSubmission(null);
  };

  // Handle marks update
  const handleMarksUpdate = () => {
    setLoadMarks(true);
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURl}/exam/update-marks/${selectedSubmission._id}`,
      data: { marks },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Replace with actual token
      },
    };

    axios
      .request(config)
      .then(() => {
        alert("Marks updated successfully");
        handleClose();
        setLoadMarks(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadMarks(false);
      });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={4} sx={{justifyContent:"center"}}>
        {load ? (
          // Display skeletons when loading
          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{
              padding: "16px", // Internal padding
              margin: "16px",
            }}
          >
            {[...Array(3)].map((_, index) => (
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
            ))}
          </Grid>
        ) : // Display submissions when data is loaded
        submissions.length === 0 ? (
          <Typography variant="body1" color="textSecondary" sx={{marginTop:{xs:"50%",sm:"50%",md:'20%'}}} textAlign="center">
          No Exam Forms found.
        </Typography>
        ) : (
          submissions.map((submission, index) => (
            <Grid item xs={12} sm={12} md={4} key={submission._id}>
              <Card
                sx={{
                  backgroundColor: "#f5f5f5", // Light background for contrast
                  borderRadius: "15px", // Softer edges
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Custom shadow for depth
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth hover effect
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)", // Slight scaling on hover
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
                  },
                  padding: "16px", // Internal padding
                  margin: "16px", // Spacing between cards
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Applicant ID: {submission.applicant}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: "8px", color: "#666" }}
                  >
                    Exam Application: {submission.examApplication}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "8px",
                      color:
                        submission.status === "submitted" ? "green" : "red", // Conditional color for status
                    }}
                  >
                    Status: {submission.status}
                  </Typography>
                </CardContent>

                {/* Show CircularProgress while loading */}
                <Button
                  onClick={() => handleCardClick(submission._id, index)}
                  disabled={loadingView[index]} // Disable the button when loading
                  startIcon={
                    loadingView[index] ? <CircularProgress size={20} /> : null
                  }
                >
                  {loadingView[index] ? "" : "View"}
                </Button>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Dialog to show submission details */}
      {selectedSubmission && (
        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Submission Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Applicant ID: {selectedSubmission.applicant}
            </Typography>
            <Typography variant="body1">
              Exam Application ID: {selectedSubmission.examApplication}
            </Typography>
            <Typography variant="body1">
              Status: {selectedSubmission.status}
            </Typography>
            <Box mt={2}>
              {/* Display PDF using iframe */}
              <iframe
                src={selectedSubmission.fileData}
                title="Submission PDF"
                width="100%"
                height="400px"
                style={{ border: "none" }}
              />
            </Box>
            {/* Download Button */}
            <Box mt={2} textAlign="right">
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                href={selectedSubmission.fileData}
                download="submission.pdf"
              >
                Download PDF
              </Button>
            </Box>
            {/* Marks Field */}
            <Box mt={2}>
              <TextField
                label="Marks"
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={handleMarksUpdate}
              variant="contained"
              color="primary"
              disabled={loadMarks}
            >
              Update Marks
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
