import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomerRatings = () => {
  const [selectYear, setSelectYear] = useState("2025");

  // Example Ratings Data
  const ratingData = [
    { rating: 5, date: "2025-01-10" },
    { rating: 4, date: "2025-02-15" },
    { rating: 3, date: "2025-03-20" },
    { rating: 5, date: "2025-03-22" },
    { rating: 2, date: "2025-04-05" },
    { rating: 1, date: "2025-04-10" },
    { rating: 5, date: "2025-04-12" },
    { rating: 4, date: "2024-12-20" },
    { rating: 3, date: "2024-11-01" },
  ];

  // Get available years from data
  const years = [...new Set(ratingData.map((item) => item.date.split("-")[0]))];

  // Filter data by selected year
  const filteredRatings = ratingData.filter((item) =>
    item.date.startsWith(selectYear)
  );

  // Count ratings from 1 to 5
  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rating) => filteredRatings.filter((item) => item.rating === rating).length
  );

  const ratings = ratingCounts.reduce((a, b) => a + b, 0);

  const chartData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: `Total Ratings: ${ratings}`,
        data: ratingCounts,
        backgroundColor: "rgba(130,177,208,0.6)",
        borderColor: "rgba(82, 113, 160, 0.8)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Customer Ratings for ${selectYear}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
  };

  return (
    <div className="w-[38vw] h-[40vh] bg-[#82b1d0] mt-5 shadow-xl shadow-[#82b1d0]/50 p-10">
      <select
        value={selectYear}
        onChange={(e) => setSelectYear(e.target.value)}
        className="mb-4 p-1 rounded"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CustomerRatings;
