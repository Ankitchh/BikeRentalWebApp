import React from "react";
import Revinue from "../graphs/Revinue";
import RegUser from "../graphs/RegUser";
import TotalBookings from "../graphs/TotalBookings";
import CoustomerRatings from "../graphs/CoustomerRatings";
import AdminNav from "./AdminNav";

export const CircularProgress = ({ percentage, label, value, avail }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={radius * 2 + 10} height={radius * 2 + 30}>
        {/* Background Circle */}
        <circle
          cx={radius + 5}
          cy={radius + 5}
          r={radius}
          className="fill-transparent stroke-gray-200 stroke-[8]"
        />

        {/* Foreground Circle (Percentage) */}
        <circle
          cx={radius + 5}
          cy={radius + 5}
          r={radius}
          className="fill-transparent stroke-blue-500 stroke-[8] transition-all duration-500 ease-out"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius + 5} ${radius + 5})`}
        />

        {/* Percentage Text */}
        <text
          x={radius + 5}
          y={radius + 10}
          className="text-lg font-bold text-gray-700 text-center"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {avail}
        </text>

        {/* Value Text (Optional) */}
        {value && (
          <text
            x={radius + 5}
            y={radius + 30}
            className="text-sm text-gray-500 text-center"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {value}
          </text>
        )}
      </svg>
      <span className="text-sm text-gray-600 mt-">{label}</span>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <>
      <div className="flex flex-col w-[78wv] ml-[20vw]">
        <div className="w-[78vw] bg-[#82b1d0]   mt-5 shadow-xl shadow-[#82b1d0]/50 h-40 px-10 py-3  flex justify-between items-center">
          <div className="flex w-2xl justify-between">
            <CircularProgress
              avail={189}
              percentage={Math.round((189 / 1300) * 100)}
              label="Available Bikes"
              value={1300}
            />
            <CircularProgress
              avail={1300}
              percentage={Math.round((1300 / 1500) * 100)}
              label="Bikes On Good Condition"
              value={1300}
            />
            <CircularProgress
              avail={1230}
              percentage={Math.round((1230 / 2400) * 100)}
              label="Available Accessories"
              value={2400}
            />
            <CircularProgress
              avail={30}
              percentage={Math.round((30 / 400) * 100)}
              label="Pending Bookings Approvals"
              value={400}
            />
          </div>

          <div className="w-25 h-25 rounded-full bg-gray-500 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM13 16.083V20H17.6586C16.9423 17.9735 15.1684 16.4467 13 16.083ZM11 20V16.083C8.83165 16.4467 7.05766 17.9735 6.34141 20H11ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.2104 11 16 9.21043 16 7C16 4.78957 14.2104 3 12 3C9.78957 3 8 4.78957 8 7C8 9.21043 9.78957 11 12 11Z"></path>
            </svg>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          <Revinue />
          <RegUser />
          <TotalBookings />
          <CoustomerRatings />
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
