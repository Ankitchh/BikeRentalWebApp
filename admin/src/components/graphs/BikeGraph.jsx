import React, { useState, useEffect } from "react";
import { getAuthToken } from "../admin/utils/Authtoken";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import axios from "axios";
import {
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BikeGraph = () => {
  getAuthToken();
  const adminToken = localStorage.getItem("adminToken");

  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [selectYear, setSelectYear] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/bikes`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        const bikeData = Array.isArray(response.data) ? response.data : [];
        setData(bikeData);

        // Extract available years
        const availableYears = [
          ...new Set(
            bikeData
              .filter((item) => item.createdAt)
              .map((item) =>
                new Date(item.createdAt.$date || item.createdAt).getFullYear()
              )
          ),
        ].sort((a, b) => b - a);

        setYears(availableYears);
        if (availableYears.length > 0) {
          setSelectYear(availableYears[0].toString());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load bike data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [adminToken]);

  const filteredData =
    selectYear === "all"
      ? data
      : data.filter((item) => {
          if (!item.createdAt) return false;
          const itemYear = new Date(
            item.createdAt.$date || item.createdAt
          ).getFullYear();
          return itemYear.toString() === selectYear;
        });
  const totalBikes = filteredData.reduce(
    (sum, item) => sum + (item.bikeCount || 0),
    0
  );
  
  const chartData = {
    labels: filteredData.map((item) => item.bikeModel),
    datasets: [
      {
        label: "Bike Count",
        data: filteredData.map((item) => item.bikeCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8AC24A",
          "#607D8B",
          "#E91E63",
          "#9C27B0",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text:
          selectYear === "all"
            ? `All Bike Inventory (${totalBikes})`
            : `Bike Inventory (${totalBikes})`,
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-4xl h-96 bg-white rounded-xl shadow-lg p-6 flex flex-col mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Bike Inventory</h2>
        <div className="flex items-center space-x-2">
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
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No bike data available
        </div>
      ) : (
        <div className="flex-1">
          <Pie data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default BikeGraph;
