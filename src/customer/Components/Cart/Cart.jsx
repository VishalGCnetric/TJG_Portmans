import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, RemoveCartItemNew, updateCartQtyNEW } from "../../../action/cart";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cartItems.cartItems);
  const { auth } = useSelector((store) => store.auth);

  let formattedPrice = cart?.totalProductPrice || 0;
  let total = +formattedPrice || 0;

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const handleRemoveItemFromCart = (data) => {
    dispatch(RemoveCartItemNew(data));
  };

  const handleUpdateCartQty = (data) => {
    updateCartQtyNEW(data, toast).then(() => {
      toast.success('Quantity Updated Successfully');
      dispatch(getCartItems());
    });
  };

  return (
    <div>
      <Toaster />
      <div className="mt-5 lg:grid grid-cols-3 lg:px-16 relative">

      <div className={`lg:px-5 bg-white ${cart?.orderItem === undefined ? 'lg:col-span-3' : 'lg:col-span-2'}`}>

          <div className="space-y-3">
            {cart?.orderItem === undefined ? (
              <EmptyCart />
            ) : (
              cart?.orderItem?.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  showButton={true}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  handleUpdateCartQty={handleUpdateCartQty}
                />
              ))
            )}
          </div>
        </div>

        {cart?.orderItem !== undefined && <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />


            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({cart?.orderItem?.length} item)</span>
                <span>{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">$ 0</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">{total.toFixed(2)}</span>
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
        </div>}
      </div>
      
    </div>
  );
};

export default Cart;
