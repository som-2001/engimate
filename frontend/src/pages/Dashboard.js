import * as React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, CssBaseline, Divider
} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon,
  Category as CategoryIcon,
  WbSunnyRounded
} from '@mui/icons-material';
import { DashboardHome } from '../components/DashboardHome';
import { AddLecture } from '../components/AddLecture';
import { AddCategory } from '../components/AddCategory';
import { AddCourse } from '../components/AddCourse';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import BookIcon from '@mui/icons-material/Book';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { Addpdf } from '../components/Addpdf';
import { AddDpp } from '../components/AddDpp';
import { AddExam } from '../components/AddExam';
const drawerWidth = 280;

const NAV_ITEMS = [
  { text: 'Dashboard', icon: <DashboardIcon />, content: <DashboardHome />, heading: "Dashboard" },
  { text: 'Add Lecture', icon: <VideoCameraFrontIcon />, content: <AddLecture />, heading: "Add Lecture" },
  { text: 'Add Category', icon: <CategoryIcon />, content: <AddCategory />, heading: "Add Category" },
  { text: 'Add Course', icon: <BarChartIcon />, content: <AddCourse />, heading: "Add Course" },
  { text: 'Upload Pdfs', icon: <PictureAsPdfIcon />, content: <Addpdf />, heading: "Upload Pdfs" },
  { text: 'Upload Dpps', icon: <BookIcon />, content: <AddDpp />, heading: "Upload Dpps" },
  { text: 'Upload Exam Form', icon: <QuizIcon />, content: <AddExam />, heading: "Upload Exam Form" }
];

function Dashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedContent, setSelectedContent] = React.useState(NAV_ITEMS[0].content); // Default to first item
  const [selectedHeader, setSelectedHeader] = React.useState(NAV_ITEMS[0].heading); // Default to first item
  const [darkMode, setDarkMode] = React.useState(false); // Manage dark mode state

  const theme = useTheme();
  
  // Handle drawer toggle for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

  const handleNavigationClick = (content, heading) => {
    setSelectedContent(content); // Update content based on the selected item
    setSelectedHeader(heading);
    if(heading==='Dashboard'){
      window.location.reload();
    }
    if (mobileOpen) {
      setMobileOpen(false); // Close the drawer on mobile after selection
    }
  };

  const drawer = (
    <div>
      <List sx={{ marginTop: "50%" }}>
        {NAV_ITEMS.map((item, index) => (
          <ListItem button key={index} style={{ cursor: "pointer" }} onClick={() => handleNavigationClick(item.content, item.heading)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Define a light and dark theme using Material-UI's theming system
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#ffffff',
      },
      text: {
        primary: '#000000',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
      },
      text: {
        primary: '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 ,backgroundColor:"white"}} >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <img src='./images/logo.png' alt='' style={{ width: "150px",cursor:"pointer" }} onClick={(e)=>window.location.href="/"}/>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              <WbSunnyRounded />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar for larger screens */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, marginTop: "20%" }}
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

        {/* Right side content for large screens */}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 5, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Typography variant="h5" gutterBottom textAlign="center" margin="normal">
            {selectedHeader}
          </Typography>
          <center>
            <Divider sx={{ marginBottom: "50px", width: { lg: "8%", xs: "30%", sm: "18%", md: "8%" }, backgroundColor: "blue" }} />
          </center>
          {selectedContent}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
