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
import {UserDashboard} from "./pages/UserDashboard";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { MyCourse } from "./pages/MyCourse";
import { AllCourses } from "./components/AllCourses";
import { Lectures } from "./pages/Lectures";
import ReferEarn from "./pages/ReferEarn";
import { Profile } from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import PlacedStudentsPage from "./pages/PlacedStudentsPage";

// import { useEffect } from "react";

function App() {
  
//   useEffect(() => {
//     // Disable right-click context menu
//     const handleContextMenu = (event) => {
//         event.preventDefault();
//     };

//     // Disable specific keyboard shortcuts
//     const handleKeyDown = (event) => {
//         if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
//             event.preventDefault();
           
//         }
//     };

//     // Attach event listeners
//     document.addEventListener('contextmenu', handleContextMenu);
//     document.addEventListener('keydown', handleKeyDown);

//     // Cleanup event listeners on unmount
//     return () => {
//         document.removeEventListener('contextmenu', handleContextMenu);
//         document.removeEventListener('keydown', handleKeyDown);
//     };
// }, []);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/my-course" element={<MyCourse/>}/>
        <Route path="/our-courses" element={<OurCourses />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/lectures/:id" element={<Lectures/>}/>
        <Route path="/refer-earn" element={<ReferEarn/>}/>
        <Route path="/paymentSuccess/:id" element={<PaymentSuccess/>}/>
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/courses/:id" element={<CourseList />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/course/:name" element={<Course/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/placed-students" element={<PlacedStudentsPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  
  );
}

export default App;
