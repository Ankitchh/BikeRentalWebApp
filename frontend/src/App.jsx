import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
function App() {
  // This is the routing table for the application

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  );
}

export default App;
