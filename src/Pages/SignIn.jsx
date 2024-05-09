import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCustomerNew } from '../action/Customer';
import { getUser } from '../Redux/Auth/Action';

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

const Label = styled.label`
  position: absolute;
  top: ${({ focus }) => (focus ? '-10px' : '50%')};
  left: 10px;
  transform: ${({ focus }) => (focus ? 'translateY(0)' : 'translateY(-50%)')};
  // background: white;
  padding: 0 5px;
  transition: all 0.3s ease;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  /* margin-right: 5px; */
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const BrandItem = styled.div`
  flex: 1;
  border-left: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 15px 18px 15px 19px;
  min-height: 24px;
  cursor: pointer;
  box-sizing: border-box;
  margin-left: 15px; /* Fix typo here */
  @media (max-width: 350px) {
    padding: 15px 15px 15px 15px;
  }
`;

const BrandIcon = styled.img`
  width: auto;
  height: 50%;
`;

const SignIn = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  // const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth, newUser } = useSelector((store) => store);
  const brands = [
    { url: "https://justjeans.jgl.com.au/", image: "/svg2.svg" },
    { url: "https://jayjays.jgl.com.au/", image: "/svg5.svg" },
    { url: "https://portmans.jgl.com.au/", image: "/svg3.svg" },
    { url: "https://jacquie.jgl.com.au/", image: "/svg6.svg" },
    { url: "https://dotti.jgl.com.au/", image: "/svg4.svg" },
  ];

  // const handleCloseSnakbar = () => setOpenSnackBar(false);
  console.log(jwt)
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  // useEffect(() => {
  //   if (newUser?.newUser?.user || auth.error) setOpenSnackBar(true);
  // }, [newUser?.newUser?.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
// console.log(data,"data form")
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("login user", userData);

    // dispatch(login(userData));
    dispatch(getCustomerNew(userData));
  };

  console.log("this is state", newUser?.newUser?.user?.name);
  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handleEmailBlur = () => {
    setEmailFocus(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
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
            <Label focus={emailFocus}>email*</Label>
            <StyledInput
              type="email"
              name="email"
              onFocus={handleEmailFocus}
              // onBlur={handleEmailBlur}

            />
          </InputWrapper>
          <InputWrapper>
            <Label focus={passwordFocus}>password*</Label>
            <StyledInput
              type="password"
              name="password"
              onFocus={handlePasswordFocus}

            />
          </InputWrapper>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <CheckboxContainer>
              <CheckboxInput type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </CheckboxContainer>
            <CenteredText>
              <Link to="#">Forgot Password</Link>
            </CenteredText>
          </div>

          <Button type="submit">SIGN IN</Button>
        </Form>

        <div
          style={{
            width: '100%',
            margin: '30px 0px',
            borderBottom: '1px solid #333',
          }}
        ></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <CenteredText>
            <h3>Need An Online Account</h3>
          </CenteredText>
          <CenteredText>
            <p>Sign up now and create an account</p>
          </CenteredText>
          <CenteredText>
            <Button>CREATE ACCOUNT</Button>
          </CenteredText>
        </div>
      </FormContainer>
    </Container>
  );
};

export default SignIn;
