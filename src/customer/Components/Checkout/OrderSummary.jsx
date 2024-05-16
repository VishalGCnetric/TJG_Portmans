import React from "react";
import { Badge, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { createPayment } from "../../../Redux/Customers/Payment/Action";
import { getCartItems, placeOrder } from "../../../action/cart";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import { checkoutStripePayemt } from "../../../action";

const OrderSummary = ({ data,handleNext }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const [CartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order, cartItems } = useSelector((state) => state);
  const [shiping,setShipping]=useState({})

  console.log(cartItems?.cartItems?.orderItem?.[0])

  let formattedPrice = +cartItems?.cartItems?.totalProductPrice;


  console.log("orderId ", data);

  useEffect(() => {
    // dispatch(getOrderById(orderId))
  }, [orderId]);

  useEffect(() => {
    // getCartItems().then((res) => {
    //   setCartData(res.cart);
    // });
    let setship={
      shipModeId: cartItems?.cartItems?.shipModeId,
      orderItemId: cartItems?.cartItems?.orderItemId,
      addressId: data?.shippingAddress.addressId
  }
  setShipping(setship)
  }, [cartItems]);

  const handleCreatePayment = () => {
  //   const datas = { orderId: data.orderId };
  //   let setshiping={
  //     shipModeId: cartItems?.cartItems?.shipModeId,
  //     orderItemId: cartItems?.cartItems?.orderItemId,
  //     addressId: data?.shippingAddress.addressId
  // }
    // dispatch(createPayment(data));
    placeOrder(shiping).then((res) => {
      // dispatch(getCartItems());
      // checkoutStripePayemt(cartItems?.cartItems?.cart?.lines)
      // navigate(`/payment/${datas.orderId}`);
      handleNext()
      console.log("this is order id ", res.data.orderId);
    });
  };


  return (
    <div className="space-y-5">
    
      <div className="p-5 shadow-lg rounded-md border ">
        <AddressCard address={data?.shippingAddress} />
      </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className=" space-y-3">
            {cartItems?.cartItems?.orderItem?.map((item) => (
              <>
                <CartItem item={item} showButton={false} />
              </>
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
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
                  {formattedPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCreatePayment}
              variant="contained"
              type="submit"
              sx={{ padding: ".8rem 2rem", marginTop: "2rem", width: "100%" , bgcolor: grey[900],}}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
