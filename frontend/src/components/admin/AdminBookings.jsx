import React from 'react'
import { CircularProgress  } from "./DashboardStats";

const AdminBookings = () => {
  return (
    <div className="flex flex-col w-[78wv] ml-[20vw]">
      <div className="w-[78vw] bg-[#82b1d0]   mt-5 shadow-xl shadow-[#82b1d0]/50 h-40 px-10 py-3  flex justify-between items-center">
        <CircularProgress
          avail={30}
          percentage={Math.round((30 / 400) * 100)}
          label="Pending Bookings Approvals"
          value={400}
        />
      </div>
    </div>
  );
}

export default AdminBookings
