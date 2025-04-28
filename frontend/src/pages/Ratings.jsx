import React from "react";

function Rating() {
  return (
    <div className="w-full bg-[#a8e0ba] py-8">
      {/* Header */}
      <div className="px-6">
        <h1 className="text-2xl font-bold text-[#34463a] mb-2">
          Reviews and Ratings
        </h1>
        <hr className="w-full border-t-2 border-[#34463a]" />
      </div>

      {/* Horizontally Scrollable Cards */}
      <div className="w-full mt-6 overflow-hidden ">
        <div className="flex space-x-4 px-6 pb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-64">
              {/* Outer wrapper with slight left margin */}
              <div className="flex ml-3 ">
                {/* Card container */}

                <div className="mt-5 w-80 bg-amber-100  p-4 rounded-lg">
                  {/* Image and divider line */}
                  <div>
                    <img
                      className="rounded-md w-full object-cover"
                      src="https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90b3JiaWtlfGVufDB8fDB8fHww"
                      alt="bike"
                    />
                    <div className="bg-black w-full h-[0.3em] rounded mt-2"></div>
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-1 ml-2 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className="ri-star-fill text-amber-500"></i>
                    ))}
                  </div>

                  {/* Description or review text */}
                  <div className="w-full rounded-md mt-3 bg-green-300 text-black p-3 text-sm font-medium tracking-tight">
                    This is a sample review. The bike quality is great and
                    performance is top-notch for everyday commuting and
                    adventure rides.
                  </div>

                  {/* Read more link */}
                  <div className="flex text-blue-500 font-semibold justify-end mt-2">
                    <a href="#">Read more</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-10 px-6">
        <div className="mt-">
          <div className="w-full h-56 mt-36 mb-36 flex justify-center items-center relative">
            {/* Blurred background */}
            <div className="absolute h-full w-[95%] bg-[#063535] rounded-3xl blur-[3px] z-0 "></div>

            {/* Foreground content aligned top-left */}
            <div className="relative z-10 w-[95%] h-full p-4 flex flex-col justify-start items-start">
              <h6 className="text-2xl text-[#a8e0ba] pl-4">
                Leave your comment
              </h6>

              {/* Star rating */}
              <div className="flex flex-wrap gap-4 ml-8 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} class="ri-star-fill"></i>
                ))}
              </div>

              {/* Comment input */}
              <input
                type="text"
                className="h-10 w-[90%] bg-amber-50 ml-9 mt-4 rounded-md px-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-300"
                placeholder="Write your comment here..."
              />
              <button className="h-10 w-52 rounded-2xl mt-5 bg-[#a8e0ba] align-middle relative mx-auto">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;
