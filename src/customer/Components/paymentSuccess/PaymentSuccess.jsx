import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Button, Grid, Typography, Container, Card, CardContent, CardMedia } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { useParams, useNavigate } from "react-router-dom";
import { ordersById, receiveProductsByPartNumber } from "../../../action";
import BackdropComponent from "../BackDrop/Backdrop";
import OrderTraker from "../orders/OrderTraker";
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const order = useSelector((state) => state.order.order); // Adjusted to match the Redux state structure
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
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center">
        <Alert variant="filled" severity="success" sx={{ mb: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <AlertTitle>Order Successful</AlertTitle>
          <Typography variant="h6" align="center">Order ID: {orderId}</Typography>
          <Typography align="center">Congratulations! Your order has been placed successfully.</Typography>
        </Alert>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{ padding: ".8rem 2rem",mb: 4, bgcolor: deepPurple[500] }}
        >
          Home
        </Button>
      </Box>
      <Grid container justifyContent="space-between" alignItems="center" >
          <Grid item xs={12} md={9}>
            <OrderTraker
              activeStep={
                orderDetails?.orderStatus === "M"
                  ? 1
                  : orderDetails?.orderStatus === "CONFIRMED"
                  ? 2
                  : orderDetails?.orderStatus === "SHIPPED"
                  ? 3
                  : 5
              }
            />
          </Grid>
          <Grid item>
            {orderDetails?.orderStatus === "DELIVERED" ? (
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
      <Grid container spacing={3} mt={5}>
        {order?.orderItem?.map((item) =>{
        const product = products.find((product) => product.partNumber === item.partNumber);

          return (
          <Grid item xs={12} key={item.orderItemId}>
            <Card sx={{ display: 'flex', boxShadow: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image= {product?.thumbnail || "https://via.placeholder.com/150" }// Placeholder image URL, replace with actual image URL if available
                alt={item.partNumber}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {item.partNumber}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Unit Price: $ {parseInt(item.unitPrice).toFixed(2)}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Quantity: {parseInt(item.quantity).toFixed(0)} 
                  </Typography>
                  <Typography variant="h6" component="div" color="primary">
                    Total Price: $ {parseInt(item.orderItemPrice).toFixed(2)}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        )})}
      </Grid>

      <Box mt={5}>
        {/* <Typography variant="h6">Shipping Address</Typography> */}
        <AddressCard address={address} />
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
