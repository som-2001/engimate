import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon,
  Category as CategoryIcon,
  WbSunnyRounded,
} from "@mui/icons-material";
import { DashboardHome } from "../components/DashboardHome";
import { AddLecture } from "../components/AddLecture";
import { AddCategory } from "../components/AddCategory";
import { AddCourse } from "../components/AddCourse";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import QuizIcon from "@mui/icons-material/Quiz";
import BookIcon from "@mui/icons-material/Book";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { Addpdf } from "../components/Addpdf";
import { AddDpp } from "../components/AddDpp";
import { AddExam } from "../components/AddExam";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Stats } from "../components/Stats";
import { UserManagement } from "../components/UserManagment";
import { FaUser } from "react-icons/fa";
import { DeleteMaterials } from "../components/DeleteMaterials";
import { DeleteDpps } from "../components/DeleteDpps";
import ClearIcon from "@mui/icons-material/Clear";
import { ExamForms } from "../components/ExamForms";
import { ExamFormsRecords } from "../components/ExamFormsRecords";

const drawerWidth = 280;

const NAV_ITEMS = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    content: <DashboardHome />,
    heading: "Dashboard",
  },
  {
    text: "Add Category",
    icon: <CategoryIcon />,
    content: <AddCategory />,
    heading: "Add Category",
  },
  {
    text: "Add Course",
    icon: <BarChartIcon />,
    content: <AddCourse />,
    heading: "Add Course",
  },
  {
    text: "Add Lecture",
    icon: <VideoCameraFrontIcon />,
    content: <AddLecture />,
    heading: "Add Lecture",
  },
  {
    text: "Upload Pdfs",
    icon: <PictureAsPdfIcon />,
    content: <Addpdf />,
    heading: "Upload Pdfs",
  },
  {
    text: "Upload Dpps",
    icon: <BookIcon />,
    content: <AddDpp />,
    heading: "Upload Dpps",
  },
  {
    text: "Upload Exam Form",
    icon: <QuizIcon />,
    content: <AddExam />,
    heading: "Upload Exam Form",
  },
  {
    text: "Statictics",
    icon: <AnalyticsIcon />,
    content: <Stats />,
    heading: "Statictics Overview",
  },
  {
    text: "User Management",
    icon: <FaUser />,
    content: <UserManagement />,
    heading: "User Management",
  },
  {
    text: "Delete Pdfs",
    icon: <ClearIcon />,
    content: <DeleteMaterials />,
    heading: "Delete Pdfs",
  },
  {
    text: "Delete Dpps",
    icon: <ClearIcon />,
    content: <DeleteDpps />,
    heading: "Delete Dpps",
  },
  {
    text: "Delete Exam Forms",
    icon: <ClearIcon />,
    content: <ExamForms />,
    heading: "Delete Exam forms",
  },
  {
    text: "Exam Forms Records",
    icon: <ClearIcon />,
    content: <ExamFormsRecords />,
    heading: "Records of Exam forms",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0); // Default to the first item (Dashboard)
  const [selectedContent, setSelectedContent] = React.useState(
    NAV_ITEMS[0].content
  ); // Default to first item

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
        if (
          decodedToken.role === "admin" ||
          decodedToken.role === "instructor"
        ) {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleNavigationClick = (content, heading, index) => {
    setSelectedContent(content); // Update content based on the selected item
    setSelectedIndex(index);
    if (heading === "Dashboard") {
      window.location.reload();
    }
    if (mobileOpen) {
      setMobileOpen(false); // Close the drawer on mobile after selection
    }
  };

  const drawer = (
    <div>
      <List sx={{ marginTop: "40%" }}>
        {NAV_ITEMS.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              cursor: "pointer",
              backgroundColor:
                selectedIndex === index ? "#d6d6d6" : "transparent", // Conditionally apply background color
              color: selectedIndex === index ? "blueviolet" : "grey", // Change text color when selected
              '&:hover': {
            backgroundColor: 'whitesmoke', // Apply whitesmoke background on hover
            color: 'black', // Optional: change text color on hover if needed
          },
            }}
            onClick={() =>
              handleNavigationClick(item.content, item.heading, index)
            } // Set selected index
          >
            <ListItemIcon
              style={{
                color: selectedIndex === index ? "blueviolet" : "grey",
                fontWeight: 600,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ fontWeight: 600 }} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Define a light and dark theme using Material-UI's theming system
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
      },
      text: {
        primary: "#000000",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: theme.zIndex.drawer + 1, backgroundColor: "white" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: darkMode ? "black" : "",
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              src="./images/logo.png"
              alt=""
              style={{ width: "150px", cursor: "pointer" }}
            />

            <IconButton
              sx={{ color: darkMode ? "black" : "" }}
              onClick={toggleDarkMode}
            >
              <WbSunnyRounded />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar for larger screens */}
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            marginTop: "20%",
          }}
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
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Right side content for large screens */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          {selectedContent}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
