import React from "react";

function Navbar() {
  return (
    <nav className="bg-[#1b4b46] p-4 h-20 w-95%  flex justify-between items-center ">
      <div class="relative inline-block text-left">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-[#1b4b46] px-4 py-2 text-sm font-medium text-white hover:bg-[#256d63] focus:outline-none"
        >
          <img
            class="h-8 w-8 rounded-full border border-white"
            src="https://i.pravatar.cc/40"
            alt="Profile"
          />
          <span>{"enter user name"}</span>
        </button>
      </div>
      <ul className="flex gap-6 text-white text-lg">
        <li className="hover:underline cursor-pointer">Booking</li>
        <li className="hover:underline cursor-pointer">Pick us</li>
        <li className="hover:underline cursor-pointer">Contact us</li>
        <li className="hover:underline cursor-pointer">About us</li>
      </ul>
      <div className="flex items-center h-16 rounded-3xl overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWuaQ-yLM6qJdX9QEMjJJasrgpgL08A8y3jQ&s"
          alt="Logo"
          className="h-full"
        />
      </div>
    </nav>
  );
}

export default Navbar;
