import React from "react";


const Promise = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-28 mb-32 mt-10 px-4">
      {/* Free and Fast Delivery */}
      <div className="flex flex-col items-center gap-2">
        <img
          src="/Services=Customer service.png"
          alt="Free and Fast Delivery"
          width={96} 
          height={96}
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        />
        <p className="font-semibold text-sm md:text-base lg:text-lg">
          FREE AND FAST DELIVERY
        </p>
        <p className="font-normal text-xs md:text-sm lg:text-base">
          Free delivery for all orders over $140
        </p>
      </div>

     
      <div className="flex flex-col items-center gap-2">
        <img
          src="/Services=Customer service.png"
          alt="24/7 Customer Service"
          width={96} // 24 * 4 for lg size
          height={96} // 24 * 4 for lg size
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        />
        <p className="font-semibold text-sm md:text-base lg:text-lg">
          24/7 CUSTOMER SERVICE
        </p>
        <p className="font-normal text-xs md:text-sm lg:text-base">
          Friendly 24/7 customer support
        </p>
      </div>

     
      <div className="flex flex-col items-center gap-2">
        <img
          src="/Services=Money back.png"
          alt="Money Back Guarantee"
          width={96} 
          height={96} 
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        />
        <p className="font-semibold text-sm md:text-base lg:text-lg">
          MONEY BACK GUARANTEE
        </p>
        <p className="font-normal text-xs md:text-sm lg:text-base">
          We return money within 30 days
        </p>
      </div>
    </div>
  );
};

export default Promise;
