import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getCutomerOrdersNew } from "../../../action/cart";
import BackdropComponent from "../BackDrop/Backdrop";

const Order = () => {
  const dispatch = useDispatch();
  const { newOrder } = useSelector((store) => store);

  useEffect(() => {
      dispatch(getCutomerOrdersNew());
  }, []);
console.log(newOrder?.orderNew?.Order)
  return (
    <Box>
      <Grid item xs={9}>
        <Box className="space-y-5">
          <p className="text-2xl font-bold text-center mt-2">MY ORDERS</p>
          {newOrder?.orderNew?.Order?.length > 0 ? (
            newOrder.orderNew.Order.map((order, orderIndex) =>(
            
                <OrderCard key={`${orderIndex}`}  order={order} />
              ))
            
          ) : (
            <p>No orders available.</p>
          )}
        </Box>
      </Grid>
      <BackdropComponent open={false} />
    </Box>
  );
};

export default Order;
