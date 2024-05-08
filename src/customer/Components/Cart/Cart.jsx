import React from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import { RemoveCartItemNew, getCartItems, updateCartQtyNEW } from "../../../action/cart";
import { useState } from "react";
import { useCallback } from "react";
import { grey } from "@mui/material/colors";

//

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState(cartItems);
  // console.log("cart ", cartItems.cartItems);

  // useEffect(() => {
  //   dispatch(getCart(jwt));
  // }, [jwt]);
  // getCartItems().then((res) => {
  //   console.log("this is cart response in cart page", res.cart);
  //   setCartData(res.cart);
  // })

  const handleRemoveItemFromCart = (e,id) => {
    e.preventDefault();
    // const data = { cartItemId: item?._id, jwt };
    // dispatch(removeCartItem(data));
    RemoveCartItemNew(id).then((res) => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartPlus = (e,lineId,qty) => {
    e.preventDefault();

    updateCartQtyNEW(lineId,qty+1).then((res) => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartMinus = (e,lineId,qty) => {
    e.preventDefault();

    if (qty != 1) {
      updateCartQtyNEW(lineId,qty-1).then((res) => {
        dispatch(getCartItems());
      });
    }

    else{
      handleRemoveItemFromCart(e,lineId)
    }


  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [CartData?.cartItems?.cart?.lines?.length]);

  return (
    <div className="">
      {CartData?.cartItems?.cart?.lines?.length > 0 && (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {cartItems?.cartItems?.cart?.lines.map((item) => (
                <>
                  <CartItem
                    item={item}
                    showButton={true}
                    handleRemoveItemFromCart={handleRemoveItemFromCart}
                    handleUpdateCartPlus={handleUpdateCartPlus}
                    handleUpdateCartMinus={handleUpdateCartMinus}
                  />
                </>
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  {/* <span>Price ({cart.cart?.totalItem} item)</span>
              <span>₹{cart.cart.totalPrice}</span> */}
                  <span>
                    Price ({cartItems?.cartItems?.cart?.totalQuantity}/ item)
                  </span>
                  <span>{cartItems?.cartItems?.cart?.total / 100}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  {/* <span className="text-green-700">-₹{cart.cart?.discounte}</span> */}
                  <span className="text-green-700">₹0</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  {/* <span className="text-green-700">₹{cart.cart?.totalDiscountedPrice}</span> */}
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
