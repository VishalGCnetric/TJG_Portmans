import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top:20px;
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
  margin:25px;
  font-size: 26px;
  div{
    border-bottom:1px solid black;
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
  background: white;
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

const SignIn = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

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

  return (
    <Container>
      <CenteredText marginBottom="20px">
        <h3>MORE BRANDS TO SHOP ONE ACCOUNT.</h3>
      </CenteredText>
      <CenteredText>
        <h3>Just Jeans   Portmans   dotti   Jay jays   Jacquie</h3>
      </CenteredText>
      <Title>
        <div><h1>Sign In</h1></div>
        </Title>
      <FormContainer>
        <Form>
          <InputWrapper>
            <Label focus={emailFocus}>email*</Label>
            <StyledInput
              type="email"
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />
          </InputWrapper>
          <InputWrapper>
            <Label focus={passwordFocus}>password*</Label>
            <StyledInput
              type="password"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
          </InputWrapper>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'10px' }}>
            <CheckboxContainer>
              <CheckboxInput type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </CheckboxContainer>
            <CenteredText>
              <a href="#">Forgot Password</a>
            </CenteredText>
          </div>

          <Button>SIGN IN</Button>
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
