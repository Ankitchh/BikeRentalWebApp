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

const RegUser = () => {
  const userData = [
    { month: "2024-01", users: 18 },
    { month: "2024-02", users: 29 },
    { month: "2024-03", users: 50 },
    { month: "2024-04", users: 20 },
    { month: "2024-05", users: 60 },
    { month: "2025-01", users: 20 },
    { month: "2025-02", users: 25 },
    { month: "2025-03", users: 30 },
    { month: "2025-04", users: 20 },
    { month: "2025-05", users: 60 },
  ];

  const [selectYear, setSelectYear] = useState("2025");
  const years = [
    ...new Set(userData.map((items) => items.month.split("-")[0])),
  ].sort();

  const filterData = userData.filter((items) =>
    items.month.startsWith(selectYear)
  );
  const months = filterData.map((items) => {
    const date = new Date(items.month + "-01");
    return date.toLocaleString("default", { month: "short" });
  });
  const users = filterData.map((items) => items.users);

  const totalUsers = filterData.reduce((sum, item) => sum + item.users, 0);
  const avgUsers = totalUsers / (filterData.length || 1);

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
        text: `Monthly User Registrations (${selectYear})`,
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
            return `Users: ${context.raw}`;
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
        tension: 0.4,
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
        label: `Total: ${totalUsers} | Avg: ${avgUsers.toFixed(1)}/month`,
        data: users,
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
        <h2 className="text-xl font-bold text-gray-800">
          User Registration Trend
        </h2>
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
            No data available for {selectYear}
          </p>
        </div>
      )}
    </div>
  );
};

export default RegUser;
