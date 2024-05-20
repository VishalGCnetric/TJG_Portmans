import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { TextField, Grid, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MobileNumberInput from '../../../Pages/Mobile';
import { CheckoutReq, placeOrder, preCheckout } from '../../../action/cart';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Payment = ({handleNext}) => {
  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  });
  const { grandTotal } = useSelector((state) => state.cartItems.cartItems);
  const navigate = useNavigate();
  const [addAddress, setAddress] = useState(false);
  const shippingData = JSON.parse(localStorage.getItem("shippingAddress"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const orderResponse = await placeOrder(grandTotal);
      await preCheckout();
      toast.success("PreCheckout done successfully!");
      await CheckoutReq();
      toast.success("Checkout done, order placed successfully!");
      handleNext();
      setTimeout(() => {
        navigate(`/payment/orderId=${orderResponse.data.orderId}`);
      })
      // navigate(`/payment/orderId=${orderResponse.data.orderId}`);
    } catch (error) {
      toast.error("Error placing order");
    } finally {
      // setSubmitting(false);
    }
  };

  return (
    <Card maxWidth="sm" variant="outlined" sx={{ padding: 2 }}>
      <Toaster />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Billing Details
        </Typography>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField value={shippingData?.firstName} label="First name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={shippingData?.lastName} label="Last name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField value={shippingData?.addressLine} label="Address" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField value={shippingData?.email1} label="Email" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <MobileNumberInput num={shippingData?.phone1} />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <input type="checkbox" onChange={() => setAddress(!addAddress)} style={{ marginRight: '0.5rem' }} />
                  <Typography>Shipping address is the same as my billing address</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <input type="checkbox" style={{ marginRight: '0.5rem' }} />
                  <Typography>Save this information for the next time</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Payment
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="radio" name="payment" />
                    <Typography sx={{ ml: 1 }}>Visa Credit Card</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="radio" name="payment" />
                    <Typography sx={{ ml: 1 }}>MasterCard</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="radio" name="payment" />
                    <Typography sx={{ ml: 1 }}>American Express</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mb: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Payment Details
          </Typography>
          <Formik
            initialValues={{
              number: '',
              name: '',
              expiry: '',
              cvc: '',
            }}
            
          >
            <Form onSubmit={handleSubmit}>
              <TextField
                type="number"
                name="number"
                label="Card Number"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                type="text"
                name="name"
                label="Cardholder Name"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                type="text"
                name="expiry"
                label="Expiry Date (MM/YY)"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                inputProps={{ maxLength: 5 }}
                sx={{ mb: 2 }}
              />
              <TextField
                type="tel"
                name="cvc"
                label="CVC"
                variant="outlined"
                fullWidth
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <Button type="submit" 
              onClick={handleSubmit}
              style={{backgroundColor:'#333',color:'white',':hover': {
              backgroundColor: 'white',
              color: '#515050',
    // Add any other hover styles you want
  }}} fullWidth>
                Pay Now
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    
</Box>
</Card>
   );
};

export default Payment;
