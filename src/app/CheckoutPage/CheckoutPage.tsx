"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react"; // Import useState
import Product from "../Products/Product";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import toast, { Toaster } from "react-hot-toast";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { getCookie } from "cookies-next";
import { Transactions } from "@/Redux/CreateSlice";
import { useRouter } from "next/navigation";


const CheckoutPage = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const cartProduct: Product[] = useSelector(
    (state: RootState) => state.cart.cartData
  );

  const total = cartProduct.reduce((acc, product) => acc + product.subtotal, 0);
  
  const [paymentMethod, setPaymentMethod] = useState("bank");  

  const loadPayPalScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AQFan0X2HXNoyiRBSU33EaJsYozA2D3raG-z1_uHpbM8_07lEIf8bYVsmmpeKTF7yyfIQa0odHqViGPl&currency=USD";
    script.async = true;

    script.onload = () => {
      if (window.paypal) {
       
        window.paypal.Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total, 
                  },
                },
              ],
            });
          },


          onApprove: async function (data, actions) {
            console.log("OnApprove Called");
            const details = await actions.order.capture();
            try{
              const token = getCookie('token');
              const cartRef = doc(db, "users", token, "cart", "data");

               await setDoc(cartRef, { items: [] });
            

               const transactionRef = collection(db, "users", token, "transactions");

               const transactionData = {
                payerName: details.payer.name.given_name,
                status: details.status,
                transactionId: details.id,
                amount: details.purchase_units[0].amount.value,
                time: details.update_time.split('T')[0],
              };

              await addDoc(transactionRef, transactionData);

              console.log(details);
      
              dispatch(Transactions(transactionData));
               
              router.push("/PaymentPage");

              
            }catch(error){
              console.error("Error clearing the cart after transaction:", error);

            }
            toast.success(`Transaction completed by ${details.payer.name.given_name}`);

          },
          onError: function (err: any) {
            console.error("Error during transaction:", err);
            toast.error("An error occurred during the transaction.");
          },
        }).render("#paypal-button-container");
        const paypalButtonContainer = document.getElementById("paypal-button-container");
        if (paypalButtonContainer) {
            paypalButtonContainer.style.display = "block";
          } else {
            console.error("PayPal button container not found");
          }
      } else {
        console.error("PayPal SDK did not load");
      }
    };

    document.body.appendChild(script);
  };


  const handlePaymentClick = () => {
    console.log("Payment button clicked");
    loadPayPalScript(); // Load PayPal SDK and render the button
  };
 

  return (
    <>
      <div className="mt-24 ml-6 md:mt-28 whitespace-break-spaces md:ml-32 md:p-4">
        <Toaster/>
        <p>
          <span className="font-normal text-sm leading-21 opacity-50">
          <Link href='/Account'>My Account</Link> /<span> Product</span> /<span></span><Link href='/Cart'> View Cart/</Link> 
          </span>
          <span className="font-normal text-sm leading-21"> Checkout </span>{" "}
        </p>
      </div>

      <div className="md:flex md:gap-64 md:mt-10 mt-10 md:mb-20 md:ml-32 ml-5 p-1 md:mr-0 mr-12 md:p-3">
        <div className="md:flex md:flex-col">
          <p className="text-4xl font-medium leading-30">Billing Details</p>
          <div className="flex flex-col mt-10 gap-4">
            <p className="text-base font-normal leading-24 opacity-40">
              Full Name*
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" required/>
            <p className="text-base font-normal leading-24 opacity-40">
              Company Name
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" />
            <p className="text-base font-normal leading-24 opacity-40">
              Street Address*
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" required />
            <p className="whitespace-break-spaces text-base font-normal leading-24 opacity-40">
              Apartment, floor, etc. (Optional)
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" />
            <p className="text-base font-normal leading-24 opacity-40">
              Town/City*
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" required/>
            <p className="text-base font-normal leading-24 opacity-40">
              Phone Number*
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" required/>
            <p className="text-base font-normal leading-24 opacity-40">
              Email Address*
            </p>
            <input type="text" className="h-12 bg-whitesmoke p-2" required/>
          </div>
          <div className="flex items-center text-center justify-center mt-10 md:gap-0 gap-2 md:ml-0 ml-2 ">
            <input type="checkbox" className="w-6 h-6 accent-check-red " />
            <label className="md:pr-3 md:ml-3 leading-24 md:text-base font-normal whitespace-nowrap text-sm ">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        <div className="md:w-2/5 md:mt-16 w-full ">
          <div className="md:mb-10 md:w-full w-full ">
            {cartProduct.map((product) => (
              <div
                key={product.id}
                className="md:flex md:items-center justify-between md:text-start md:h-12 md:mt-10 flex mt-14 w-full "
              >
                <div className="md:flex flex items-center gap-1 md:w-full w-1/4 ">
                  <img
                    src={product.image}
                    className="w-10 h-10 md:ml-5 "
                    alt=""
                  />
                  <p className="md:text-base md:font-normal text-base select-none text-nowrap">
                    {product.name}
                  </p>
                </div>

                <p className="md:text-base md:font-normal text-end md:p-5 mt-2 ml-4 md:mt-6 md:mb-7 w-1/4 select-none">
                  ${product.subtotal}
                </p>
              </div>
            ))}
          </div>
          <div>
            <div className="md:w-full md:flex md:flex-col flex flex-col w-full select-none md:mt-0 mt-10 md:gap-0 gap-6">
              <div className="md:flex md:justify-between md:p-5 flex justify-between ">
                <p className="md:text-base md:font-normal">Subtotal:</p>
                <p className="md:text-base md:font-normal">${total}</p>
              </div>
              <hr className="md:border-2 md:border-blue-100 md:ml-6 md:mr-6 flex" />
              <div className="md:flex md:justify-between md:p-5 flex justify-between ">
                <p className="md:text-base md:font-normal">Shipping:</p>
                <p className="md:text-base md:font-normal">Free</p>
              </div>
              <hr className="md:border-2 md:border-blue-100 md:ml-6 md:mr-6" />
              <div className="md:flex md:justify-between md:p-5 flex justify-between ">
                <p className="md:text-base md:font-normal">Total:</p>
                <p className="md:text-base md:font-normal">${total}</p>
              </div>
            </div>

            <div className="flex justify-between md:p-5 md:mt-0 mt-10">
              <div className="ml-1 gap-2 flex">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="bank"
                  className="h-6 w-6 accent-black"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />{" "}
                <span className="text-base leading-24 font-normal">Bank</span>
              </div>

              <div className="flex gap-2 ">
                <div className="bg-paypal w-11 h-7 bg-cover bg-center bg-no-repeat"></div>
                <div className="bg-mastercard bg-cover bg-center bg-no-repeat w-11 h-7"></div>
                <div className="bg-visa w-11 bg-cover bg-center bg-no-repeat h-7"></div>
                <div className="bg-nagad w-11 bg-cover bg-center bg-no-repeat h-7"></div>
              </div>
            </div>

            <div className="ml-1 md:p-5 flex gap-2 md:mt-0 mt-5 ">
              <input
                type="radio"
                name="paymentMethod"
                id="cashOnDelivery"
                className="h-6 w-6 accent-black"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={() => setPaymentMethod("cashOnDelivery")}
              />{" "}
              <span className="text-base leading-24 font-normal">Cash on delivery</span>
            </div>

            {paymentMethod === "bank" && <div id="paypal-button-container" className="md:ml-6 md:mr-4 md:mt-0 mt-10"  style={{ display: "none" }}></div>} {/* Render PayPal button conditionally */}

            <div className="md:flex md:gap-3 flex mt-10 md:ml-5 gap-2">
          <input
            placeholder="Coupon Code"
            type="text"
            className="h-14 md:w-80  rounded border-2 p-1 border-black"
          />
          <p className="h-14 md:w-52 w-52 text-white bg-check-red flex justify-center items-center md:text-base  text-sm font-medium rounded p-2 cursor-pointer select-none  active:scale-105 transition-all">
            Apply Coupon
          </p>
        </div>
            <div className="mt-5 flex justify-center">
              <p>
                <button  onClick={handlePaymentClick} className="bg-check-red text-white px-6 py-3  md:mb-0 mb-10 mt-10 rounded-md active:scale-105 transition-all">Proceed to Payment</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;


function dispatch(arg0: { payload: any; type: "cartItems/Transactions"; }) {
  throw new Error("Function not implemented.");
}

