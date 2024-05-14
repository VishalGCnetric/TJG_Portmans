import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, RemoveCartItemNew, updateCartQtyNEW } from "../../../action/cart";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleRemoveItemFromCart = (id) => {
    dispatch(RemoveCartItemNew(id)).then(() => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartQty = (lineId, qty) => {
    dispatch(updateCartQtyNEW(lineId, qty)).then(() => {
      dispatch(getCartItems());
    });
  };
console.log(cartItems?.cartItems?.orderItem?.length)
  return (
    <div>
      {cartItems?.cartItems?.orderItem.length > 0 && (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {cartItems?.cartItems?.cart?.lines.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  showButton={true}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  handleUpdateCartQty={handleUpdateCartQty}
                />
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>Price ({cartItems?.cartItems?.cart?.totalQuantity} item)</span>
                  <span>{cartItems?.cartItems?.cart?.total / 100}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">₹0</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">
                    {cartItems?.cartItems?.cart?.total / 100}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout?step=2")}
                variant="contained"
                type="submit"
                sx={{
                  padding: ".8rem 2rem",
                  marginTop: "2rem",
                  width: "100%",
                  bgcolor: grey[900],
                }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
