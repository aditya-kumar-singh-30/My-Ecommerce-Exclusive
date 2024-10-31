import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsSmartwatch } from "react-icons/bs";
import { GrGamepad } from "react-icons/gr";
import Image from "next/image";

const Category = () => {
  return (
    <>
      <div className="container px-4 min-w-full mx-auto ">
       
        <div className="flex items-center gap-4 justify-start ml-2 mt-4 select-none">
          <img src="/Category Rectangle.png" alt="Category Rectangle" />
          <p >Categories</p>
        </div>

       
        <div className="flex items-center justify-between mt-8 ml-2 mr-2 md:mr-20 select-none">
          <p className="text-2xl md:text-4xl font-semibold">Browse By Category</p>

       
          <div className="hidden md:flex gap-3 ml-2">
            <button className="bg-blue-50 h-12 w-12 rounded-full flex justify-center items-center hover:bg-blue-100">
              <FaArrowLeft />
            </button>
            <button className="bg-blue-50 h-12 w-12 rounded-full flex justify-center items-center hover:bg-blue-100">
              <FaArrowRight />
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8 mx-4">
          <div className="border w-full h-36 flex flex-col justify-center items-center rounded-md hover:bg-check-red hover:text-white select-none active:scale-110 transition-all shadow-lg">
            <span className="text-5xl">
              <IoPhonePortraitOutline />
            </span>
            <p className="text-sm md:text-base">Phones</p>
          </div>
          <div className="border w-full h-36 flex flex-col justify-center items-center rounded-md hover:bg-check-red hover:text-white select-none active:scale-110 transition-all shadow-lg">
            <span className="text-5xl">
              <HiOutlineDesktopComputer />
            </span>
            <p className="text-sm md:text-base">Computers</p>
          </div>
          <div className="border w-full h-36 flex flex-col justify-center items-center rounded-md hover:bg-check-red hover:text-white select-none active:scale-110 transition-all shadow-lg">
            <span className="text-5xl">
              <BsSmartwatch />
            </span>
            <p className="text-sm md:text-base">SmartWatch</p>
          </div>
          <div className="border w-full h-36 flex flex-col justify-center items-center rounded-md hover:bg-check-red hover:text-white select-none active:scale-110 transition-all shadow-lg">
            <span className="text-5xl">
              <CiCamera />
            </span>
            <p className="text-sm md:text-base">Camera</p>
          </div>
          <div className="border w-full h-36 flex flex-col justify-center items-center rounded-md hover:bg-check-red hover:text-white select-none active:scale-110 transition-all shadow-lg">
            <span className="text-5xl">
              <GrGamepad />
            </span>
            <p className="text-sm md:text-base">Gaming</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
