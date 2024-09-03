import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { OurCourses } from "./pages/OurCourses";
import { Contact } from "./pages/Contact";
import { Gallary } from "./pages/Gallary";
import { RefundPolicy } from "./pages/RefundPolicy";
import CourseList from "./components/CourseList";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contact/>}/>
        <Route path="/our-courses" element={<OurCourses />} />
        <Route path="/gallery" element={<Gallary />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/courses/:category" element={<CourseList />} />
      </Routes>
    </Router>
  
  );
}

export default App;
