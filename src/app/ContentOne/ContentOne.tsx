"use client";

import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: "/iphone.jpeg",
      icon: "/apple.png",
      info: "iPhone 14 Series",
      bigInfo: "Up to 10% off Voucher",
    },
    {
      image: "/Month-images/gucci.png",
      icon: "/Month-images/gucci.png",
      info: "The Gucci Bag!",
      bigInfo: "The Real King!",
    },
    {
      image: "/Month-images/jacket.png",
      icon: "/Month-images/jacket.png",
      info: "Jacket Series",
      bigInfo: "Cover Your Loved Ones.",
    },
  ];

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000); 
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const changeImage = (direction: string) => {
    setIsAutoPlaying(false);
    setCurrentSlide((prevSlide) => {
      return direction === "next"
        ? (prevSlide + 1) % slides.length
        : prevSlide === 0
        ? slides.length - 1
        : prevSlide - 1;
    });

    
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleSelect = (event: { target: { value: any; }; }) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      router.push(selectedValue);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around mt-10 md:mt-20 min-w-full ">
    
      <div className="flex flex-col justify-center gap-4 w-full md:w-1/2 p-7  border-none md:border-r border-blue-100 ">
        <select
          className="border-none font-poppins md:text-base font-normal outline-none w-44 mb-4 "
          aria-label="Electronics Category"
        >
          <option disabled selected>
             Electronics
          </option>
          <option>Audio Devices (Headphones, Speakers)</option>
          <option>Chargers & Power Banks</option>
          <option>Home Appliances (Microwaves, Refrigerators)</option>
          <option>Cameras & Photography Equipment</option>
        </select>
        <select
          className="border-none font-poppins md:text-base font-normal outline-none w-44 mb-4"
          onChange={handleSelect}
          aria-label="Men's Fashion Category"
        >
          <option disabled selected>
            Men's Fashion
          </option>
          <option value="/About">T-Shirts & Polos</option>
          <option>Jeans & Trousers</option>
          <option>Sunglasses & Eyewear</option>
          <option value="/Contact">Shoes (Sneakers, Formal, Boots)</option>
        </select>
        {["Electronics", "Home & Lifestyle", "Medicine", "Sports and Outdoor", "Baby's Toys", "Groceries & Pets", "Health and Beauty"].map(
          (category, index) => (
            <Link
              key={index}
              href="/"
              className="font-poppins md:text-base font-normal cursor-pointer leading-24 hover:font-bold"
            >
              {category}
            </Link>
          )
        )}
      </div>
    <div className="md:p-0 p-6 md:border md:border-black flex items-center md:pr-8 ">
      <div className="w-full md:min-w-[60rem] md:max-w-[60rem] bg-black text-white flex items-center gap-5 flex-col md:flex-row mt-10 md:mt-0 p-5  relative ">
        
        <div className="flex flex-col items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <img
              src={slides[currentSlide].icon}
              alt="Product icon"
              className="w-10 md:w-14 object-contain"
            />
            <p>{slides[currentSlide].info}</p>
          </div>
          <p className="text-2xl md:text-4xl font-semibold leading-tight">
            {slides[currentSlide].bigInfo}
          </p>
          <a
            href="#"
            className="hover:underline hover:underline-offset-4 cursor-pointer active:scale-95 transition-all"
          >
            Shop Now &rarr;
          </a>
        </div>

        
        <div  onClick={() => changeImage("next")} className="cursor-pointer ">
          <img
            src={slides[currentSlide].image}
            alt="Product image"
            className="h-64 md:h-80 w-72 object-contain"
          />
        </div>

       
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${
                currentSlide === index ? "bg-white" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>

        
        <div className="flex flex-row gap-5 absolute bottom-4 right-4 md:hidden">
          <span
            onClick={() => changeImage("prev")}
            className="flex justify-center items-center bg-blue-50 text-black text-xl rounded-full h-10 w-10 hover:bg-blue-100"
            aria-label="Previous Slide"
          >
            <FaArrowLeft />
          </span>
          <span
            onClick={() => changeImage("next")}
            className="flex justify-center items-center bg-blue-50 text-black text-xl rounded-full h-10 w-10 hover:bg-blue-100"
            aria-label="Next Slide"
          >
            <FaArrowRight />
          </span>
        </div>
      </div>
      </div>
    </div>
  );
}
