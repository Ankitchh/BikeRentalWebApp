
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Otp from './pages/Otp.jsx'



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login/otp" element={<Otp />} />
            <Route path="/*" element={<App />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
