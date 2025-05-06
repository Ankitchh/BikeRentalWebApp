import React , {useState} from "react";
import { Line } from "react-chartjs-2"
import {Chart as ChartJs} from "chart.js/auto"
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";


ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins
);



const RegUser = () => {


  
  const userData = [
    {
      month: "2024-01",
      users: 18,
    },
    {
      month: "2024-02",
      users: 29,
    },
    {
      month: "2024-03",
      users: 50,
    },
    {
      month: "2024-04",
      users: 20,
    },
    {
      month: "2024-05",
      users: 60,
    },
    {
      month: "2025-01",
      users: 20,
    },
    {
      month: "2025-02",
      users: 25,
    },
    {
      month: "2025-03",
      users: 30,
    },
    {
      month: "2025-04",
      users: 20,
    },
    {
      month: "2025-05",
      users: 60,
    },
  ];

  const [ selectYear, setSelectYear ] = useState("2025")
  
  const years = [...new Set(userData.map(items => items.month.split("-")[0]))] 

  const filterData = userData.filter(items=> items.month.startsWith(selectYear))

  const month = filterData.map(items => items.month)
  const users = filterData.map(items => items.users)

  const totalUsers = filterData.reduce((dat, items) => {
   return dat + items.users
  },0)

  const options = {
    responsive: true,
    plugins: {
      Legend: {
        position: 'top',
      },
      title: {
        display: true,
        text : "User Data"
      }
    }
  }

  const data = {
    labels: month,
    datasets: [
      {
        label: `Total Users ${totalUsers}`,
        data: users,
        borderColor: "rgba(94, 125, 186,0.6)",
        backgroundColor: "rgba(200,200,155,0.4)",
        pointStyle: "circle",
        pointRadius: 10,
        pointHoverRadius: 15,
      },
    ],
  };

  return (

    <div className="w-[38vw] h-[40vh] bg-[#82b1d0]   mt-5 shadow-xl shadow-[#82b1d0]/50 p-10">
      <select value={selectYear}
      onChange={(e)=>setSelectYear(e.target.value)}>
        {years.map(year => 
            (<option key={year} value={year}> {year}</option>)
          )}
      </select>
        <Line options={options} data={data} />
    </div>
  );
  
}

export default RegUser;