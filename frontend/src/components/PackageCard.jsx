import React from "react";

function PackageCard() {
  return (
    <div className="overflow-x-auto h-[30rem] whitespace-nowrap py-5 bg-[#A8E0BA]">
      <div className="flex gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="inline-block p-4 min-w-[300px] max-w-sm">
            <div className="border h-[26rem] rounded-md p-2 w-full">
              <div className="h-10 w-full border text-center rounded">
                <h1 className="mt-1 text-xl font-bold">Package Name</h1>
              </div>
              <div className="mt-4 border h-30 rounded-md text-sm tracking-tighter p-2 font-medium mb-4 flex-wrap overflow-hidden">
                <p className="flex-wrap ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam exercitationem magni fugiat repellendus aliquid maiores
                  ducimus enim hic adipisci velit et fugit in, nostrum error
                  officiis sit vitae! Eius, odio?
                  
                </p>
              </div>
              <hr />
              <div className="border rounded mt-3 p-2 font-semibold">
                <p>
                  Package Price: <span className="line-through">9000</span> 7000
                </p>
                <p className="mt-2">
                  Valid Until: <span>19/06/24</span>
                </p>
              </div>
              <div className="flex justify-center items-center mt-2">
                <button className="bg-blue-500 text-white rounded-md w-full py-2 font-bold">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackageCard;
