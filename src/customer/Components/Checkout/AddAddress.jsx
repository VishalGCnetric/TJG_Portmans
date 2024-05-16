import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import AddressCard from "../adreess/AdreessCard"; // Corrected import path
import { grey } from "@mui/material/colors";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function AddDeliveryAddressForm({ handleNext, handleBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { cartItems } = useSelector((store) => store);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const wt = localStorage.getItem("wt");
      const wtt =localStorage.getItem("wtt");
      try {
        const res = await axios.get(`${API_BASE_URL}addresses`,{
          headers: {
            wt: wt,
            wtt: wtt,
          },
        });
        // console.log(res.data);
        const add = res.data.contact;
        setAddresses(add);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Extract form data
    const formData = new FormData(event.currentTarget);
    const addressData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      nickName: formData.get("nickName"),
      streetLine1: formData.get("streetLine1"),
      streetLine2: formData.get("streetLine2"),
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("zip"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      countryCode: "AUS", 
    };

    // Dispatch action to create order
    dispatch(createOrder({ address: addressData, navigate }));

    // Perform other operations
    handleBack({ cartId: cartItems?.cartItems?.orderId, shippingAddress: addressData });
    handleNext();
  };

  const handleCreateOrder = (item) => {
    // dispatch(createOrder({ address: item,  navigate }));
    handleBack({ cartId: cartItems?.cartItems?.orderId, shippingAddress: item });

    handleNext();
  };
console.log(addresses);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[32.5rem] overflow-y-scroll">
          {addresses?.map((address) => (
            <div
              key={address.id}
              onClick={() => setSelectedAddress(address)}
              className="p-5 py-7 border-b cursor-pointer"
            >
              <AddressCard address={address} />
              {selectedAddress?.id === address.id && (
                <Button
                  sx={{ mt: 2 }}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => handleCreateOrder(address)}
                >
                  Deliver Here
                </Button>
              )}
            </div>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="nickName"
                  name="nickName"
                  label="nickName"
                  fullWidth
                  autoComplete="nickName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="email"
                  fullWidth
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="streetLine1"
                  name="streetLine1"
                  label="Street Address"
                  fullWidth
                  autoComplete="shipping street-address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="streetLine2"
                  name="streetLine2"
                  label="Apartment, suite, etc. (optional)"
                  fullWidth
                  autoComplete="shipping address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  autoComplete="shipping address-level1"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem", bgcolor: grey[900], }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Deliver Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
