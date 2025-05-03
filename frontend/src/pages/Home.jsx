import React, { useState } from "react";
import Ratings from "./Ratings";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import "../stylesheet/home.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(false);

  const checkIfLoggedIn = () => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please Login First");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 1000);
      return;
    }

    if (token) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/booking");
      }, 800);
    }
  };

  return (
    <>
      {IsLoading ? (
        <Loading />
      ) : (
        <>
          {/* Hero Section */}
          <div className="m-0 p-0 box-border h-[85vh] relative border-2 border-[#a8e0ba]">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://cdn.bikedekho.com/processedimages/yamaha/mt-15-2-0/source/mt-15-2-06613f885e681c.jpg')",
              }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 bg-green-200 px-8 py-4 rounded-tr-2xl rounded-br-2xl">
                <h1 className="text-4xl font-black text-black font-sans">
                  RENT A BIKE
                </h1>
              </div>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#A8E0BA] px-6 py-2 rounded-tr-xl rounded-tl-xl border-none">
                <p className="text-lg italic tracking-wide font-medium text-black">
                  Select Rides
                </p>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-4 p-6 bg-[#a8e0ba]">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)] bg-white border-2 border-gray-300"
              >
                <img
                  className="w-full h-36 object-cover rounded-t-2xl"
                  src="https://t4.ftcdn.net/jpg/03/76/70/11/360_F_376701136_KNP9pERnyP5Z2acAIuhnQQ0HpqUuWQyh.jpg"
                  alt="KTM Duke"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-red-500">
                    KTM Duke
                  </h2>
                  <div className="p-3 rounded-md h-32 w-full bg-[#dbf4e3] text-gray-600 text-sm overflow-y-auto shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)]">
                    Powerful street bike with aggressive styling and top-tier
                    performance.
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={checkIfLoggedIn}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                    >
                      Show More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Packages Section */}
          <div className="h-auto min-h-[40rem] bg-[#a8e0ba] flex items-center justify-center py-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-[90%] max-w-6xl">
              <div className="flex items-center justify-center h-auto md:h-[30rem] w-full md:w-1/2">
                <h1 className="text-4xl md:text-5xl italic font-semibold text-green-900">
                  Packages
                </h1>
              </div>

              <div className="bg-white shadow-xl rounded-xl p-8 mt-8 md:mt-14 w-full md:w-[32rem] h-auto md:h-[28rem] overflow-hidden">
                <table className="table-auto border-collapse border border-gray-300 shadow-md h-full w-full">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="px-6 py-3 border border-gray-300 font-medium">
                        Day/Week/Month
                      </th>
                      <th className="px-6 py-3 border border-gray-300 font-medium">
                        Discount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {["3 Days", "6 Days", "2 Weeks", "3 Weeks", "1 Month"].map(
                      (period, index) => (
                        <tr key={index}>
                          <td className="px-6 py-3 border border-gray-300">
                            {period}
                          </td>
                          <td className="px-6 py-3 border border-gray-300">
                            0.0%
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer Components */}
          <Ratings />
          <Footer />
          <Copyright />
        </>
      )}
      <ToastContainer
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default Home;
