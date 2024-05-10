import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { register } from '../Redux/Auth/Action';

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
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 0 30px;      */
`;

const FormWrapper = styled.div`
  flex: 1;
  /* width:70%; */
  margin: 0 100px;
`;

const ImageWrapper = styled.div`
  flex: 1;

`;

const Form = styled.form`
  padding: 20px;
  /* background-color: #f9f9f9; */
  border-radius: 8px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Label = styled.label`
  position: absolute;
  top: ${({ focus }) => (focus ? '-10px' : '50%')};
  left: 10px;
  transform: ${({ focus }) =>
    focus ? 'translateY(0)' : 'translateY(-50%)'};
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

const SignUp = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  const [error, setError] = useState(null); // State variable to hold error message
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      // Dispatch register action
      await dispatch(register(userData));
      // Reset error state
      setError(null);
      // Show success message
      alert("Account created successfully");
    } catch (error) {
      // Handle registration error
      setError(error.message);
    }
  };
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

  const handleFirstNameFocus = () => {
    setFirstNameFocus(true);
  };

  const handleFirstNameBlur = () => {
    setFirstNameFocus(false);
  };

  const handleLastNameFocus = () => {
    setLastNameFocus(true);
  };

  const handleLastNameBlur = () => {
    setLastNameFocus(false);
  };

  const handleMobileFocus = () => {
    setMobileFocus(true);
  };

  const handleMobileBlur = () => {
    setMobileFocus(false);
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
        <div>
          <h1>Sign Up</h1>
        </div>
      </Title>
      <div style={{textAlign:'center',margin:'20px  '}}>
        <p>Create an account for quick sign in and fast checkout.</p>
        <p>Plus, sign up to our emails to be the first to know about our new collections & latest offers.</p>
      </div>
      <FormContainer>
        <FormWrapper>
          <p>* Indicates a required field</p>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Label focus={emailFocus}>Email*</Label>
              <StyledInput
                type="email"
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
            </InputWrapper>
            <InputWrapper>
              <Label focus={passwordFocus}>Password*</Label>
              <StyledInput
                type="password"
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
            </InputWrapper>
            <InputWrapper>
              <Label focus={firstNameFocus}>First Name*</Label>
              <StyledInput
                type="text"
                onFocus={handleFirstNameFocus}
                onBlur={handleFirstNameBlur}
              />
            </InputWrapper>
            <InputWrapper>
              <Label focus={lastNameFocus}>Last Name*</Label>
              <StyledInput
                type="text"
                onFocus={handleLastNameFocus}
                onBlur={handleLastNameBlur}
              />
            </InputWrapper>
            <InputWrapper>
              <Label focus={mobileFocus}>Mobile*</Label>
              <StyledInput
                type="text"
                onFocus={handleMobileFocus}
                onBlur={handleMobileBlur}
              />
            </InputWrapper>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}
            >
              <CheckboxContainer>
                <CheckboxInput type="checkbox" id="terms" />
                <label htmlFor="terms">
                  Sign up to Portmans emails and receive 15% off your next
                  full price purchase at Portmans.
                </label>
              </CheckboxContainer>
            </div>
            {error && <div>Error: {error}</div>}
            <Button>CREATE ACCOUNT</Button>
          </Form>
        </FormWrapper>
        <ImageWrapper>
          <img
            src="https://portmans.jgl.com.au/RJ/aurora/images/espot/static/CreateAccount/PO23AW_CreateAccount_1.jpg"
            alt=""
            style={{
              width: '75%',
              objectFit: 'cover',
            }}
          />
        </ImageWrapper>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
