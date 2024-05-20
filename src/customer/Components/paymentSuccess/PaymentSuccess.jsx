import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Button, Grid, Typography, Container, Card, CardContent, CardMedia } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId, jwt));
  }, [dispatch, orderId, jwt]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center">
        {/* <CheckCircleIcon sx={{ fontSize: 50, color: deepPurple[500], mb: 2 }} /> */}
        <Alert variant="filled" severity="success" sx={{ mb: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <AlertTitle>Order Successful</AlertTitle>
          <Typography variant="h6" align="center">Order ID: {orderId}</Typography>
          <Typography align="center">Congratulations! Your order has been placed successfully.</Typography>
        </Alert>
        <Button
          onClick={() => navigate("/")}
          variant="contained"
          sx={{ padding: ".8rem 2rem", mt: 2, bgcolor: deepPurple[500] }}
        >
          Home
        </Button>
      </Box>

      {/* Uncomment below code to show order tracker and details */}
      {/* <OrderTraker activeStep={1}/> */}

      <Grid container spacing={3} mt={5}>
        {order.order?.orderItems?.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: 'flex', boxShadow: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={item?.product?.imageUrl}
                alt={item.product.title}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {item.product.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Color: Pink | Size: {item.size}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Seller: {item.product.brand}
                  </Typography>
                  <Typography variant="h6" component="div" color="primary">
                    ₹{item.price}
                  </Typography>
                </CardContent>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <AddressCard address={order.order?.shippingAddress} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PaymentSuccess;
