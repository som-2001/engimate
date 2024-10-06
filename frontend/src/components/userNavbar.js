import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const pages = ["My Course", "All Courses", "Refer & Earn"];
const settings = ["Home", "Contact Us","Log out"];

function UserNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false); // For the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {

    if (String(path) === "/home") {
      window.location.href='/';
    }else if(String(path)==="/log-out"){
      setOpenDialog(true);
    }else if(String(path)==="/refer-& earn"){
      window.location.href='/refer-earn'
    }else {
      window.location.href=`${path}`;
    }
    handleCloseNavMenu(); // Close the menu after navigation
  };
 const Logout=()=>{

  toast.success("Logging out",{autoClose:3000});
  window.location.href='/';
  if(sessionStorage.getItem('token'))
    sessionStorage.removeItem('token');

 }
  return (
    <AppBar position="static" style={{ backgroundColor: "whitesmoke" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CardMedia
            component="img"
            image={"../images/logo.png"}
            onClick={(e)=>navigate('/')}
            sx={{
              width: "150px",
              height: "auto",
              display: {
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
              },
              cursor:"pointer"
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
             
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} sx={{width:"150px"}} onClick={() => handleNavigate(`/${page.toLowerCase().replace(" ", "-")}`)}>
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleNavigate(`/${setting.toLowerCase().replace(" ", "-")}`)}>
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <CardMedia
            component="img"
            image={"../images/logo.png"}
            onClick={(e)=>navigate('/')}
            sx={{
              width: "150px",
              height: "auto",
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
              },
              cursor:"pointer"
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px" }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavigate(`/${page.toLowerCase().replace(" ", "-")}`)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              {settings.map((setting) => (
                <Button
                  key={setting}
                  onClick={() => handleNavigate(`/${setting.toLowerCase().replace(" ", "-")}`)}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {setting}
                </Button>
              ))}
            </Box>
          </Box>
        </Toolbar>

        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to Logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                No
              </Button>
              <Button onClick={Logout} color="primary" autoFocus>
                Yes, Logout
              </Button>
            </DialogActions>
          </Dialog>
      </Container>
    </AppBar>
  );
}

export default UserNavbar;
