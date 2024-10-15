import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // Import advancedFormat for ordinal dates

dayjs.extend(advancedFormat);

export const DeleteMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [load,setLoad]=useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const navigate = useNavigate();
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfDownload, setpdfDownload] = useState("");
  const [openpdfDialog, setOpenpdfDialog] = useState(false); // To handle dialog open/close

  const handleCardClick1 = (data) => {
    setSelectedPdf(data);

    axios
      .get(
        `${process.env.REACT_APP_BASEURl}/materials-search/?title=${data.title}&material_id=${data._id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.material?.[0]);
        const base64Pdf = res?.data?.material?.[0]?.fileData?.[0].split(",")[1]; // Extract base64 part
        const binaryPdf = atob(base64Pdf); // Convert base64 to binary data

        // Create an array buffer for the binary data
        const len = binaryPdf.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryPdf.charCodeAt(i);
        }

        // Create a Blob with the PDF binary data
        const blob = new Blob([bytes], { type: "application/pdf" });

        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);
        console.log("URL:", url);
        setpdfDownload(url);
        // console.log(res?.data?.dpp?.fileData?.[0])
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      });
    setOpenpdfDialog(true);
  };

  const handleCloseDialog1 = () => {
    setOpenpdfDialog(false);
    setSelectedPdf(null);
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASEURl}/materials/all`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setMaterials(response.data.materials); // Adjust this based on your actual response structure
        setFilteredMaterials(response.data.materials); // Initialize filtered materials
      } catch (error) {
        console.error("Error fetching materials:", error);
        if (error?.response?.data?.message === "login first or token expired") {
          if (sessionStorage?.getItem("token")) {
            sessionStorage?.removeItem("token");
          }
          navigate("/login");
        }
      }
    };

    fetchMaterials();
  }, [navigate]);

  // Filter materials based on search term
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = materials.filter(
      (material) => material.title.toLowerCase().includes(term.toLowerCase()) // Adjust based on your data structure
    );
    setFilteredMaterials(filtered);
  };

  const handleDeleteClick = (id) => {
    setSelectedMaterialId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoad(true);
      axios
        .delete(`${process.env.REACT_APP_BASEURl}/materials/${selectedMaterialId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {

          setLoad(false);
          toast.success(res.data.message, { autoClose: 3000 });
          setMaterials((prevMaterials) =>
            prevMaterials.filter(
              (material) => material._id !== selectedMaterialId
            )
          );
          setFilteredMaterials((prev) =>
            prev.filter((material) => material._id !== selectedMaterialId)
          );
          setOpenDialog(false);
        })
        .catch((error) => {

          setLoad(false);
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
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMaterialId(null);
  };

  return (
    <Box>
      {/* Search Input */}

      <ToastContainer />
      <TextField
        placeholder="Search Materials"
        variant="outlined"
        value={searchTerm}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
        sx={{ width: { lg: "50%", md: "50%", sm: "80%", xs: "100%" } }}
        margin="normal"
      />

      <List>
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <>
              <ListItem
                key={material._id}
                secondaryAction={
                  <>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(material._id)}
                  >
                    Delete
                  </Button>
                  <Button
                  color="primary"
                  onClick={() => handleCardClick1(material)}
                >
                  view
                </Button>
                </>
                }
              >
                <ListItemText primary={material.title}  />{" "}
                {/* Adjust based on your data structure */}
              </ListItem>

              <Typography
                variant="body2"
                sx={{
                  marginLeft: "15px",
                  marginTop: "-10px",
                  marginBottom: "10px",
                }}
              >
                Created At: {dayjs(material.createdAt).format("Do MMM YYYY")}
              </Typography>
              <Divider/>
            </>
          ))
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            marginTop="10%"
            textAlign="center"
          >
            No pdfs found .
          </Typography>
        )}
      </List>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this pdf?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button disabled={load} onClick={handleConfirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
            open={openpdfDialog}
            onClose={handleCloseDialog1}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedPdf?.title} {/* Display title */}
            </DialogTitle>
            <DialogContent dividers>
              {/* Display PDF in an iframe */}
              {pdfDownload.length === 0 ? (
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    marginTop: "40px",
                    marginBottom: "40px",
                  }}
                >
                  Wait a moment,your pdf is loading...
                </p>
              ) : (
                <iframe
                  src={pdfDownload}
                  title={selectedPdf?.title}
                  width="100%"
                  height="500px"
                  style={{ border: "none" }}
                />
              )}
            </DialogContent>
            <DialogActions>
              {/* Download Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#25D366", // WhatsApp-like color for download button
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#1DA354", // Darker shade on hover
                  },
                }}
                
              >
                Download PDF
              </Button>
              <Button onClick={handleCloseDialog1} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
    </Box>
  );
};
