"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config";
import { getCookie } from "cookies-next";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const AddressInfo = () => {
  const [addressData, setAddressData] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // for editing
  const token = getCookie("token");

  
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  

  // Fetch saved addresses on page load
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userRef = doc(db, "users", token);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setAddressData(data.addresses || []);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (token) {
      fetchAddresses();
    }
  }, [token]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  // Validation for empty fields
  const isFormValid = () => {
    return Object.values(newAddress).every((field) => field.trim() !== "");
  };

  // Add or Update Address
  const saveAddress = async () => {
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    if (!isFormValid()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const userRef = doc(db, "users", token);
      let updatedAddresses = [...addressData];

      if (editIndex !== null) {
        updatedAddresses[editIndex] = newAddress; 
      } else {
        updatedAddresses.push(newAddress); // Add new address
      }

      await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });
      setAddressData(updatedAddresses);
      toast.success(editIndex !== null ? "Address updated successfully!" : "Address added successfully!");

      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
      setShowForm(false);
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address.");
    }
  };

  // Edit address
  const editAddress = (index: number) => {
    setNewAddress(addressData[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  // Delete address
  const deleteAddress = async (index: number) => {
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      const userRef = doc(db, "users", token);
      const updatedAddresses = [...addressData];
      updatedAddresses.splice(index, 1); // Remove the address from the array

      await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });
      setAddressData(updatedAddresses);
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address.");
    }
  };

  return (
    <>
    
      <div className="md:flex md:justify-between select-none ">
      <Toaster />
        <p className="whitespace-break-spaces md:ml-36 ml-6 md:mt-20 md:mb-20 flex md:justify-center items-center mt-20 select-none ">
          <Link href="/" className="opacity-50 leading-21 font-normal text-sm">
            Home
          </Link>{" "}
          /<span className=" leading-21 font-normal text-sm select-none "> My Account</span>
        </p>
        <p className="md:flex md:justify-center md:items-center md:mr-36 whitespace-break-spaces flex justify-center items-center mt-4 text-sm font-normal leading-21">
          <b>Welcome!</b>
        </p>
      </div>

      <div className="md:flex md:justify-between md:ml-28 md:gap-10 md:mr-36 md:mb-20">
        <div className=" flex justify-center mt-10 md:-mt-9">
          <div className="md:p-10 ">
            <p className="text-base font-medium leading-24 select-none ">Manage My Account</p>
            <p className="ml-8 text-base font-normal opacity-50 mt-1 cursor-pointer select-none  ">
             <Link href="/Account" > My Profile</Link>
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer text-check-red leading-24 select-none ">
              Address Book
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24 select-none ">
             <Link href="PaymentPage"> My Payment</Link>
            </p>
            <p className="text-base font-medium md:mt-2 leading-24 select-none ">My Orders</p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24 select-none ">
              My Returns
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 md:mb-2 leading-24 select-none ">
              My Cancellations
            </p>
            <p  className="text-base font-medium leading-24 select-none ">
            <Link href="Wishlist"> My WishList</Link> 
            </p>
          </div>
        </div>

        <div className="shadow-2xl md:w-3/4 md:flex md:flex-col md:p-12 mt-10 md:-mt-12 flex justify-center flex-col item mb-20 md:mb-0 ml-2 md:ml-0 mr-2 md:mr-2">
          <p className="md:text-xl text-2xl font-medium text-check-red flex justify-center mt-7 md:mt-0 md:justify-start leading-28 select-none  ">
            All Address
          </p>

          {/* Display saved addresses */}
          <div className="mt-4 ">
            {addressData.length > 0 ? (
              addressData.map((address, index) => (
                <div key={index} className="p-4 border-2 border-check-red rounded mb-4 flex justify-between items-center bg-white select-none  ">
                  <div>
                    <p>
                      <b className="text-black">{address.name}</b>
                    </p>
                    <p className="text-black">{address.street}</p>
                    <p className="text-black">
                      {address.city}, {address.state}, {address.zip}
                    </p>
                    <p className="text-black">{address.country}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => editAddress(index)} className=" text-3xl">
                      <FaEdit />
                    </button>
                    <button onClick={() => deleteAddress(index)} className="text-black text-2xl">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="md:ml-0 ml-32">No saved addresses.</p>
            )}
          </div>

          {/* Add New Address Button */}
          <div className="md:flex md:justify-end md:gap-10 md:mt-5 flex justify-center gap-4 mt-4 mb-10 w-44 ml-28 md:w-full">
            <button
              onClick={() => {
                setShowForm(true);
                setEditIndex(null); // Reset the form for adding new address
              }}
              className="md:h-12 h-12 p-3 md:flex md:justify-center md:items-center bg-check-red text-center md:gap-2 rounded-md text-white md:-translate-x-28 flex justify-center items-center"
            >
              <FaPlus className="mr-2 select-none " />
              Add New 
            </button>
          </div>

          {/* Address Form */}
          {showForm && (
            <div className="p-6 shadow-md border rounded select-none ">
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border p-2 mb-2 w-full"
                required
              />

              {/* State Dropdown */}
              <select
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="zip"
                value={newAddress.zip}
                onChange={handleInputChange}
                placeholder="Pin Code"
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                name="country"
                value={newAddress.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="border p-2 mb-4 w-full"
                required
              />

              <button
                onClick={saveAddress}
                className="bg-check-red text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                {editIndex !== null ? "Update Address" : "Save Address"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressInfo;
