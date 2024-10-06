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
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pages = ["My Course", "All Courses", "Refer & Earn"];
const settings = ["Home", "Contact Us","Log out"];

function UserNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path) => {

    console.log(path);
    if (String(path) === "/home") {
      navigate('/');
    }else if(String(path)==="/refer-& earn"){
      navigate('/refer-earn')
    }else {
      navigate(path);
    }
    handleCloseNavMenu(); // Close the menu after navigation
  };

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
                <MenuItem key={page} onClick={() => handleNavigate(`/${page.toLowerCase().replace(" ", "-")}`)}>
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
      </Container>
    </AppBar>
  );
}

export default UserNavbar;
