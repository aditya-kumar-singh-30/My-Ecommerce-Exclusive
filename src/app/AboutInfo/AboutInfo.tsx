import React from "react";
import Image from "next/image";

const AboutInfo = () => {
  return (
    <>
      <div className="md:flex md:flex-row md:justify-evenly md:mb-8 gap-10 md:gap-0 flex flex-col justify-center items-center  mt-10">
        <div className="md:items-center md:flex md:flex-col md:gap-1 border border-blue-200 md:p-6 md:hover:bg-check-red md:hover:text-white md:rounded md:w-60 md:h-60 flex flex-col items-center hover:bg-red-500 hover:text-white  w-80 p-10 ">
          <img src="\About-images\services-4.png" className="mb-5" alt="" />
          <p className="text-3xl font-bold mb-5 ">10.5K</p>
          <p className="text-base font-normal text-center truncate ">
            Seller active on our site
          </p>
        </div>
        <div className="md:items-center md:flex md:flex-col md:gap-1 border border-blue-200 md:p-6 md:hover:bg-check-red md:hover:text-white md:rounded md:w-60 md:h-60 flex flex-col items-center hover:bg-red-500  hover:text-white  w-80 p-10">
          <img src="\About-images\servies-1.png" className="mb-5" alt="" />
          <p className="text-3xl font-bold mb-5">33K</p>
          <p className="text-base font-normal text-center truncate">
            Monthly Product Sale
          </p>
        </div>
        <div className="md:items-center md:flex md:flex-col md:gap-1 border border-blue-200 md:p-6 md:hover:bg-check-red md:hover:text-white md:rounded md:w-60 md:h-60 flex flex-col items-center hover:bg-red-500  hover:text-white  w-80 p-10">
          <img src="\About-images\services-2.png" className="mb-5" alt="" />
          <p className="text-3xl font-bold mb-5">45.5K</p>
          <p className="text-base font-normal text-center truncate">
            Customer active on site
          </p>
        </div>
        <div className="md:items-center md:flex md:flex-col md:gap-1 border border-blue-200 md:p-6 md:hover:bg-check-red md:hover:text-white md:rounded md:w-60 md:h-60 flex flex-col items-center hover:bg-red-500  hover:text-white  w-80 p-10">
          <img src="\About-images\services-3.png" className="mb-5" alt="" />
          <p className="text-3xl font-bold mb-5">25K</p>
          <p className="text-base font-normal text-center truncate">
            Annual gross sale on our site
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutInfo;
