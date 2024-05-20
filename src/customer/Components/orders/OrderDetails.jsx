import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { ordersById, receiveProductsByPartNumber } from "../../../action";
import AddressCard from "../adreess/AdreessCard";
import BackdropComponent from "../BackDrop/Backdrop";
import OrderTracker from "./OrderTraker";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const address = JSON.parse(localStorage.getItem("shippingAddress"));

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await ordersById(orderId);
        setOrderDetails(order);

        const productPromises = order.orderItem.map((item) =>
          receiveProductsByPartNumber(item.partNumber)
        );
        const productResponses = await Promise.all(productPromises);
        const productsData = productResponses.map((res) => res.catalogEntryView[0]);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <BackdropComponent open={loading} />;
  }

  return (
    <Box className="px-4 mt-6 lg:px-24 space-y-6">
      <Box className="p-4 shadow-md bg-white rounded-md mt-2">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={9}>
            <OrderTracker
              activeStep={
                orderDetails.orderStatus === "M"
                  ? 1
                  : orderDetails.orderStatus === "CONFIRMED"
                  ? 2
                  : orderDetails.orderStatus === "SHIPPED"
                  ? 3
                  : 5
              }
            />
          </Grid>
          <Grid item>
            {orderDetails.orderStatus === "DELIVERED" ? (
              <Button color="error" variant="outlined">
                Return
              </Button>
            ) : (
              <Button sx={{ color: "#333" }} variant="outlined">
                Cancel Order
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={4}>
        {orderDetails.orderItem.map((item, index) => {
          const product = products.find((product) => product.partNumber === item.partNumber);
          return (
            <Grid item xs={12} key={index}>
              <Card className="shadow-md rounded-md p-4 border bg-white">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product?.thumbnail || "default-image.jpg"} // Replace with actual image URL
                      alt={item.partNumber}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {item.partNumber}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantity: {parseFloat(item.quantity).toFixed(0)}
                      </Typography>
                      <Typography variant="h6" component="div">
                        Price: ${parseFloat(item.orderItemPrice).toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} md={2} className="text-right">
                    <IconButton
                      sx={{ color: "#333" }}
                      onClick={() => navigate(`/account/rate/${item.productId}`)}
                    >
                      <StarIcon sx={{ fontSize: "2rem" }} />
                      <Typography variant="body2" className="ml-2">
                        Rate & Review
                      </Typography>
                    </IconButton>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid container className="p-4 shadow-md bg-white rounded-md">
        <Grid item xs={12}>
          <Typography variant="h6" className="font-bold py-2">
            Shipping Address
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <AddressCard address={address} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetails;
