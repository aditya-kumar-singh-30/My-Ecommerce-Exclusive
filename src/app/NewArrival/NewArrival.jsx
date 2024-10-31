import React from "react";
import Image from "next/image";

const NewArrival = () => {
  return (
    <>
      <div className="mt-14 md:ml-0 ml-2 md:mr-0 mr-2">

        <div className="flex items-center gap-4 justify-center md:justify-start md:ml-40 ml-20 -translate-x-36 md:pl-3 pl-2 md:mr-0 select-none">
          <img
            src="/Category Rectangle.png"
            alt="Category"
            className="w-auto h-auto"
          />
          <p className="text-center md:text-left select-none  ">Featured</p>
        </div>

    
        <div className="flex items-center justify-center md:justify-between md:ml-36 ml-20 md:mr-40 mt-8 -translate-x-32 md:pl-2 pl-2">
          <p className="text-2xl md:text-4xl font-semibold text-center md:text-left select-none">
            New Arrival
          </p>
        </div>

    
        <div className="flex flex-col md:flex-row md:w-4/5 w-full h-auto md:h-[550px] gap-4 mx-auto text-white mt-20 mb-32 px-4 md:px-0 md:ml-36 md:pl-1">

          <div className="md:w-2/4 w-full h-auto bg-black bg-custom-image bg-cover bg-center flex items-center">
            <div className="flex flex-col mx-auto md:ml-10 mt-10 md:mt-72 gap-4 md:gap-10 text-center md:text-left px-4 md:px-0 select-none">
              <p className="text-xl md:text-2xl font-semibold">PlayStation 5</p>
              <p className="text-sm md:text-base">
                Black and White version of the PS5
                <br /> coming out on sale.
              </p>
              <p className="text-base hover:underline hover:underline-offset-4 cursor-pointer active:scale-90 transition-all md:w-20">
                Shop Now
              </p>
            </div>
          </div>

          <div className="md:w-2/4 w-full flex flex-col text-white gap-4">
        
            <div className="h-64 md:h-2/4 w-full mb-4 bg-newArrival-2 bg-cover bg-center flex items-center">
              <div className="flex flex-col mx-auto md:ml-10 mt-12 md:mt-16 gap-4 md:gap-8 text-center md:text-left px-4 md:px-0 select-none">
                <p className="text-xl md:text-2xl font-semibold">
                  Women’s Collections
                </p>
                <p className="text-sm md:text-base">
                  Featured woman collections that
                  <br /> give you another vibe.
                </p>
                <p className="text-base hover:underline hover:underline-offset-4 cursor-pointer active:scale-90 transition-all md:w-20">
                  Shop Now
                </p>
              </div>
            </div>

            <div className="flex h-64 md:h-[260px] w-full gap-4">
           
              <div className="w-2/4 bg-black bg-newArrival-3 bg-cover bg-center flex items-center">
                <div className="flex flex-col mx-auto md:ml-10 mt-8 md:mt-14 gap-4 md:gap-8 text-center md:text-left px-4 md:px-0 select-none">
                  <p className="text-xl md:text-2xl font-semibold">Speakers</p>
                  <p className="text-sm md:text-base">
                    Amazon wireless speakers
                  </p>
                  <p className="text-base hover:underline hover:underline-offset-4 cursor-pointer active:scale-90 transition-all md:w-20">
                    Shop Now
                  </p>
                </div>
              </div>

           
              <div className="w-2/4 bg-black bg-newArrival-4 bg-cover bg-center flex items-center">
                <div className="flex flex-col mx-auto md:ml-10 mt-8 md:mt-14 gap-4 md:gap-8 text-center md:text-left px-4 md:px-0 select-none">
                  <p className="text-xl md:text-2xl font-semibold">Perfume</p>
                  <p className="text-sm md:text-base">GUCCI INTENSE OUD EDP</p>
                  <p className="text-base hover:underline hover:underline-offset-4 cursor-pointer transition-all duration-300 ease-in-out active:scale-90 md:w-20">
                    Shop Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArrival;
