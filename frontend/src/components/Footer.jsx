import React from "react";


function Footer() {
  return (
    <>
      <div className="w-full h-[448px] bg-[#063535] flex flex-row">
        {/* Left Side */}
        <div className="h-full w-1/2 flex flex-row">
          <div className="h-20 w-32 bg-[#A8E0BA] rounded-2xl ml-4 mt-4"></div>
          <div className="pl-14 text-[#A8E0BA] flex flex-col gap-3 pt-3 text-3xl">
            <h1 className="pt-2 text-8xl">
              <a href="#">Bike Rent</a>
            </h1>
            <h1 className="pt-3">
              <a href="#">About</a>
            </h1>
            <h1 className="pt-3">
              <a href="#">Contact Us</a>
            </h1>
            <p>111123-00333</p>
            <h1 className="pt-3">
              <a href="#">Help</a>
            </h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="h-full w-1/2 text-[#A8E0BA] pt-3 pr-4 flex flex-col">
          <h1 className="text-3xl">Terms and Conditions</h1>
          <div className="pt-4 h-[80%] overflow-hidden">
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              molestiae voluptatibus ullam voluptates maxime iusto, ipsam
              laudantium at sed similique nostrum eius perspiciatis consequuntur
              quas iure deserunt repellat rerum esse adipisci illo hic magni
              ipsum optio. Exercitationem, earum error ab, veniam aut
              corrupti...
              {/* (you can truncate or replace with actual terms) */}
            </p>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Footer;
