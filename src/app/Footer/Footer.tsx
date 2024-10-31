import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="min-w-full sm:flex md:flex-wrap lg:flex-row justify-around bg-black text-white p-5 md:p-8 overflow-hidden">
        <div className="flex flex-col gap-4 mt-10 md:mt-20 md:items-start">
          <p className="text-2xl font-bold">Exclusive</p>
          <p>Subscribe </p>
          <p>Get 10% off your first order</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black border border-white text-white p-2 w-full md:w-auto"
            />
            <button className="bg-white text-black p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 15.75L21 12m0 0L17.25 8.25M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-10 md:mt-20 md:items-start">
          <p className="text-2xl font-bold">Support</p>
          <address className="not-italic">
            111 Bijoy Sarani, Dhaka,
            <br />
            DH 1515, Bangladesh.
          </address>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div className="flex flex-col gap-4 mt-10 md:mt-20 md:items-start">
          <Link href="/Account" className="text-2xl font-bold">Account</Link>
          <p>My Account</p>
          <Link href="/login">Login/Register</Link>
          <Link href="/Cart">Cart</Link>
          <Link href="/Wishlist">WishList</Link>
          <p>Shop</p>
        </div>

        <div className="flex flex-col gap-4 mt-10 md:mt-20 md:items-start">
          <p className="text-2xl font-bold">Quick Links</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>

        <div className="flex flex-col gap-4 mt-10 md:mt-20 md:items-start">
          <p className="text-2xl font-bold">Download App</p>
          <p>Save $3 with App New User Only</p>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <img src="/playstore.png" width={144} height={40} alt="Playstore" />
            <img src="/appstore.png" width={144} height={40} alt="Appstore" />
          </div>
          <div className="flex space-x-4 md:justify-start">
            <a href="https://www.facebook.com" aria-label="Facebook">
              <FaFacebookF className="text-white h-6 w-6" />
            </a>
            <a href="https://www.x.com" aria-label="Twitter">
              <FaTwitter className="text-white h-6 w-6" />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram">
              <FaInstagram className="text-white h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn className="text-white h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <hr className="border border-footer-white opacity-40" />
      <div className="flex justify-center text-white bg-black h-20 items-center text-sm md:text-base min-w-full">
        &#169;Copyright Rimel 2022. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
