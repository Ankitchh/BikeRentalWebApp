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

const Revenue = () => {
  const [selectYear, setSelectYear] = useState("2025");

  const revData = [
    { month: "2024-01", totalRevenue: 12000, count: 3 },
    { month: "2024-02", totalRevenue: 8500, count: 2 },
    { month: "2024-03", totalRevenue: 20400, count: 5 },
    { month: "2024-04", totalRevenue: 13400, count: 5 },
    { month: "2024-05", totalRevenue: 12000, count: 3 },
    { month: "2025-02", totalRevenue: 8500, count: 2 },
    { month: "2025-03", totalRevenue: 18400, count: 5 },
    { month: "2025-04", totalRevenue: 15400, count: 5 },
  ];

  const years = [
    ...new Set(revData.map((items) => items.month.split("-")[0])),
  ].sort();
  const filterData = revData.filter((items) =>
    items.month.startsWith(selectYear)
  );

  const months = filterData.map((items) => {
    const date = new Date(items.month + "-01");
    return date.toLocaleString("default", { month: "short" });
  });
  const revenue = filterData.map((items) => items.totalRevenue);
  const transactions = filterData.map((items) => items.count);

  const totalRevenue = filterData.reduce(
    (sum, item) => sum + item.totalRevenue,
    0
  );
  const avgRevenue = totalRevenue / (filterData.length || 1);
  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalRevenue);

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
        text: `Monthly Revenue (${selectYear})`,
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
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const rev = context.raw;
            const count = transactions[index];
            const avg = rev / count;
            return [
              `Revenue: ${new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(rev)}`,
              `Transactions: ${count}`,
              `Avg: ${new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(avg)}/transaction`,
            ];
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
          callback: function (value) {
            return new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
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
        label: `Total: ${formattedTotal} | Avg: ${new Intl.NumberFormat(
          "en-IN",
          {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }
        ).format(avgRevenue)}/month`,
        data: revenue,
        backgroundColor: "rgba(130, 177, 208, 0.7)",
        borderColor: "rgba(82, 113, 160, 0.8)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl h-96 bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Revenue Analysis</h2>
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
        <Bar options={options} data={data} />
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

export default Revenue;
