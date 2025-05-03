import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/admin/AdminLogin";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      {/* Navbar shows on all routes except admin */}
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

        {/* Admin routes have their own layout */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
