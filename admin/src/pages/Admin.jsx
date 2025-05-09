import React from "react";

import { Route, Routes } from "react-router-dom";
import DashboardStats from "../components/admin/DashboardStats";
import AdminBookings from "../components/admin/AdminBookings";
import AdminPackages from "../components/admin/AdminPacakages";
import AdminNav from "../components/admin/AdminNav";
import AdminManageBikes from "../components/admin/AdminManageBikes";
import AdminAccessories from "../components/admin/AdminAccessories";
import AdminCustomers from "../components/admin/AdminCustomers";
import AdminTermsAndConditions from "../components/admin/AdminTermsAndConditions";
import AdminReview from "../components/admin/AdminReview";
import UpdateAdmin from "../components/admin/UpdateAdmin";

const Admin = () => {
  return (
    <div className="w-full h-auto pb-20 flex bg-[#97c2df]">
      <AdminNav />
      <Routes>
        {/* All routes here are relative to /admin */}
        <Route index element={<DashboardStats />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="managebikes" element={<AdminManageBikes />} />
        <Route path="accessories" element={<AdminAccessories />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="terms" element={<AdminTermsAndConditions />} />
        <Route path="review" element={<AdminReview />} />
        <Route path="update" element={<UpdateAdmin />} />
      </Routes>
    </div>
  );
};

export default Admin;
