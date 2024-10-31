"use client";

import { RootState } from "@/Redux/Store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  addtocartData,
  deleteFromCart,
  ProductInCart,
  info,
  UPquantity,
  DownQuantity,
} from "@/Redux/CreateSlice";
import toast, { Toaster } from "react-hot-toast";

const delNotify = () => toast.success("Removed from cart!");
const ExNotify = () => toast.error("Maximum product can be 10!");

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number; // Represents the quantity of this product in the cart
  subtotal: number; // Represents the subtotal for the product (price * quantity)
}

const CartContent = () => {
  const dispatch = useDispatch();
  const cartProduct: Product[] = useSelector(
    (state: RootState) => state.cart.cartData
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: Product
  ) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) return; // Ignore invalid input
    if (newQuantity > 10) {
      ExNotify();
      return;
    }
    dispatch(
      info({
        ...product,
        quantity: newQuantity,
        subtotal: newQuantity * product.price,
      })
    );
  };

  const deletefromcart = (product: Product) => {
    dispatch(deleteFromCart(product));
    dispatch(ProductInCart());
    delNotify();
  };

  const increaseQuantity = (product: Product) => {
    const newQuantity = product.quantity + 1;
    if (newQuantity <= 10) {
      dispatch(
        UPquantity({
          ...product,
          quantity: newQuantity,
          subtotal: newQuantity * product.price,
        })
      );
    } else {
      ExNotify();
    }
  };

  const lowQuantity = (product: Product) => {
    const newQuantity = product.quantity - 1;
    if (newQuantity >= 1) {
      dispatch(
        DownQuantity({
          ...product,
          quantity: newQuantity,
          subtotal: newQuantity * product.price,
        })
      );
    }
  };

  const total = cartProduct.reduce((acc, product) => acc + product.subtotal, 0);

  return (
    <>
      <div>
        <Toaster />
        <p className="whitespace-break-spaces md:ml-36 md:mt-20 md:mb-20 ">
          <span className="opacity-50">Home / </span>
          <b>Cart</b>
        </p>
      </div>

      <div className="md:flex md:h-20 md:items-center md:justify-center md:mb-10 md:ml-36 md:mr-60 shadow-lg flex h-10 items-center justify-center mb-10  mr-10 mt-10 gap-10 md:w-4/5 p-6 w-full select-none">
        <p className="w-1/4 md:text-base md:font-medium md:ml-5 text-sm ">
          Product
        </p>
        <p className="w-1/4 md:text-base md:font-medium md:mr-8 text-sm md:ml-8">
          Price
        </p>
        <p className="w-1/4 md:text-base md:font-medium text-sm md:ml-5">
          Quantity
        </p>
        <p className="w-1/4 md:text-base md:font-medium text-sm ">Subtotal</p>
        <p className="md:mr-9 md:text-base md:font-medium hidden md:block">
          Del
        </p>
      </div>

      <div className="md:mb-10 md:ml-28 md:w-4/5  ">
        {cartProduct.map((product) => (
          <div
            key={product.id}
            className="md:flex md:items-center md:text-start shadow-lg md:h-20 md:mt-10 flex  mt-10 mr-10 md:mr-20 w-full  md:ml-8"
          >
            <div className="md:flex md:items-center md:gap-1 md:w-1/4 w-1/4 ml-5">
              <img src={product.image} className="w-10 h-10 md:ml-5 " alt="" />
              <p className="md:text-base md:font-normal text-[10px] select-none ">
                {product.name}
              </p>
            </div>

            <p className="w-1/4 md:text-base md:font-normal md:ml-24 h-10  mt-6 md:mb-4 ml-5 select-none">
              ${product.price}
            </p>
            <div className="flex justify-around w-1/4 items-center md:px-8 box-border md:mr-8 mt-5   mr-2 ">
              <p
                className="rounded-full md:text-xl shadow-2xl md:h-0 h-5 md:mb-10 w-fit mb-5 "
                onClick={() => lowQuantity(product)}
              >
                <FaMinus />
              </p>
              <p className="md:mr-12">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={product.quantity}
                  onChange={(e) => handleChange(e, product)}
                  className="md:border md:border-blue-300 md:h-11 md:w-16 w-8 md:ml-10 md:text-center mb-5  select-none   "
                />
              </p>
              <p
                className="md:mr-32 rounded-full md:text-xl shadow-2xl md:h-0 h-5 md:mb-10 mb-5"
                onClick={() => increaseQuantity(product)}
              >
                <FaPlus />
              </p>
            </div>

            <p className=" md:text-base md:font-normal md:w-1/4 md:mr-28   ml-4 mt-6 md:mb-7 w-1/4 select-none">
              ${product.subtotal}
            </p>

            <div className="relative ">
              <span
                className="md:mr-24 absolute  right-6 -top-4 md:ml-5 md:-top-3 md:-right-8 select-none"
                onClick={() => deletefromcart(product)}
              >
                <ImCross />
              </span>
            </div>
          </div>
        ))}

        <div className="md:mt-7 md:flex md:justify-between flex gap-20 ml-7 mr-4 mt-10 select-none">
          <Link
            href="/"
            className="rounded h-14 md:text-center border border-blue-300 md:w-52 w-32 text-base font-medium md:flex md:justify-center md:items-center flex justify-center items-center md:ml-16 active:scale-105 transition-all "
          >
            Return to Shop
          </Link>
          <button className="rounded h-14 md:w-52 md:text-center border border-blue-300 w-32 text-base font-medium mr-18 md:mr-4 active:scale-105 transition-all">
            Update Cart
          </button>
        </div>
      </div>

      <div className="md:flex md:justify-between md:ml-32 md:mr-28 md:mb-20 md:mt-40 mr-4 select-none">
        <div className="md:flex md:gap-3 flex mt-10 ml-5 gap-2">
          <input
            placeholder="Coupon Code"
            type="text"
            className="h-14 md:w-80  rounded border-2 p-1 border-black"
          />
          <p className="h-14 md:w-52 text-white bg-check-red flex justify-center items-center text-base font-medium rounded p-2 cursor-pointer select-none  active:scale-105 transition-all">
            Apply Coupon
          </p>
        </div>
        <div className="md:w-1/2 md:flex md:flex-col flex flex-col mt-20 select-none">
          <p className="md:ml-5 ml-6 md:h-7 text-xl font-medium">Cart Total</p>
          <div className="md:flex md:justify-between md:p-5 flex justify-between p-10">
            <p className="md:text-base md:font-normal">Subtotal:</p>
            <p className="md:text-base md:font-normal">${total}</p>
          </div>
          <hr className="md:border-2 md:border-blue-100 md:ml-6 md:mr-6 flex" />
          <div className="md:flex md:justify-between md:p-5 flex justify-between p-10">
            <p className="md:text-base md:font-normal">Shipping:</p>
            <p className="md:text-base md:font-normal">Free</p>
          </div>
          <hr className="md:border-2 md:border-blue-100 md:ml-6 md:mr-6" />
          <div className="md:flex md:justify-between md:p-5 flex justify-between p-10">
            <p className="md:text-base md:font-normal">Total:</p>
            <p className="md:text-base md:font-normal">${total}</p>
          </div>
          <div className="md:flex md:justify-center md:items-center md:mt-10 flex justify-center items-center">
            <Link href='/Checkout' className="md:flex md:justify-center md:items-center md:h-14 md:w-64 bg-check-red mb-20 text-white p-3 rounded select-none active:scale-105 transition-all">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContent;
