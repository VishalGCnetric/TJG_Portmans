import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 20%;
  /* border-right: 2px solid #ccc; */
  padding-right: 20px;
  h3{
    margin-bottom: 10px;

    font-weight: 600;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  ul li {
    padding: 2px 0;
    cursor: pointer;
    &:hover {
      color: #666;
    }
  }
`;

const MainContent = styled.div`
  /* width: 55%; */
  width:100%;
  padding-left: 20px;
`;

const InfoBox = styled.div`
  /* border: 1px solid #ccc; */
  width:70%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: black;
  color: white;
  text-align: center;
  text-decoration: none;
  border: none;
`;

const RightPanel = styled.div`
  width: 30%;
  padding-left: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 30px;
  margin-bottom: 10px;
`;

// React Component
const MyAccount = () => {
  return (
    <Container>
      <Sidebar>
        <h3>My Account</h3>
        <hr/>
        <ul>
          <li>Account Home</li>
          <li>Primary Address</li>
          <li>Address Book</li>
          <li>Change Password</li>
          <li>Subscriptions</li>
          <li>Saved Payments</li>
          <li>My Orders</li>
          <li>Sign Out</li>
        </ul>
      </Sidebar>
      
      <MainContent>
     <div style={{backgroundColor:'#e7e7e7',padding:'10px',marginBottom:'10px'}}>
        <h2>Account Home - My Details</h2>
     </div>
   

       <div style={{display:'flex',justifyContent:'space-between'}}>
        <InfoBox>
          <p>Name: Sajjak Ali</p>
          <p>Primary Address:</p>
          <Button>EDIT PRIMARY ADDRESS</Button>
          <Button>EDIT ADDRESS BOOK</Button>
        </InfoBox>
      <RightPanel>
        <Card>
          <p>My Orders: 0</p>
        </Card>
        <Card>
          <p>Saved Items: 0</p>
        </Card>
      </RightPanel>
      </div>
      </MainContent>
    </Container>
  );
};

export default MyAccount;
