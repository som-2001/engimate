import * as React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, CssBaseline
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { DashboardHome } from '../components/DashboardHome';
import { AddLecture } from '../components/AddLecture';
import { AddCategory } from '../components/AddCategory';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const NAV_ITEMS = [
  { text: 'Dashboard', icon: <DashboardIcon />, content: <DashboardHome/>,heading:"Dashboard" },
  { text: 'Add Lecture', icon: <ShoppingCartIcon />, content: <AddLecture/>,heading:"Add Lecture" },
  { text: 'Add Category', icon: <BarChartIcon />, content: <AddCategory/>,heading:"Add Category" },
];

function Dashboard() {

  const navigate=useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedContent, setSelectedContent] = React.useState(NAV_ITEMS[0].content); // Default to first item
  const [selectedHeader, setSelectedHeader] = React.useState(NAV_ITEMS[0].heading); // Default to first item
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  React.useEffect(() => {
    const token = sessionStorage?.getItem("token");
  
    if (token) {
      const decodedToken = jwtDecode(token);
  
      // Check if token is expired
      if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
        sessionStorage.removeItem("token"); // Clear expired token
        navigate("/login");
      } else {
        // Check if the role is either "admin" or "instructor"
        if (decodedToken.role === "admin" || decodedToken.role === "instructor") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
  

  const handleNavigationClick = (content,heading) => {
    setSelectedContent(content); // Update content based on the selected item
    setSelectedHeader(heading);

    if (mobileOpen) {
      setMobileOpen(false); // Close the drawer on mobile after selection
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          My Dashboard
        </Typography>
      </Toolbar>
      <List>
        {NAV_ITEMS.map((item, index) => (
          <ListItem button key={index} onClick={() => handleNavigationClick(item.content,item.heading)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img src='./images/logo.png' alt='' style={{width:"150px"}}/>
        </Toolbar>
      </AppBar>

      {/* Sidebar for larger screens */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
           
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
          {/* //right side content for large screens */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 5, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom textAlign="center">
          {selectedHeader}
        </Typography>
          {selectedContent}
      </Box>
    </Box>
  );
}

export default Dashboard;
