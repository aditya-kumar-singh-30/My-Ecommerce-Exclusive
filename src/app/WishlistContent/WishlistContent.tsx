"use client";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromWishlist,
  moveToCart,
  ProductInCart,
  productInWishlist,
  singlemovetocart,
} from "@/Redux/CreateSlice";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "@/Redux/Store";
import Image from "next/image";

// Toast notifications
const notify = () => toast.success("Moved all items to bag");
const delNotify = () => toast.success("Deleted!");
const singlenotify = () => toast.success("Added to cart");

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number; // Added quantity
  subtotal: number; // Added subtotal
}

const WishlistContent: React.FC = () => {
  const wishlist = useSelector(
    (state: RootState) => state.cart.wishListData as Product[] // Correctly typed to Product[]
  );
  const totalwish = useSelector(
    (state: RootState) => state.cart.totalProductInWishlist
  );
  const dispatch = useDispatch();

  // Handle moving all items to the cart
  function handlemoveToCart() {
    console.log("Moved all items to cart");
    dispatch(moveToCart());
    dispatch(ProductInCart());
    notify();
  }

  // Handle moving a single product to the cart
  function oneMovetocart(product: Product) {
    console.log("Single product moved to cart");
    dispatch(singlemovetocart(product));
    dispatch(ProductInCart());
    singlenotify();
  }

  // Handle deleting a product from the wishlist
  function deletefromWish(product: Product) {
    dispatch(deleteFromWishlist(product));
    dispatch(productInWishlist());
    delNotify();
  }

  return (
    <>
      <div className="flex justify-between mt-20 mb-10 md:ml-36 md:mr-16 ml-16 mr-14">
        <Toaster />
        <p className="whitespace-break-spaces flex justify-center items-center md:ml-1 select-none">
          Wishlist ({totalwish})
        </p>
        <button
          onClick={handlemoveToCart}
          className="md:w-44 md:h-12 border md:mr-20 border-black rounded-sm h-10 p-2 select-none"
        >
          Move all to bag
        </button>
      </div>

      <div className="md:flex md:flex-wrap md:flex-row md:gap-7 md:ml-32 md:mb-20 md:mr-20 flex flex-col   ">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-gray-100 mt-20 w-80 ml-9  ">
            <div className="md:flex md:justify-end flex justify-end">
              <p
                className="flex justify-center items-center md:mr-4 mr-14 md:mt-4 mt-8 bg-white w-6 h-6 rounded-full"
                onClick={() => deletefromWish(product)}
              >
                <RiDeleteBin6Line />
              </p>
            </div>
            <div>
              <img
                src={product.image}
                className="h-60 w-60 ml-12 mb-10 object-contain md:mt-3"
                alt={product.name}
              />
            </div>
            <div className="cursor-pointer">
              <p
                className="flex justify-center items-center h-10 text-xs font-normal md:gap-2 text-white bg-black md:mt-2 md:ml-0 md:mr-0"
                onClick={() => oneMovetocart(product)}
              >
                <span className="md:text-2xl md:h-6 md:w-6 select-none">
                  <IoCartOutline />
                </span>
                Move to cart
              </p>
            </div>

            <div className="bg-white flex flex-col gap-2">
              <p className="mt-4 text-base font-medium">{product.name}</p>
              <p className="text-base font-medium text-red-600">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WishlistContent;
