import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { register } from '../Redux/Auth/Action';
import { TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

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

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber")
    };

    try {
      await dispatch(register(userData));
      setFormError(null);
      alert("Account created successfully");
      // navigate("/"); // Redirect upon successful registration
    } catch (error) {
      console.log("error", error.errorMessage);
      setFormError(error.message);
    }
  };
console.log(error);
  return (
    <Container>
      <CenteredText marginBottom="20px">
        <h3>MORE BRANDS TO SHOP ONE ACCOUNT.</h3>
      </CenteredText>
      <Title>
        <div>
          <h1>Sign Up</h1>
        </div>
      </Title>
      <div style={{ textAlign: 'center', margin: '20px' }}>
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
                autoComplete="family-name"
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
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
                autoComplete="new-password"
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="phonenumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                autoComplete="tel"
              />
            </InputWrapper>
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <div>
                <input style={{ height: '20px', width: '20px', marginTop: '5px' }} type="checkbox" id="terms" />
              </div>
              <div>
                <label htmlFor="terms">
                  Sign up to Portmans emails and receive 15% off your next full price purchase at Portmans.
                </label>
              </div>
            </div>
            {error && <ErrorText>{error}</ErrorText>}
            {formError && <ErrorText>{formError}</ErrorText>}
            <Button>CREATE ACCOUNT</Button>
          </Form>
        </FormWrapper>
        <ImageWrapper>
          <img
            src="https://portmans.jgl.com.au/RJ/aurora/images/espot/static/CreateAccount/PO23AW_CreateAccount_1.jpg"
          />
        </ImageWrapper>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
