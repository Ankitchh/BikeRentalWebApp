import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TotalBookings = () => {
  const bookingData = [
    { month: "2024-01", bookings: 20 },
    { month: "2024-02", bookings: 39 },
    { month: "2024-03", bookings: 40 },
    { month: "2024-04", bookings: 20 },
    { month: "2024-05", bookings: 50 },
    { month: "2025-01", bookings: 60 },
    { month: "2025-02", bookings: 45 },
    { month: "2025-03", bookings: 30 },
    { month: "2025-04", bookings: 20 },
    { month: "2025-05", bookings: 60 },
  ];

  const [selectYear, setSelectYear] = useState("2025");
  const years = [
    ...new Set(bookingData.map((item) => item.month.split("-")[0])),
  ].sort();

  const filterData = bookingData.filter((item) =>
    item.month.startsWith(selectYear)
  );

  // Format months as short names (Jan, Feb, etc.)
  const months = filterData.map((item) => {
    const date = new Date(item.month + "-01");
    return date.toLocaleString("default", { month: "short" });
  });

  const bookings = filterData.map((item) => item.bookings);
  const totalBookings = filterData.reduce(
    (sum, item) => sum + item.bookings,
    0
  );
  const avgBookings = totalBookings / (filterData.length || 1);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: `Monthly Bookings (${selectYear})`,
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.85)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Bookings: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 3,
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        backgroundColor: "#5E7DBA",
      },
    },
    animation: {
      duration: 1000,
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: `Total: ${totalBookings} | Avg: ${avgBookings.toFixed(1)}/month`,
        data: bookings,
        borderColor: "#5E7DBA",
        backgroundColor: "rgba(94, 125, 186, 0.1)",
        fill: true,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#5E7DBA",
        pointHoverBackgroundColor: "#5E7DBA",
        pointHoverBorderColor: "#fff",
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl h-96 bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Booking Trends</h2>
        <select
          value={selectYear}
          onChange={(e) => setSelectYear(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <Line options={options} data={data} />
      </div>
      {filterData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl">
          <p className="text-gray-500 text-lg">
            No booking data available for {selectYear}
          </p>
        </div>
      )}
    </div>
  );
};

export default TotalBookings;
