import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const DeleteMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const navigate=useNavigate();


  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/materials/all`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setMaterials(response.data.materials); // Adjust this based on your actual response structure
        setFilteredMaterials(response.data.materials); // Initialize filtered materials
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  // Filter materials based on search term
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = materials.filter((material) =>
      material.title.toLowerCase().includes(term.toLowerCase()) // Adjust based on your data structure
    );
    setFilteredMaterials(filtered);
  };

  const handleDeleteClick = (id) => {
    setSelectedMaterialId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      axios.delete(`${BaseUrl}/material/${selectedMaterialId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }).then(res=>{

        toast.success(res.data.message,{autoClose:3000});
        setMaterials((prevMaterials) =>
            prevMaterials.filter((material) => material._id !== selectedMaterialId)
          );
          setFilteredMaterials((prev) =>
            prev.filter((material) => material._id !== selectedMaterialId)
          );
          setOpenDialog(false);
      }).catch(error=>{
        console.error("Error fetching categories", error);
            if (
              error?.response?.data?.message === "login first or token expired"
            ) {
              if (sessionStorage?.getItem("token")) {
                sessionStorage?.removeItem("token");
              }
              navigate("/login");
            }
      })
     
     
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMaterialId(null);
  };

  return (
    <Box>
      {/* Search Input */}

      <ToastContainer/>
      <TextField
        label="Search Materials"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{width:{lg:"50%",md:"50%",sm:"80%",xs:"100%"}}}
        margin="normal"
      />
      
      <List>
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <ListItem key={material._id} secondaryAction={
              <Button
                color="error"
                onClick={() => handleDeleteClick(material._id)}
              >
                Delete
              </Button>
            }>
              <ListItemText primary={material.title} /> {/* Adjust based on your data structure */}
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" marginTop="10%" textAlign="center">
            No materials found with this name.
          </Typography>
        )}
      </List>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this material?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


