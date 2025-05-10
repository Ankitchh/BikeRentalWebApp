import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Slide, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Otp() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [timeout, settimeout] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const { login } = useAuth();

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Something went wrong!");
      return;
    }

    setIsLoading(true);

    const data = { otp, userId };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verify-otp`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data?.data?.message || "OTP Verified Successfully!");
        localStorage.setItem("token", res.data.token);
        setOtp("");
        login(res.data.user);

        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 1000);
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const message = error.response?.data?.message || "Can't verify OTP";
      toast.error(message);
      setIsLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    settimeout(true);
    setTimeout(() => {
      settimeout(false);
    }, 500000);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/resend-otp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("OTP sent to your email");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error re-sending OTP");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="font-[poppins] min-h-screen w-full bg-[url(https://www.orangewayfarer.com/wp-content/uploads/2021/01/DJI_0298-01.jpg)] bg-cover p-4 flex justify-center items-center lg:justify-end lg:pr-30">
          <div className="h-[33rem] w-[24rem] border border-white bg-transparent backdrop-blur-2xl rounded-md lg:mr-10">
            <div className="mt-3 text-center text-xl font-bold">
              <h1>Welcome to Bike-Rental!</h1>
            </div>

            <div className="w-3/4 bg-black h-[2px] ml-10 mt-2"></div>

            <form onSubmit={handleSubmit}>
              <div
                className="shadow-2xl m-7 p-2 h-80 text-center rounded"
                style={{ boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.2)" }}
              >
                <label className="mt-2 text-xl font-semibold" htmlFor="otp">
                  Enter Your OTP
                </label>
                <p className="mt-2 mb-2 block text-[8px] tracking-tighter lg:text-[12px]">
                  Please check your email for the OTP
                </p>
                <hr className="mb-1 mt-1.5 w-3/4 ml-10" />
                <span className="text-[10px] lg:text-[10px] mb-2">
                  If you can't find the OTP in your inbox, please check your
                  spam folder.
                </span>
                <input
                  className="outline-none border w-[90%] px-3 py-2 mt-3 rounded appearance-none block ml-3 bg-transparent text-zinc-900"
                  type="number"
                  placeholder="Enter your OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="otp"
                  required
                />
                <button
                  className="bg-transparent py-2 px-2 mt-6 w-40 rounded-sm font-bold border cursor-pointer"
                  type="submit"
                >
                  Verify OTP
                </button>
              </div>
            </form>

            <div className="text-center">
              <button
                disabled={timeout}
                onClick={handleResend}
                type="button"
                className="text-zinc-800 hover:underline text-xs font-bold"
              >
                {timeout
                  ? "code resended to your email : wait for 5 min to resend again"
                  : "Didn't receive code? Click here"}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        theme="dark"
        autoClose={1000}
        closeOnClick={true}
        transition={Slide}
      />
    </>
  );
}

export default Otp;
