import React from "react";
import Link from "next/link";
import Image from "next/image";
const AboutContent = () => {
  return (
    <>
      {/* page-Navigation */}
      <div className=" whitespace-break-spaces mt-20 md:ml-16  mr-56   ">
        <div className=" md:flex md:justify-start md:items-start md:ml-20  flex  ml-6 ">
          <p>
            <Link href="/" className="opacity-50 leading-21 font-normal text-sm ">
              Home
            </Link>{" "}
            / <span className=" leading-21 font-normal text-sm">About</span>
          </p>
        </div>
      </div>

      {/*Our story */}
      <div className=" md:flex md:items-center md:justify-between md:mt-10 md:mb-3 ">
        <div className="md:flex md:flex-col md:gap-8 md:ml-36 flex flex-col md:flex-start items-center mt-14">
          <p className="text-5xl font-semibold flex   ">Our Story</p>
          <div>
            <div>
              <p className="text-xl   md:px-0 px-6 md:pt-0 pt-10 text-pretty ">
                Launced in 2015, Exclusive is South Asia’s premier online
                shopping
                <br /> makterplace with an active presense in Bangladesh.
                Supported
                <br /> by wide range of tailored marketing, data and service
                solutions,
                <br /> Exclusive has 10,500 sallers and 300 brands and serves 3{" "}
                <br /> millioons customers across the region.
              </p>
            </div>
          </div>
        </div>
        {/* Image tag*/}
        <div>
          <img
            className="md:h-[609px] h-[400px] md:w-[705px] p-10 md:mr-52 "
            src="About-images\photo-1.png"
            alt="xxx"
          />
        </div>
      </div>
    </>
  );
};

export default AboutContent;
