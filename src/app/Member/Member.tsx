import React from "react";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { RiLinkedinLine } from "react-icons/ri";
import Image from 'next/image';

const Member = () => {
  const products = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
      image: "./About-images/tom.png",
    },
    { name: "Emma Watson", position: "Manager Director", image: "./About-images/emma.png" },
    { name: "Will Smith", position: "Product Designer", image: "./About-images/will.png" },
  ];

  return (
    <div className="md:flex md:items-center md:justify-center  flex items-center md:ml-0 ml-20 ">
      <div className=" md:flex  md:items-center  md:justify-evenly  md:mb-32  md:mt-32  md:gap-8  md:w-4/6  md:px-10  ">
        {products.map((product) => (
          <div key={product.name} className=" md:w-[370px]  md:h-[430px]  md:flex md:flex-col mt-10 mr-20 md:mr-0 ">
            <div className=" md:px-8  md:pt-8 bg-gray-100  md:flex  md:flex-col  md:items-end">
              <img src={product.image}  className="w-64 h-96 " alt={product.name} />
            </div>
            <div>
              <p className=" text-3xl font-medium md:font-medium  md:mt-6">{product.name}</p>
              <p className=" text-base font-normal  md:font-normal">{product.position}</p>
            </div>
            <div className="md:flex   md:gap-2 md:mt-2 flex gap-2 mt-2 ">
                <a href="https://x.com/"><CiTwitter /></a>
                <a href="https://www.instagram.com"><IoLogoInstagram /></a>
                <a href="https://www.linkedin.com"><RiLinkedinLine /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Member;
