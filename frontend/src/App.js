import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { OurCourses } from "./pages/OurCourses";
import { Contact } from "./pages/Contact";
import { Gallary } from "./pages/Gallary";
import { RefundPolicy } from "./pages/RefundPolicy";
import CourseList from "./components/CourseList";
import About from "./pages/About";
import CourseDetail from "./components/CourseDetail";
import { Course } from "./components/Course";
import { Login } from "./pages/Login";
import { RegisterPage } from "./pages/RegisterPage";
import {VerifyEmail} from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/our-courses" element={<OurCourses />} />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/courses/:category" element={<CourseList />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/course-detail" element={<CourseDetail />} />
        <Route path="/course/:name" element={<Course/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </Router>
  
  );
}

export default App;
