"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Music = () => {
  let [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let sec = seconds % 60;

  let minute = Math.floor(seconds / 60);

  let hour = Math.floor(minute / 60);

  let day = Math.floor(hour / 24);
  return (
    <>
      <div className="flex justify-center md:p-7 p-7 ">
        <div className=" md:min-w-full h-96 bg-black mt-12  text-white flex items-center  md:flex-row flex-col-reverse  min-w-full ">
          <div className="flex flex-col items-center md:h-full md:w-1/2  gap-7 justify-center mb-4  md:ml-0 ">
            <div className="flex justify-start  items-center mr-40 text-green-500  select-none ">
              <p>Categories</p>
            </div>
            <p className="w-42 md:text-3xl text-2xl font-semibold md:leading-[60px] whitespace-nowrap ml-32 mr-40 md:ml-44 select-none">
              Enhance Your <br />
              Music Experience
            </p>
            <a className="mr-24 bg-custom-green w-36 h-10 flex items-center justify-center cursor-pointer active:scale-90  transition-all select-none">
              Buy Now
            </a>
          </div>

          <div className="md:mb-16   ">
            <img
              src="/speaker.png"
              alt="xxx"
              className="h-[260px] md:h-2/3 w-full object-contain md:p-20  -mb-6 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Music;
