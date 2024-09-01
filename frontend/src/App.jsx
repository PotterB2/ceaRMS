import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Signup from "../components/Signup/Signup";
import './app.css';
import UserDashboard from "../components/UserDashboard/UserDashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminDashboard from "../components/AdminDashBoard/AdminDashboard";
import UserManagement from "../components/UserManagement/UserManagement";
import CapstoneManagement from "../components/CapstoneManagement/CapstoneManagement";




function App() {
  const [signupOpen, setSignupOpen] = useState(false);

  const openSignup = () => {
    setSignupOpen(true);
  };

  const closeSignup = () => {
    setSignupOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero openSignup={openSignup} />
              {signupOpen && <Signup closeSignup={closeSignup}/>} {/* Render Signup component here */}
            </>
          }
        />
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path='/manage-user' element={<UserManagement/>}/>
        <Route path='/manage-capstone' element={<CapstoneManagement/>}/>
        <Route path="/" element={<Hero />}/>
      </Routes>
    </Router>
  );
}

export default App;
