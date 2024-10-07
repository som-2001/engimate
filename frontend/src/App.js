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

function App() {
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
        <Route path="/gallery" element={<Gallary />} />
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
      </Routes>
    </Router>
  
  );
}

export default App;
