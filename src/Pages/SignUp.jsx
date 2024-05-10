import React, { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../Redux/Auth/Action';
import {  TextField } from "@mui/material";

const Container = styled.div`
  margin-top: 20px;
  font-family: Arial, sans-serif;
  width: 100%;
`;

const CenteredText = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)};
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px;
  font-size: 26px;
  div {
    border-bottom: 1px solid black;
  }
`;

const FormContainer = styled.div`
  display: flex;
  padding: 0px 100px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-right: 20px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Form = styled.form`
  padding: 20px;
  border-radius: 8px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #2d2d2d; /* Change background color on hover */
  }
`;

const BrandItem = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const BrandIcon = styled.img`
  width: auto;
  height: 50%;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const brands = [
    { url: "https://justjeans.jgl.com.au/", image: "/svg2.svg" },
    { url: "https://jayjays.jgl.com.au/", image: "/svg5.svg" },
    { url: "https://portmans.jgl.com.au/", image: "/svg3.svg" },
    { url: "https://jacquie.jgl.com.au/", image: "/svg6.svg" },
    { url: "https://dotti.jgl.com.au/", image: "/svg4.svg" },
  ];

  useEffect(()=>{
    // if(jwt){
    //   dispatch(getUser(jwt))
    // }
  },[jwt]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData={
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("user data",userData);
    // dispatch(register(userData))
  };

  const handleBrandClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container>
      <CenteredText marginBottom="20px">
        <h3>MORE BRANDS TO SHOP ONE ACCOUNT.</h3>
      </CenteredText>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {brands.map((brand, index) => (
          <BrandItem key={index} onClick={() => handleBrandClick(brand.url)}>
            <BrandIcon src={brand.image} alt="" />
          </BrandItem>
        ))}
      </div>
      <Title>
        <div>
          <h1>Sign Up</h1>
        </div>
      </Title>
      <div style={{textAlign:'center',margin:'20px'}}>
        <p>Create an account for quick sign in and fast checkout.</p>
        <p>Plus, sign up to our emails to be the first to know about our new collections & latest offers.</p>
      </div>
      <FormContainer>
        <FormWrapper>
          <p>* Indicates a required field</p>
          <Form onSubmit={handleSubmit}>
          <InputWrapper>
              <TextField
                required
                id="firstname"
                name="firstName"
                label="First Name"
                fullWidth
                autoComplete="given-name"
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="lastname"
                name="lastName"
                label="Last Name"
                fullWidth
                autoComplete="given-name"
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="given-name"
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="password"
                name="password"
                type="password"
                label="Password"
                fullWidth
                autoComplete="given-name"
              />
            </InputWrapper>
           
            <InputWrapper>
              <TextField
                required
                id="mobile"
                name="mobile"
                label="Mobile"
                fullWidth
                autoComplete="given-name"
              />
            </InputWrapper>
            <div style={{ marginBottom: '10px',display:'flex',gap:'10px' }}>
              <div >
              <input style={{height:'20px', width:'20px',marginTop:'5px'}} type="checkbox" id="terms" />
              </div>
              <div>
              <label htmlFor="terms">
                Sign up to Portmans emails and receive 15% off your next full price purchase at Portmans.
              </label>
              </div>
            </div>
            <Button>CREATE ACCOUNT</Button>
          </Form>
        </FormWrapper>
        <ImageWrapper>
          <img
            src="https://portmans.jgl.com.au/RJ/aurora/images/espot/static/CreateAccount/PO23AW_CreateAccount_1.jpg"
            // alt=""
            // style={{
            //   width: '100%',
            //   objectFit: 'cover',
            //   borderRadius: '8px',
            // }}
          />
        </ImageWrapper>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
