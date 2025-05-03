import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar"
import AdminLogin from "./components/admin/AdminLogin";
function App() {
  // This is the routing table for the application

  return (
     <>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
              </Routes>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/booking" element={<Booking />} />
         <Route path="/admin/*" element={<Admin />} />
      </Routes>

      
    </>
  );
}

export default App;
