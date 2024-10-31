"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/Redux/Store";
import { MdManageAccounts, MdOutlinePersonOutline, MdCancel } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { IoMdStarOutline } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import toast, { Toaster } from "react-hot-toast";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { fetchUserCartAndWishlist, saveUserCartAndWishlist } from "@/Redux/CreateSlice";

const logout = () => toast.success("Logged Out Successfully");

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(saveUserCartAndWishlist(token, cartData, wishListData) as any);
    }
  }, []);

  const number = useSelector((state: RootState) => state.cart.totalProductInCart);
  const totalwish = useSelector((state: RootState) => state.cart.totalProductInWishlist);

  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  async function loggout() {
    const token = getCookie("token");
    deleteCookie("token");
    router.push("/");
    logout();
    persistor.purge();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const wishListData = useSelector((state: RootState) => state.cart.wishListData);
  const cartData = useSelector((state: RootState) => state.cart.cartData);
  const displayName = useSelector((state: RootState) => state.auth.user?.displayName);

  async function nclick() {
    const token = getCookie("token");
    if (token) {
      try {
        await dispatch(saveUserCartAndWishlist(token, cartData, wishListData) as any);
      } catch (error) {
        console.error("Error saving cart and wishlist:", error);
      }
    }
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(saveUserCartAndWishlist(token, cartData, wishListData) as any);
    }
  }, [displayName, cartData, wishListData]);

  return (
    <nav className="flex justify-between items-center h-14 w-full py-4 px-6 border-2 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <Toaster />
      <div className="lg:hidden flex items-center justify-between w-full">
        <p className="text-2xl font-bold md:hidden tracking-3 leading-24 select-none">
          Exclusive
        </p>
        <button
          onClick={toggleNavbar}
          className="focus:outline-none cursor-pointer -translate-x-16"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="lg:flex hidden justify-between w-full">
        <div className="flex items-center justify-between text-sm font-normal w-full">
          <p className="text-2xl font-bold leading-24 tracking-3 select-none">Exclusive</p>
          <div className="flex gap-12">
            <Link href="/" className="text-base font-normal hover:underline cursor-pointer">
              Home
            </Link>
            <Link href="/Contact" className="text-base font-normal hover:underline cursor-pointer">
              Contact
            </Link>
            <Link href="/About" className="text-base font-normal hover:underline cursor-pointer">
              About
            </Link>
            {!loggedIn ? (
              <Link href="/signup" className="text-base font-normal hover:underline cursor-pointer">
                Sign Up
              </Link>
            ) : null}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center w-[250px] h-[38px] bg-[#f5f5f5] rounded-[4px] px-[12px] gap-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-grow bg-[#f5f5f5] text-xs focus:outline-none"
              />
              <IoSearch className="text-gray-500 cursor-pointer" />
            </div>
            <div className="relative">
              <Link href="/Wishlist" className="text-2xl">
                <FiHeart />
              </Link>
              {totalwish > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                  {totalwish}
                </span>
              )}
            </div>
            <div className="relative">
              <Link href="/Cart" className="text-3xl">
                <IoCartOutline />
              </Link>
              {number > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                  {number}
                </span>
              )}
            </div>
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="text-xl border-2 h-8 border-black rounded-full w-8 flex justify-center cursor-pointer"
              >
                {displayName ? displayName.charAt(0) : <MdOutlinePersonOutline className="text-2xl" />}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white shadow-lg">
                  <Link href="/Account" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-500">
                    <MdManageAccounts className="text-2xl" />
                    Manage My Account
                  </Link>
                  <Link href="/" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-500">
                    <LuShoppingBag className="text-2xl" />
                    My Order
                  </Link>
                  <Link href="/" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-500">
                    <MdCancel className="text-2xl" />
                    My Cancellations
                  </Link>
                  <Link href="/" className="flex items-center gap-2 px-2 py-2 hover:bg-gray-500">
                    <IoMdStarOutline className="text-2xl" />
                    My Reviews
                  </Link>
                  <button onClick={loggout} className="flex items-center gap-2 px-2 py-2 hover:bg-gray-500">
                    <SlLogout className="text-2xl" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed top-16 right-0 bg-black shadow-md z-10 py-6 px-6 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300 ease-in-out w-64`}
      >
        <div className="flex flex-col items-center space-y-3">
          <p className="text-3xl font-semibold text-white">Exclusive</p>
          <Link href="/" className="text-lg font-semibold text-white">Home</Link>
          <Link href="/Contact" className="text-lg font-semibold text-white">Contact</Link>
          <Link href="/About" className="text-lg font-semibold text-white">About</Link>
          <Link href="/signup" className="text-lg font-semibold text-white">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
