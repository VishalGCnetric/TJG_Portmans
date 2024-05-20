import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const AmountDetails = () => {
    const { grandTotal } = useSelector((state) => state.cartItems.cartItems);

  return (
    <div className="top-0 h-[100vh] mt-5 lg:mt-0 ml-5 " style={{
        width: '100%',
        // border: '1px solid black',
        '@media (max-width: 600px)': { 
        },
      }}>
      <div className="border p-5 bg-white shadow-lg rounded-md">
        <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
        <hr />
        <div className="space-y-3 font-semibold">
          <div className="flex justify-between pt-3 text-black">
            <span>
              {/* Price ({cartItems?.cartItems?.orderItems?.totalQuantity} item) */}
            </span>
            {/* <span>{cartItems?.cartItems?.orderItems?.total / 100}</span> */}
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-700">0</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-700">Free</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-green-700">
              {/* ₹{cartItems?.cartItems?.cart?.total / 100} */}
              {/* {formattedPrice.toFixed(2)} */}
              {parseInt(grandTotal).toFixed(2)}
            </span>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default AmountDetails;
