"use client";

import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addtocartData,
  ProductInCart,
  addtoWishlistData,
  productInWishlist,
  saveUserCartAndWishlist,
} from "@/Redux/CreateSlice";
import { FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "@/Redux/Store";
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { getCookie } from "cookies-next";

const notify = () => toast.success("Item added Successfully");
const wishnotify = () => toast.success("Added to Wishlist");

// Define Product interface to ensure the type of products is consistent
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number;
  subtotal: number;
}

const Product: React.FC = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const added = useSelector((state: RootState) => state.cart.added);
  const cartdata = useSelector((state: RootState) => state.cart.cartData);
  const wishlistdata = useSelector(
    (state: RootState) => state.cart.wishListData
  );

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productsDown"));
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as Product[];

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Update loading state
      }
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
    const data = products.find((item) => item.id === idx);
    if (data) {
      dispatch(addtocartData(data));
      dispatch(addToCart());
      dispatch(ProductInCart());
      nclick();
      notify();
    }
  }

  function wishClick(idx: number) {
    const data = products.find((item) => item.id === idx);
    if (data) {
      dispatch(addtoWishlistData(data));
      dispatch(productInWishlist());
      wishnotify();
    }
  }

  const isProductInCart = (productId: number) => {
    // Ensure cartdata is an array before calling .some()
    if (Array.isArray(cartdata)) {
      return cartdata.some((item: Product) => item.id === productId);
    } else {
      console.error("cartdata is not an array", cartdata);
      return false;
    }
  };

  const isProductInWishlist = (productId: number) => {
    if (Array.isArray(wishlistdata)) {
      return wishlistdata.some((item: Product) => item.id === productId);
    } else {
      console.error("wishlistData is not an array", wishlistdata);
      return false;
    }
  };

  if (loading) {
    return <div>Loading products...</div>; // Loading indicator
  }

  return (
    <>
      <div className="container mt-36 min-w-full flex flex-col justify-center">
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-0 md:mr-0">
          <div className="flex items-center gap-4 select-none md:px-7 px-0">
            <img
              src="/Category Rectangle.png"
              alt="Category"
              className="w-auto h-auto"
            />
            <p className="text-center md:text-left md:ml-0 select-none ">
              Our Product
            </p>
          </div>

          <div className="flex items-center  gap-3 mt-8 flex-col md:flex-row md:justify-between md:w-full min-w-full">
            <p className="md:ml-6 text-2xl md:text-4xl font-semibold text-center md:text-left md:w-auto w-72 select-none">
              Explore Our Products
            </p>
            <div className="flex gap-3 mt-5 mr-44 md:mr-7  mb-5 ">
              <button
                className="bg-blue-50 h-12 w-12 rounded-full justify-center items-center hover:bg-blue-100 md:flex hidden active:scale-90 transition-all"
                aria-label="Previous Products"
              >
                <FaArrowLeft />
              </button>
              <button
                className="bg-blue-50 h-12 w-12 rounded-full justify-center items-center hover:bg-blue-100 md:flex hidden active:scale-90 transition-all"
                aria-label="Next Products"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 md:mx-auto mt-12 w-full md:w-9/12 items-center justify-center md:ml-48 ml-1 md:p-1 p-7">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex flex-col items-center justify-center w-full h-full max-w-xs mx-auto md:mx-0"
            >
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <div
                  className="bg-white p-1 rounded-full"
                  onClick={() => wishClick(product.id)}
                  aria-label={`Add ${product.name} to wishlist`}
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
                    aria-label={`View ${product.name}`}
                  />
                </div>
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain mt-4"
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
              <div className="mt-4 text-center">
                <p>{product.name}</p>
                <p>${product.price}</p>
                <div className="flex justify-center items-center">
                  {[...Array(product.rating)].map((_, idx) => (
                    <FaStar key={idx} className="text-yellow-500" />
                  ))}
                  <span className="ml-2 text-gray-500">(88)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-20 h-12">
          <div className="h-12 md:w-52 rounded-sm flex justify-center bg-check-red md:p-0 w-44 text-white active:scale-90 transition-all select-none">
            <button>View All Products</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
