'use client'
import Image from "next/image";
import ContentOne from "./ContentOne/ContentOne";
import Category from "./Category/Category";
import Footer from "./Footer/Footer";
import Promise from "./Promise/Promise";
import Today from "./Today/Today";
import Month from "./Month/Month";
import Music from "./Speaker/Music";
import Product from "./Products/Product";
import NewArrival from "./NewArrival/NewArrival";
import MobileNav from "./mobilenav/MobileNav";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {app} from '../app/config';
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { persistor } from "@/Redux/Store";




// const productss: Product[] = [
//     {
//       id: 1,
//       name: "ASUS FHD Gaming Laptop",
//       price: 700,
//       rating: 5,
//       image: "/Product-images/laptop.png",
//       quantity: 1,
//       subtotal: 700,
//     },
//     {
//       id: 2,
//       name: "Quilted Satin Jacket",
//       price: 660,
//       rating: 5,
//       image: "/Product-images/jacket.png",
//       quantity: 1,
//       subtotal: 660,
//     },
//     {
//       id: 3,
//       name: "GP11 USB Gamepad",
//       price: 660,
//       rating: 5,
//       image: "/Product-images/gamepad.png",
//       quantity: 1,
//       subtotal: 660,
//     },
//     {
//       id: 4,
//       name: "Breed Dry Dog Food",
//       price: 100,
//       rating: 5,
//       image: "/Product-images/dog food.jpeg",
//       quantity: 1,
//       subtotal: 100,
//     },
//     {
//       id: 5,
//       name: "Curology Product Set",
//       price: 500,
//       rating: 4,
//       image: "/Product-images/curology.png",
//       quantity: 1,
//       subtotal: 500,
//     },
//     {
//       id: 6,
//       name: "Kids Electric Car",
//       price: 120,
//       rating: 5,
//       image: "/Product-images/car.png",
//       quantity: 1,
//       subtotal: 120,
//     },
//     {
//       id: 7,
//       name: "Canon DSLR Camera",
//       price: 360,
//       rating: 5,
//       image: "/Product-images/camera.png",
//       quantity: 1,
//       subtotal: 360,
//     },
//     {
//       id: 8,
//       name: "Jr. Zoom Soccer Cleats",
//       price: 120,
//       rating: 5,
//       image: "/Product-images/boots.png",
//       quantity: 1,
//       subtotal: 120,
//     },
//   ];


// const monthProducts: Product[] = [
//   {
//     id: 9,
//     name: "The north coat",
//     price: 260,
//     rating: 5,
//     image: "/Month-images/jacket.png",
//     quantity: 1,
//     subtotal: 260,
//   },
//   {
//     id: 10,
//     name: "Gucci duffle bag",
//     price: 960,
//     rating: 5,
//     image: "/Month-images/gucci.png",
//     quantity: 1,
//     subtotal: 960,
//   },
//   {
//     id: 11,
//     name: "RGB liquid CPU Cooler",
//     price: 160,
//     rating: 5,
//     image: "/Month-images/cpu.png",
//     quantity: 1,
//     subtotal: 160,
//   },
//   {
//     id: 12,
//     name: "Small BookSelf",
//     price: 360,
//     rating: 5,
//     image: "/Month-images/bookself.png",
//     quantity: 1,
//     subtotal: 360,
//   },
// ];



// const Todayproducts: Product[] = [
//   {
//     id: 13,
//     name: "ASUS FHD Gaming Laptop",
//     price: 700,
//     rating: 5,
//     image: "/Product-images/laptop.png",
//     quantity: 1,
//     subtotal: 700,
//   },
//   {
//     id: 14,
//     name: "Quilted Satin Jacket",
//     price: 660,
//     rating: 5,
//     image: "/Product-images/jacket.png",
//     quantity: 1,
//     subtotal: 660,
//   },
//   {
//     id: 15,
//     name: "GP11 USB Gamepad",
//     price: 660,
//     rating: 5,
//     image: "/Product-images/gamepad.png",
//     quantity: 1,
//     subtotal: 660,
//   },
//   {
//     id: 16,
//     name: "Breed Dry Dog Food",
//     price: 100,
//     rating: 5,
//     image: "/Product-images/dog food.jpeg",
//     quantity: 1,
//     subtotal: 100,
//   },
//   {
//     id: 17,
//     name: "Curology Product Set",
//     price: 500,
//     rating: 4,
//     image: "/Product-images/curology.png",
//     quantity: 1,
//     subtotal: 500,
//   },
//   {
//     id: 18,
//     name: "Kids Electric Car",
//     price: 120,
//     rating: 5,
//     image: "/Product-images/car.png",
//     quantity: 1,
//     subtotal: 120,
//   },
//   {
//     id: 19,
//     name: "Canon DSLR Camera",
//     price: 360,
//     rating: 5,
//     image: "/Product-images/camera.png",
//     quantity: 1,
//     subtotal: 360,
//   },
//   {
//     id: 20,
//     name: "Jr. Zoom Soccer Cleats",
//     price: 120,
//     rating: 5,
//     image: "/Product-images/boots.png",
//     quantity: 1,
//     subtotal: 120,
//   },
// ];





export default function Home() {

  // let count = 0;
  // const db = getFirestore(app);

  // const todayUploadProducts = async () => {
  //   if(count == 0){
  //     count++;
    
  //   try{
  //     const productCollections = collection(db,'TodayProducts');
  //     for(const product of Todayproducts){
  //       await addDoc(productCollections,product);
  //     }
  //     console.log("products uploaded Succesfully");
  //   }catch(error){
  //     console.log("Error uploading products");
  //   }
  // }
  // };

  // useEffect(()=>{
  //   todayUploadProducts();
  // },[]);


  //  let count=0

  // const db = getFirestore(app);

  // const monthuploadProducts = async () => {
  //   if(count == 0){
  //     count++;
    
  //   try {
  //     const productCollection = collection(db, 'Monthproducts');
  //     for (const product of monthProducts) {
  //       await addDoc(productCollection, product);
  //     }
  //     console.log("Products uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error uploading products: ", error);
  //   }
  // }
  // };

  // useEffect(()=>{
    

  //   monthuploadProducts();
  // },[])





  // let count =0;
  // const db = getFirestore(app);

  // const upload = async ()=>{
  //   if(count==0){
  //     count++;
    
  //   try{
  //     const totalProduct = collection(db,'productsDown');
  //     for(const products of productss){
  //       await addDoc(totalProduct, products);
  //     }
  //     console.log("Products uploaded successfully");
  //   }catch(error){
  //     console.log("Error! ");
  //   }
  // }
  // }

  // useEffect(()=>{
  //   upload();
  // },[])

  useEffect(()=>{
    const token = getCookie('token');
    if(!token){
      persistor.purge();
    }
  })
  
  
  return (
    <>
      <MobileNav />
      {/* <ContentOne /> */}
      <Today />
      <hr className="md:border-1 md:mt-10 md:ml-44 md:mr-40 md:mb-16 border-1 mt-10 ml-10 mr-10 mb-10"></hr>
      <Category />
      <hr className="md:border-1 md:mt-24 md:ml-44 md:mr-40 md:mb-16 border-1 mt-14 ml-10 mr-10 mb-4"></hr>
      <br></br>
      <br></br>
      <Month />
      <hr className="md:border-1 md:mt-24 md:ml-44 md:mr-40 md:mb-16 border-1 mt-14 ml-10 mr-10 mb-4"></hr>
      <br></br>
      <Music />
      <hr className="md:border-1 md:mt-24 md:ml-44 md:mr-40 md:mb-16 border-1 mt-14 ml-10 mr-10 mb-4"></hr>
      <Product />
      <hr className="md:border-1 md:mt-24 md:ml-44 md:mr-40 md:mb-16 border-1 mt-14 ml-10 mr-10 mb-4"></hr>
      <NewArrival />
      <hr className="md:border-1 md:mt-24 md:ml-44 md:mr-40 md:mb-16 border-1 mt-14 ml-10 mr-10 mb-4"></hr>
      <Promise />
      <hr className="md:border-1 md:mt-24 md:ml-44 md:mr-40 md:mb-16 border-1 mt-14 ml-10 mr-10 mb-4"></hr>
      <Footer />
    </>
  );
}
