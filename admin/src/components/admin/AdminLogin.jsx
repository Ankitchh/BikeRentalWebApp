import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardStats from "./DashboardStats";
import { useAdmin } from "../context/AdminContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = { email: email, password: password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        data
      );
      
      // setAdminData(response.data);
      console.log(response);
      const adminToken = response.data.token;
      localStorage.setItem("adminToken", adminToken);
     
      
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div className="w-[25vw] h-[50vh] bg-[#1b4b46] absolute top-[50%] left-[50%] -translate-1/2 flex flex-col gap-15 p-5 items-center rounded">
      <h1 className="text-6xl">
        <i class="ri-user-3-line"></i>
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-between h-[10vh] items-center gap-5 text-lg"
      >
        <div>
          <i class="ri-user-3-line"></i>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="p-1 ml-4 border-b-1 outline-none"
            type="email"
            placeholder="Username"
          />
        </div>
        <div>
          <i class="ri-lock-line"></i>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="p-1 ml-4 border-b-1 outline-none mb-4"
            type="password"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="border bg-[#a8e0ba] text-black rounded-2xl w-30 hover:bg-[#77baa0]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
