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
  const {auth} = useSelector((store) => store.auth);
  const cart =useSelector((store) => store.cartItems.cartItems);
  // console.log("cart",cart)
  const [data,setData]=useState([]);
  const {orderId}=cartItems;
  
  // const formattedPrice = totalPrice ? totalPrice.toFixed(2) : "";
  let formattedPrice = +cartItems?.cartItems?.totalProductPrice;
  
  // useEffect(() => {
  //   dispatch(getCartItems());
  //   const totalPrice = cartItems && cartItems?.cartItems && cartItems?.cartItems?.totalProductPrice;
  //   if (typeof totalPrice === "number") {
  //     formattedPrice = totalPrice.toFixed(2);
  //   } else {
  //     console.error("Total price is not a number:", totalPrice);
  //   }
  // }, [dispatch]);

  const handleRemoveItemFromCart = (data) => {
    dispatch(RemoveCartItemNew(data))
  };

  const handleUpdateCartQty = (lineId, qty) => {
    dispatch(updateCartQtyNEW(lineId, qty)).then(() => {
      dispatch(getCartItems());
    });
  };
  
  console.log(formattedPrice)
  return (
    <div>
      {cartItems?.cartItems?.orderitems ? <div className="px-5 sticky top-0 w-[60%] h-[10vh] mt-5 lg:mt-0">
          <div className="border p-5 bg-white shadow-lg rounded-md">
           <div>cart is empty</div>
        </div>
        </div>:<></>
        }
      {auth  && (
        <div className="mt-5 lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {cartItems?.cartItems && cartItems?.cartItems?.orderItem?.map((item) => (
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
                  <span>Price ({cartItems?.cartItems?.orderItem?.length} item)</span>
                  {/* <span>{cartItems?.cartItems?.totalProductPrice }</span> */}
                  <span>{formattedPrice.toFixed(2)}</span>
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
                  {/* {cartItems?.cartItems?.totalProductPrice} */}
                  {formattedPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/checkout?step=1")}
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
