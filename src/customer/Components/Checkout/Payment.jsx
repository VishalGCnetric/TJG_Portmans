import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { TextField, Grid, Button, Typography, Card, CardContent } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Payment = () => {
  const [formData, setFormData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const handleInputFocus = (e) => {
    setFormData({ ...formData, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.number || !/^\d{16}$/.test(values.number)) {
      errors.number = 'Enter a valid 16-digit card number';
    }
    if (!values.name) {
      errors.name = 'Cardholder name is required';
    }
    if (!values.expiry || !/^\d{2}\/\d{2}$/.test(values.expiry)) {
      errors.expiry = 'Enter a valid expiry date (MM/YY)';
    }
    if (!values.cvc || !/^\d{3}$/.test(values.cvc)) {
      errors.cvc = 'Enter a valid 3-digit CVV';
    }

    return errors;
  };

  return (
    <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ margin: '1rem' ,border:'1px solid black'}}>
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Card Preview
            </Typography>
            <Cards
              cvc={formData.cvc}
              expiry={formData.expiry}
              focused={formData.focus}
              name={formData.name}
              number={formData.number}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Formik
              initialValues={{
                number: '',
                name: '',
                expiry: '',
                cvc: '',
              }}
              validate={validate}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form style={{ padding: '1rem' }}>
                  <TextField
                    type="tel"
                    name="number"
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    sx={{ marginBottom: '1rem' }}
                  />
                  <ErrorMessage name="number" component="div" sx={{ marginBottom: '0.5rem' }} />
                  <TextField
                    type="text"
                    name="name"
                    label="Cardholder Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    sx={{ marginBottom: '1rem' }}
                  />
                  <ErrorMessage name="name" component="div" sx={{ marginBottom: '0.5rem' }} />
                  <TextField
                    type="tel"
                    name="expiry"
                    label="Expiry Date (MM/YY)"
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    sx={{ marginBottom: '1rem' }}
                  />
                  <ErrorMessage name="expiry" component="div" sx={{ marginBottom: '0.5rem' }} />
                  <TextField
                    type="tel"
                    name="cvc"
                    label="CVC"
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    sx={{ marginBottom: '1rem' }}
                  />
                  <ErrorMessage name="cvc" component="div" sx={{ marginBottom: '0.5rem' }} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Pay Now
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Payment;
