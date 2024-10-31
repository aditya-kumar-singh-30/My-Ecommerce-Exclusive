"use client"

import { setTransactions } from '@/Redux/CreateSlice';
import { RootState } from '@/Redux/Store';
import { getCookie } from 'cookies-next';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect } from 'react';

import { Toaster } from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';  
import { db } from '../config';
import { setLoading } from '@/Redux/SignupSlice';
const PaymentInfo = () => {
  
  const AllTransactions = useSelector(
    (state: RootState) => state.cart.Transaction
  );

  const dispatch = useDispatch();

  useEffect(()=>{
  

    const fetchTransaction = async () =>{
      try{
        const token = getCookie('token'); 

        if (token) {
         
          const transactionsRef = collection(db, "users", token, "transactions");

          
          const querySnapshot = await getDocs(transactionsRef);
          
          
          const transactionsData = querySnapshot.docs.map((doc: { data: () => any; }) => doc.data());

          
          dispatch(setTransactions(transactionsData));
          console.log(AllTransactions);
      }
    }catch(error){
      console.error("Error fetching transactions:", error);
    }finally {
      dispatch(setLoading(false));
    };
  };
  fetchTransaction();
  },[dispatch]);



  

 
  return (
    <>
      <div className="md:flex md:justify-between">
        <Toaster />
        <p className="whitespace-break-spaces md:ml-36 ml-6 md:mt-20 md:mb-20 flex md:justify-center items-center mt-20">
          <Link href="/" className="opacity-50 leading-21 font-normal text-sm">
            Home
          </Link>{" "}
          /<span className="leading-21 font-normal text-sm"> My Account</span>
        </p>
        <p className="md:flex md:justify-center md:items-center md:mr-36 whitespace-break-spaces flex justify-center items-center mt-4 text-sm font-normal leading-21">
          <b>Welcome!</b>
        </p>
      </div>

      <div className="md:flex md:justify-between md:ml-28 md:gap-10 md:mr-36 md:mb-20">
        <div className="flex justify-center mt-10 md:-mt-9">
          <div className="md:p-10">
            <p className="text-base font-medium leading-24">Manage My Account</p>
            <p className="ml-8 text-base font-normal opacity-50 mt-1 cursor-pointer">
              <Link href="/Account"> My Profile</Link>
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24">
              <Link href="/AddressPage"> Address Book</Link>
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer text-check-red leading-24">
              <Link href="/PaymentPage"> My Payment</Link>
            </p>
            <p className="text-base font-medium md:mt-2 leading-24">My Orders</p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 leading-24">
              My Returns
            </p>
            <p className="ml-8 text-base font-normal md:mt-1 cursor-pointer opacity-50 md:mb-2 leading-24">
              My Cancellations
            </p>
            <Link href="/Wishlist" className="text-base font-medium leading-24">
              My Wishlist
            </Link>
          </div>
        </div>

        <div className="shadow-2xl md:w-3/4 md:flex md:flex-col md:p-12 mt-10 md:-mt-12 flex justify-center flex-col item mb-20 md:mb-0 ml-2 md:ml-0 mr-2 md:mr-2 bg-white rounded-lg">
      <p className="md:text-xl text-2xl font-medium text-check-red flex justify-center mt-7 md:mt-0 md:justify-start leading-28 select-none">
        All Transactions
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold text-sm text-gray-600">TransID</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Name</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Amount</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Date</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {AllTransactions.length > 0 ? (
              AllTransactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-800">{transaction.transactionId}</td>
                  <td className="p-4 text-sm text-gray-800">{transaction.payerName}</td>
                  <td className="p-4 text-sm text-gray-800">${transaction.amount}</td>
                  <td className="p-4 text-sm text-gray-800">{transaction.time}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">No transactions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </>
  );
};

export default PaymentInfo;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

