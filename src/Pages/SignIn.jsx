import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextField } from "@mui/material";
import { login } from '../Redux/Auth/Action'; // Import login action

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
  width: 400px;
  margin: auto;
`;

const Form = styled.form`
  /* padding: 20px; */
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
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

const Button2 = styled.button`
  width: 100%;
  padding: 10px;
  background: #ffffff;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #e2e2e2; /* Change background color on hover */
  }
  border: 1px solid black;
`

const BrandItem = styled.div`
  flex: 1;
  border-left: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  cursor: pointer;
  box-sizing: border-box;
  margin-left: 15px;
  @media (max-width: 350px) {
    padding: 15px 15px 15px 15px;
  }
`;

const BrandIcon = styled.img`
  width: auto;
  height: 50%;
`;

const SignIn = () => {
  const [error, setError] = useState(null); // State variable to hold error message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store); 
  
  const brands = [
    { url: "https://justjeans.jgl.com.au/", image: "/svg2.svg" },
    { url: "https://jayjays.jgl.com.au/", image: "/svg5.svg" },
    { url: "https://portmans.jgl.com.au/", image: "/svg3.svg" },
    { url: "https://jacquie.jgl.com.au/", image: "/svg6.svg" },
    { url: "https://dotti.jgl.com.au/", image: "/svg4.svg" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(userData)
    try {
      // Dispatch login action
      dispatch(login(userData)).then(() => {
        // Redirect to the root route upon successful login
        window.location = "/";
      });
      // Reset error state
      setError(null);
      // Show success message
      // navigate("/");
      // alert("Sign in successful");
    } catch (error) {
      // Handle login error
      setError(error.message);
    }
  };

  const handleBrandClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Container>
      <CenteredText marginBottom="20px">
        <h3>MORE BRANDS TO SHOP ONE ACCOUNT.</h3>
      </CenteredText>
      
      <CenteredText>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {brands.map((brand, index) => (
            <BrandItem key={index} onClick={() => handleBrandClick(brand.url)}>
              <BrandIcon src={brand.image} alt="" />
            </BrandItem>
          ))}
        </div>
      </CenteredText>
      <Title>
        <div><h1>Sign In</h1></div>
      </Title>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
              type="password"
            />
          </InputWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <CheckboxContainer>
              {/* <CheckboxInput type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label> */}
            </CheckboxContainer>
            <CenteredText>
              <Link to="#">Forgot Password</Link>
            </CenteredText>
          </div>
          {error&&<p style={{color: 'red', textAlign: 'center'}}>{error}</p>} 

          <Button type="submit">SIGN IN</Button>
        </Form>
        <div style={{ width: '100%', margin: '30px 0px', borderBottom: '1px solid #333' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <CenteredText>
            <h3>Need An Online Account</h3>
          </CenteredText>
          <CenteredText>
            <p>Sign up now and create an account</p>
          </CenteredText>
          <CenteredText>
            <Button2>
            <Link to="/sign-up">CREATE ACCOUNT  </Link></Button2>
          </CenteredText>
        </div>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
