import React from 'react'
import {Link} from 'react-router-dom'

const AdminLogin = () => {

 


  return (
    <div className="w-[25vw] h-[50vh] bg-[#1b4b46] absolute top-[50%] left-[50%] -translate-1/2 flex flex-col gap-15 p-5 items-center rounded">
      <h1 className="text-6xl">
        <i class="ri-user-3-line"></i>
      </h1>
      <form
        action=""
        className="flex flex-col justify-between h-[10vh] items-center gap-5 text-lg"
      >
        <div>
          <i class="ri-user-3-line"></i>
          <input
            className="p-1 ml-4 border-b-1 outline-none"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <i class="ri-lock-line"></i>
          <input
            className="p-1 ml-4 border-b-1 outline-none mb-4"
            type="password"
            placeholder="Password"
          />
        </div>

        <Link to = "/admin">
          <button
            type="submit"
            className="border bg-[#a8e0ba] text-black rounded-2xl w-30 hover:bg-[#77baa0]"
          >
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}

export default AdminLogin
