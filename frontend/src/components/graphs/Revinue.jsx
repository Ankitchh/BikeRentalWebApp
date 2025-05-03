import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Legend,
  Tooltip
);

const Revinue = () => {
  const [selectYear, setSelectYear] = useState("2025");

  const revData = [
    {
      month: "2024-01",
      totalRevenue: 12000,
      count: 3,
    },
    {
      month: "2024-02",
      totalRevenue: 8500,
      count: 2,
    },
    {
      month: "2024-03",
      totalRevenue: 20400,
      count: 5,
    },
    {
      month: "2024-04",
      totalRevenue: 13400,
      count: 5,
    },
    {
      month: "2024-05",
      totalRevenue: 12000,
      count: 3,
    },
    {
      month: "2025-02",
      totalRevenue: 8500,
      count: 2,
    },
    {
      month: "2025-03",
      totalRevenue: 18400,
      count: 5,
    },
    {
      month: "2025-04",
      totalRevenue: 15400,
      count: 5,
    },
  ];

    const years = [...new Set(revData.map(items => items.month.split("-")[0]))]
    const filterData = revData.filter((items) =>
      items.month.startsWith(selectYear)
    );

  const revinue = filterData.map((items) => items.totalRevenue);
  const months = filterData.map((items) => items.month);

  const total = filterData.reduce((data, items) => {
    return data + items.totalRevenue;
  }, 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue",
      },
    },
  };
  const data = {
    labels: months,
    datasets: [
      {
        label: `Total Revinue RS ${total}`,
        data: revinue,
        backgroundColor: ["rgba(200,200,255,0.4)"],
        borderColor: ["rgba(130,177,208,0.2)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-[38vw] h-[40vh] bg-[#82b1d0]   mt-5 shadow-xl shadow-[#82b1d0]/50 p-10">
      <select
        value={selectYear}
        onChange={(e) => setSelectYear(e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {" "}
            {year}
          </option>
        ))}
      </select>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Revinue;
