"use client";

import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { app } from "../config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import {
  setEmail,
  setPassword,
  setName,
  setError,
  setLoading,
  setUser,
} from "@/Redux/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import toast, { Toaster } from "react-hot-toast";

const accountCreation = () =>
  toast.success("Account Created Successfully! Login into the App");

const SignupMain = () => {
  const dispatch = useDispatch();
  const { email, password, name, user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/login");
      accountCreation();
    } catch (error: any) {
      console.log("Error signing in with Google:", error.message);
      dispatch(setError(error.message));
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      await sendEmailVerification(userCredential.user);
      router.push("/login");

      toast.success("Verfication email sent! Please check your inbox");
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:flex md:mb-20 m-10">
      <div className="md:object-contain md:w-1/2 md:mt-20">
        <img
          className="md:h-full md:w-full mt-20 md:mt-0 md:ml-28 "
          src="/signup/main.jpeg"
          alt="Signup"
        />
      </div>
      <div className="md:flex md:flex-col md:justify-center md:items-start md:w-1/2 md:mt-20 md:gap-8 md:pl-52 md:m-10 flex flex-col w-full mt-10 gap-7">
        <div className="md:flex md:flex-col md:gap-4 flex flex-col flex-start gap-2">
          <p className="md:text-5xl text-3xl select-none">Create an account</p>
          <p className="md:text-xl text-base select-none">
            Enter your details below
          </p>
        </div>
        <form
          onSubmit={handleSignUp}
          className="md:flex md:flex-col md:w-full md:gap-8 flex flex-col gap-8"
        >
          <input
            className="md:border-b md:text-lg text-sm md:border-black md:w-9/12 md:outline-none border-b border-black outline-none select-none"
            placeholder="Name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            required
          />
          <input
            className="md:border-b md:text-lg text-sm md:border-black md:w-9/12 md:outline-none border-b border-black outline-none select-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
          <input
            className="md:border-b md:text-lg text-sm md:border-black md:w-9/12 md:outline-none border-b border-black outline-none select-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="md:flex md:justify-between md:gap-5 md:w-9/12 flex gap-4">
            <button
              type="submit"
              className="md:text-white md:bg-check-red md:h-10 md:rounded-sm bg-red-600 w-36 h-12 text-white rounded-sm text-sm active:scale-90  transition-all select-none"
            >
              Create Account
            </button>
            <button
              onClick={signInWithGoogle}
              className="md:border md:border-black md:h-10 md:flex md:justify-center md:items-center gap-1 md:gap-2 flex justify-center items-center border border-black whitespace-nowrap rounded-sm p-1 text-sm active:scale-90  transition-all select-none"
            >
              <FaGoogle />
              Sign up with Google
            </button>
          </div>
        </form>
        <div className="md:flex md:gap-2 md:w-9/12 md:justify-center flex items-center justify-center gap-2 select-none">
          <p>Already have an account?</p>
          <Link
            href="/login"
            className="hover:underline hover:underline-offset-[5px] active:scale-90  transition-all select-none"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupMain;
