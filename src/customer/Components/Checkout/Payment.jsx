import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { TextField, Grid, Button, Typography, Card, CardContent, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MobileNumberInput from '../../../Pages/Mobile';
import { CheckoutReq, placeOrder, preCheckout } from '../../../action/cart';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Payment = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    focus: '',
  });
  const { grandTotal } = useSelector((state) => state.cartItems.cartItems);
  const navigate = useNavigate();
  const [addAddress, setAddress] = useState(false);
  const shippingData = JSON.parse(localStorage.getItem("shippingAddress"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocusChange = (e) => {
    setFormData({ ...formData, focus: e.target.name });
  };

  const handleSubmit = async (values) => {
    try {
      const orderResponse = await placeOrder(grandTotal);
      await preCheckout();
      toast.success("PreCheckout done successfully!");
      await CheckoutReq();
      toast.success("Checkout done, order placed successfully!");
      handleNext();
      setTimeout(() => {
        navigate(`/payment/orderId=${orderResponse.data.orderId}`);
      }, 1000);
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  const validationSchema = Yup.object().shape({
    number: Yup.string()
      .matches(/^[0-9]{16}$/, "Card number is not valid")
      .required("Card number is required"),
    name: Yup.string().required("Cardholder name is required"),
    expiry: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date is not valid")
      .required("Expiry date is required"),
    cvc: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVC is not valid")
      .required("CVC is required"),
  });

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
                <TextField value={addAddress ? (shippingData?.firstName) : ""} label="First name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField value={addAddress ? (shippingData?.lastName) : ''} label="Last name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField value={addAddress ? (shippingData?.addressLine) : ''} label="Address" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField value={addAddress ? (shippingData?.email1) : ''} label="Email" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <MobileNumberInput num={addAddress ? shippingData?.phone1 : ''} />
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
        <Cards
          cvc={formData.cvc}
          expiry={formData.expiry}
          focused={formData.focus}
          name={formData.name}
          number={formData.number}
        />
      </Box>

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
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form>
                <Field
                  as={TextField}
                  type="text"
                  name="number"
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleFocusChange(e);
                  }}
                  value={values.number}
                  sx={{ mb: 2 }}
                />
                <ErrorMessage name="number" component="div" style={{ color: 'red' }} />
                <Field
                  as={TextField}
                  type="text"
                  name="name"
                  label="Cardholder Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleFocusChange(e);
                  }}
                  value={values.name}
                  sx={{ mb: 2 }}
                />
                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                <Field
                  as={TextField}
                  type="text"
                  name="expiry"
                  label="Expiry Date (MM/YY)"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleFocusChange(e);
                  }}
                  value={values.expiry}
                  inputProps={{ maxLength: 5 }}
                  sx={{ mb: 2 }}
                />
                <ErrorMessage name="expiry" component="div" style={{ color: 'red' }} />
                <Field
                  as={TextField}
                  type="tel"
                  name="cvc"
                  label="CVC"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleFocusChange(e);
                  }}
                  value={values.cvc}
                  sx={{ mb: 2 }}
                />
                <ErrorMessage name="cvc" component="div" style={{ color: 'red' }} />
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: '#333',
                    color: 'white',
                    ':hover': {
                      backgroundColor: 'white',
                      color: '#515050',
                    },
                  }}
                  fullWidth
                >
                  Pay Now
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Card>
  );
};

export default Payment;
