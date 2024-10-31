"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/app/config";

const ResetPassword = () => toast.success("Reset Mail Sent. Check your Inbox!");

const wrongMail = () => {
  toast.error("Enter Your Registered Mail Id!");
};

const ChangePassword = () => {
  let [email, setEmail] = useState("");
  let [resend, setResend] = useState(false);
  let [cooldown, setCooldown] = useState(30); 
  let [isCooldownActive, setIsCooldownActive] = useState(false); 

  
  useEffect(() => {
    if (isCooldownActive && cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (cooldown === 0) {
      setIsCooldownActive(false);
    }
  }, [cooldown, isCooldownActive]);

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      await sendPasswordResetEmail(auth, email);
      ResetPassword();
      resendEmail();
    } catch (error) {
      console.log("Could not send the mail!");
    }
  };

  const resendEmail = () => {
    setResend(true);
    setIsCooldownActive(true);
    setCooldown(30); // Reset cooldown to 30 seconds
  };

  const handleResend = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      setIsCooldownActive(true); // Start cooldown again
      setCooldown(30); // Reset to 30 seconds again
    } catch (error) {
      console.log("Could not resend the mail!");
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="md:flex md:mb-20 m-10 ">
      <Toaster />
      <div className="md:object-contain md:mt-20 md:ml-28 md:w-1/2 mt-20 ">
        <img
          className="md:h-full md:w-full"
          src="/signup/main.jpeg"
          alt="Login Image"
        />
      </div>
      <div className="md:flex md:flex-col md:justify-center md:items-start md:w-1/2  md:gap-14 md:pl-36 md:mr-24 flex flex-col w-full mt-10 gap-7 ">
        <div className="md:flex md:flex-col md:gap-4 flex flex-col flex-start gap-2 ">
          <p className="md:text-5xl text-3xl select-none ">
            Reset Your Password
          </p>
          <p className="md:text-xl text-base select-none">
            Enter your Registered Mail below
          </p>
        </div>

        <form onSubmit={handleReset} className="md:mt-14">
          <input
            className="md:border-b md:text-lg text-sm md:border-black md:w-96 w-72 md:outline-none border-b border-black outline-none select-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />

          <div className="md:mt-20 flex mt-10">
            <button
              type="submit"
              className="text-white bg-check-red w-24 md:w-32 h-12 active:scale-90  transition-all select-none"
            >
              Send Mail
            </button>

            {resend && (
              <button
                className="text-white bg-check-red w-32  h-12 ml-12 active:scale-90  transition-all select-none"
                onClick={handleResend}
                disabled={isCooldownActive} // Disable button during cooldown
              >
                {isCooldownActive ? `Resend in ${cooldown}s` : "Resend Mail "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
