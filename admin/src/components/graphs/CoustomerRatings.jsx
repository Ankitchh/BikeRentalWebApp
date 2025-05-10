import React, { useState, useEffect } from "react";
import { getAuthToken } from "../admin/utils/Authtoken";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import axios from "axios";
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
  getAuthToken();
  const adminToken = localStorage.getItem("adminToken");

  const [ratingData, setRatingData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectYear, setSelectYear] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRatingData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/reviews`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        const reviews = Array.isArray(response.data) ? response.data : [];
        setRatingData(reviews);

        // Extract available years from createdAt dates
        const availableYears = [
          ...new Set(
            reviews
              .filter((item) => item.createdAt)
              .map((item) =>
                new Date(item.createdAt.$date || item.createdAt).getFullYear()
              )
          ),
        ].sort((a, b) => b - a); // Sort descending (newest first)

        setYears(availableYears);
        if (availableYears.length > 0) {
          setSelectYear(availableYears[0].toString());
        }
      } catch (error) {
        console.error("Error fetching rating data:", error);
        setError("Failed to load rating data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRatingData();
  }, [adminToken]);

  // Filter data by selected year
  const filteredRatings = ratingData.filter((item) => {
    if (!item.createdAt) return false;
    const itemYear = new Date(
      item.createdAt.$date || item.createdAt
    ).getFullYear();
    return selectYear === "all" || itemYear.toString() === selectYear;
  });

  // Count ratings from 1 to 5
  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rating) => filteredRatings.filter((item) => item.rating === rating).length
  );

  const totalRatings = ratingCounts.reduce((a, b) => a + b, 0);

  // Calculate average rating
  const averageRating =
    filteredRatings.length > 0
      ? (
          filteredRatings.reduce((sum, item) => sum + item.rating, 0) /
          filteredRatings.length
        ).toFixed(1)
      : 0;

  const chartData = {
    labels: ["★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"],
    datasets: [
      {
        label: `Total Ratings: ${totalRatings} (Avg: ${averageRating})`,
        data: ratingCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

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
        },
      },
      title: {
        display: true,
        text:
          selectYear === "all"
            ? "Customer Ratings (All Time)"
            : `Customer Ratings for ${selectYear}`,
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: {
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        ticks: {
          font: {
            size: 13,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="w-full max-w-4xl h-96 bg-white rounded-xl shadow-lg p-6 flex flex-col relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Customer Ratings</h2>
        <select
          value={selectYear}
          onChange={(e) => setSelectYear(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : filteredRatings.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No ratings available {selectYear === "all" ? "" : `for ${selectYear}`}
        </div>
      ) : (
        <div className="flex-1">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default CustomerRatings;
