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
  Divider,
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export const DeleteDpps = () => {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/dpp/all`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setMaterials(response.data.dpp); // Adjust this based on your actual response structure
        setFilteredMaterials(response.data.dpp); // Initialize filtered materials
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
      axios.delete(`${BaseUrl}/dpp/${selectedMaterialId}`, {
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

        toast.error(error?.response?.data?.message,{autoClose:3000});
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
      console.error('Error deleting dpp:', error);
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
        placeholder="Search Dpps"
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
        sx={{width:{lg:"50%",md:"50%",sm:"80%",xs:"100%"}}}
        margin="normal"
      />
      
      <List>
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <>
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
            <Divider/>
            </>
         
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" marginTop="10%" textAlign="center">
            No Dpps found with this name.
          </Typography>
        )}
      </List>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this Dpp?
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


