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



const TotalBookings = () => {


  
  const userData = [
    {
      month: "2024-01",
      Bookings: 20,
    },
    {
      month: "2024-02",
      Bookings: 39,
    },
    {
      month: "2024-03",
      Bookings: 40,
    },
    {
      month: "2024-04",
      Bookings: 20,
    },
    {
      month: "2024-05",
      Bookings: 50,
    },
    {
      month: "2025-01",
      Bookings: 60,
    },
    {
      month: "2025-02",
      Bookings: 45,
    },
    {
      month: "2025-03",
      Bookings: 30,
    },
    {
      month: "2025-04",
      Bookings: 20,
    },
    {
      month: "2025-05",
      Bookings: 60,
    },
  ];

  const [ selectYear, setSelectYear ] = useState("2025")
  
  const years = [...new Set(userData.map(items => items.month.split("-")[0]))] 

  const filterData = userData.filter(items=> items.month.startsWith(selectYear))

  const month = filterData.map(items => items.month)
  const Bookings = filterData.map(items => items.Bookings)

  const totalBookings = filterData.reduce((dat, items) => {
   return dat + items.Bookings
  },0)

  const options = {
    responsive: true,
    plugins: {
      Legend: {
        position: 'top',
      },
      title: {
        display: true,
        text : "Booking Data"
      }
    }
  }

  const data = {
    labels: month,
    datasets: [
      {
        label: `Total Bookings ${totalBookings}`,
        data: Bookings,
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

export default TotalBookings;