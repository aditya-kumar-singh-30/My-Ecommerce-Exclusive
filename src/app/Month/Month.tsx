"use client";
import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaStar, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addtocartData,
  ProductInCart,
  addtoWishlistData,
  productInWishlist,
  saveUserCartAndWishlist,
} from "@/Redux/CreateSlice";
import toast, { Toaster } from "react-hot-toast";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { RootState } from "@/Redux/Store";
import { getCookie } from "cookies-next";

const notify = () => toast.success("Item added Successfully");
const wishnotify = () => toast.success("Added to Wishlist");

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number;
  subtotal: number;
}

const Month = () => {
  const dispatch = useDispatch();
  const [monthProducts, setMonthProducts] = useState<Product[]>([]);
  const cartdata = useSelector((state: any) => state.cart.cartData);
  const wishlistdata = useSelector((state: any) => state.cart.wishListData);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Monthproducts"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as Product[];
      setMonthProducts(productsList);
    };

    fetchProducts();
  }, []);

  const wishListData = useSelector(
    (state: RootState) => state.cart.wishListData
  );
  const cartData = useSelector((state: RootState) => state.cart.cartData);

  async function nclick() {
    const token = getCookie("token");
    if (token) {
      try {
        await dispatch(
          saveUserCartAndWishlist(token, cartData, wishListData) as any
        );
      } catch (error) {
        console.error("Error saving cart and wishlist:", error);
      }
    }
  }

  useEffect(() => {
    nclick();
  }, [cartData, wishListData]);

  function handleClick(idx: number) {
    const data = monthProducts.find((item) => item.id === idx);
    if (data) {
      dispatch(addtocartData(data));
      dispatch(addToCart());
      dispatch(ProductInCart());
      nclick();
      notify();
    }
  }

  function wishClick(idx: number) {
    const data = monthProducts.find((item) => item.id === idx);
    if (data) {
      dispatch(addtoWishlistData(data));
      dispatch(productInWishlist());
      wishnotify();
    }
  }

  const isProductInCart = (productId: number) => {
    return Array.isArray(cartdata)
      ? cartdata.some((item: Product) => item.id === productId)
      : false;
  };

  const isProductInWishlist = (productId: number) => {
    return Array.isArray(wishlistdata)
      ? wishlistdata.some((item: Product) => item.id === productId)
      : false;
  };

  return (
    <>
      <div>
        <Toaster />
        <div className="flex items-center gap-4 ml-6 select-none">
          <img src="Category Rectangle.png" alt="Category" />
          <p>This Month</p>
        </div>

        <div className="flex items-center justify-between ml-6 mr-8 mt-10 md:mt-8 select-none">
          <p className="text-2xl md:text-4xl font-semibold">
            Best Selling Products
          </p>
          <div className="hidden md:block">
            <button className="h-12 w-32 bg-check-red text-white flex justify-center items-center hover:bg-red-600 active:scale-90 transition-all">
              View All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 mx-6">
          {monthProducts.map((product, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg bg-white overflow-hidden flex-shrink-0 w-full h-auto md:w-64 md:h-80"
            >
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <div
                  className="bg-white p-1 rounded-full"
                  onClick={() => wishClick(product.id)}
                >
                  {isProductInWishlist(product.id) ? (
                    <FaHeart className="cursor-pointer text-red-500" size={20} />
                  ) : (
                    <CiHeart
                      className="text-gray-500 cursor-pointer hover:text-black"
                      size={20}
                    />
                  )}
                </div>
                <div className="bg-white p-1 rounded-full">
                  <MdOutlineRemoveRedEye
                    className="text-gray-500 cursor-pointer hover:text-black"
                    size={20}
                  />
                </div>
              </div>

              <img
                src={`${product.image}`}
                alt={product.name}
                className="w-full h-40 object-contain mt-8"
              />

              <div
                onClick={() => handleClick(product.id)}
                className="border border-black w-full text-white bg-black mt-1 text-center flex justify-center text-base font-medium h-10 active:scale-90 transition-all select-none"
              >
                <button disabled={isProductInCart(product.id)}>
                  {isProductInCart(product.id)
                    ? "Already in Cart"
                    : "Add to Cart"}
                </button>
              </div>

              <div className="p-2">
                <p className="truncate">{product.name}</p>
                <p>${product.price}</p>
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, idx) => (
                    <FaStar key={idx} className="text-yellow-500" />
                  ))}
                  <span className="ml-2 text-gray-500">(88)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Month;
