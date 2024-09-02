import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { OurCourses } from "./pages/OurCourses";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-courses" element={<OurCourses />} />
      </Routes>
    </Router>
  
  );
}

export default App;
