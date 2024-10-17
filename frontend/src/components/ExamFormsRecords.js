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
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export const ExamFormsRecords = () => {
  const [submissions, setSubmissions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState(0);

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
        setSubmissions(response.data.submissions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Fetch submission details when dialog opens
  const handleCardClick = (submissionId) => {
    setOpenDialog(true);
    axios
      .get(`${process.env.REACT_APP_BASEURl}/exam/submission/${submissionId}`,{
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      .then((response) => {
        setSelectedSubmission(response.data.submission);
        setMarks(response.data.submission.marks); // Initialize marks field
       
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle dialog close
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedSubmission(null);
  };

  // Handle marks update
  const handleMarksUpdate = () => {
    const config = {
      method: "put",
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={4}>
        {submissions.map((submission) => (
          <Grid item xs={12} sm={6} md={4} key={submission._id}>
            <Card
              sx={{ cursor: "pointer", boxShadow: 3 }}
              onClick={() => handleCardClick(submission._id)}
            >
              <CardContent>
                <Typography variant="h6">
                  Applicant ID: {submission.applicant}
                </Typography>
                <Typography variant="body2">
                  Exam Application: {submission.examApplication}
                </Typography>
                <Typography variant="body2">Status: {submission.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
            <Button onClick={handleMarksUpdate} variant="contained" color="primary">
              Update Marks
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};
