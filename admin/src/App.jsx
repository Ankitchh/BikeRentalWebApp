import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
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
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<Admin />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
