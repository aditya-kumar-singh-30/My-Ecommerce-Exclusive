"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { setPassword } from "@/Redux/SignupSlice";
import toast, { Toaster } from "react-hot-toast";
import { auth, db } from "../config";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getCookie } from "cookies-next";
import { FaEdit } from "react-icons/fa";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { EmailAuthProvider } from "firebase/auth";
import { MdAddAPhoto } from "react-icons/md";




const AccountContent = () => {
  const displayName = useSelector(
    (state: RootState) => state.auth.user?.displayName
  );
  const useremail = useSelector((state: RootState) => state.auth.user?.email);


  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("profile-photo.jpg");
  const [isUploading, setIsUploading] = useState(false);

  const storage = getStorage();

 
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const token = getCookie('token');

  const fetchProfilePicUrl = async (token: string) => {
    try {
      const userRef = doc(db, "users", token);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data && data.profilePicUrl) {
          setProfilePicUrl(data.profilePicUrl);
        } else {
          setProfilePicUrl(profilePicUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

 
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }
  const token = getCookie('token');
    const storageRef = ref(storage, `profile-pics/${token}/${selectedFile.name}`);

    try {
      setIsUploading(true);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      
      const userRef = doc(db, "users", token);
      await setDoc(userRef, { profilePicUrl: downloadURL }, { merge: true });

      setProfilePicUrl(downloadURL);
      setSelectedFile(null);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload profile picture.");
    }finally{
      setIsUploading(false);

    }
  };

  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const ResetPassword = async () => {
    const token = getCookie("token");
    if (token) {
      if (Password != confirmPassword) {
        toast.error("New Password and Confirm-Password does not match!");
      }
    }

    if (!Password) {
      return;
    }
    
   const credential = EmailAuthProvider.credential(useremail,currentPassword)

    try {
      const user = auth.currentUser;
      if (user) {
      const credential = EmailAuthProvider.credential(useremail,currentPassword);

      console.log( await reauthenticateWithCredential(user,credential));
     
        await updatePassword(user, Password);
        toast.success("Password Updated Successfully!");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfilePicUrl(token);
    }
  }, [token]);

  return (
    <>
      <div className="md:flex md:justify-between ">
        <Toaster />
        <p className="whitespace-break-spaces md:ml-36 ml-6 md:mt-20 md:mb-20 flex md:justify-center items-center mt-20">
        <Link href="/" className="opacity-50 leading-21 font-normal text-sm">
              Home
            </Link>{" "}
          /<span className=" leading-21 font-normal text-sm"> My Account</span>
        </p>
        <p className="md:flex md:justify-center md:items-center md:mr-36 whitespace-break-spaces flex justify-center items-center mt-4 text-sm font-normal leading-21">
          <b>Welcome!</b>
          <span className="text-red-500 leading-21 whitespace-break-spaces ">
            {" "}
            {displayName || ""}{" "}
          </span>
        </p>
      </div>

      <div className="md:flex  md:justify-between md:ml-28 md:gap-10 md:mr-36 md:mb-20  ">
        <div className=" flex justify-center mt-10 md:-mt-9">
          <div className="md:p-10 ">
            <p className="text-base font-medium leading-24 ">
              Manage My Account
            </p>
            <p className="ml-8 text-base font-normal text-check-red mt-1 cursor-pointer ">
              My Profile
            </p>
            <p  className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24">
             <Link href='/AddressPage'> Address Book</Link>
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24">
             <Link href='/PaymentPage'>My Payment</Link> 
            </p>
            <p className="text-base font-medium md:mt-2 leading-24">
              My Orders
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24">
              My Returns
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 md:mb-2 leading-24">
              My Cancellations
            </p>
            <Link
              href="Wishlist"
              className="text-base font-medium leading-24  "
            >
              My WishList
            </Link>
          </div>
        </div>

        <div className="shadow-2xl md:w-3/4 md:flex md:flex-col md:p-12 mt-10 md:-mt-12  flex justify-center flex-col item mb-20 md:mb-0 ml-2 md:ml-0 mr-2 md:mr-2">
          <p className=" md:text-xl text-2xl font-medium text-check-red flex justify-center mt-7 md:mt-0 md:justify-start leading-28 select-none ">
            Edit Your Profile
          </p>
          <div className="relative">
      {/* Profile picture */}
      <img
        src={profilePicUrl}
        className="object-cover bg-no-repeat md:w-44 w-28 md:h-44 h-28 md:translate-x-80 translate-x-36 rounded-full flex mt-10 md:-mt-14  justify-between items-center"
        alt="Profile"
      />

   
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

     
      <span
        className="absolute md:translate-x-52 translate-x-0 left-56 bg-check-red  items-center p-2 text-white rounded-full top-32 md:top-24 md:text-xl cursor-pointer text-base active:scale-110 transition-all"
        onClick={() => document.getElementById("fileInput").click()} 
      >
       <MdAddAPhoto />
      </span>

      
      {selectedFile && (
        <button
          className="absolute md:left-56 translate-x-64 md:ml-10 ml-2 md:top-6 top-20 bg-check-red text-white p-2 rounded-md"
          onClick={handleUpload}
          disabled={isUploading}
        >
         {isUploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
          

          <div className="md:flex  mt-7 md:mt-6 flex gap-32 ml-2 md:ml-0 select-none ">
            <p className="md:text-base md:font-normal leading-24 whitespace-nowrap">
              First Name
            </p>
            <p className="    md:text-base md:font-normal leading-24 md:ml-64 md:mr-0  border-radius w-28   whitespace-nowrap -translate-x-6 md:-translate-x-0">
              Last Name
            </p>
          </div>
          <div className="md:flex md:justify-between  md:w-full  flex gap-3 ml-2 md:ml-0 select-none">
            <input
              placeholder={displayName?.split(" ")[0] || "First Name"}
              className="md:h-12 md:w-96 w-44  text-sm bg-whitesmoke md:p-2 p-3   md:text-base  "
            />
            <input
              placeholder={
                displayName?.split(" ").slice(1).join(" ") || "Last Name"
              }
              className="md:h-12 md:w-96 w-48   text-sm md:text-base p-2  bg-whitesmoke "
            />
          </div>
          <div className="md:flex md:justify-between mt-7 flex gap-32 ml-2 md:ml-0 ">
            {/* <p className="md:text-base md:font-normal  leading-24 ">Email</p> */}
            {/* <p className="md:mr-80  md:text-base md:font-normal leading-24">Address</p> */}
          </div>
          <div className="md:flex md:justify-between md:w-full flex gap-3 ml-2 md:ml-0 ">
            {/* <input
              placeholder= { useremail || "Email"}
              className="md:h-12 md:w-96  text-sm p-2 bg-whitesmoke   md:text-base "
            /> */}
            {/* <input
              placeholder="Hanging Panda , Sector-63"
              className="md:h-12 md:w-96  text-sm p-2 bg-whitesmoke md:text-base" 
            /> */}
          </div>
          <p className=" md:text-base md:font-normal md:mb-2 text-center mt-0 md:-mt-2   flex justify-center md:justify-start leading-24 select-none">
            Password Changes
          </p>

          <div className="md:flex md:flex-col md:gap-3 flex justify-center items-center flex-col gap-3 md:w-auto w-full  md:mt-0 mt-10 md:p-0 p-3">
            <input
              type="text"
              className="md:h-12 md:p-5 md:w-full bg-whitesmoke w-full p-2"
              placeholder="Current Password" required
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              className="md:h-12 md:p-5 md:w-full bg-whitesmoke select-none w-full p-2"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              required
            />
            <input
              type="text"
              className="md:h-12 md:w-full md:p-5 bg-whitesmoke select-none w-full p-2"
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          <div className="md:flex md:justify-end  md:gap-10 md:mt-5 flex justify-center gap-4 mt-4 mb-10 w-44 ml-28  md:w-full ">
            <button>Cancel</button>
            <button
              onClick={ResetPassword}
              className="md:h-12 h-12 p-3 md:flex md:justify-center md:items-center bg-check-red text-center md:p-5 md:mr-28 text-white rounded select-none active:scale-105 whitespace-nowrap"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountContent;
