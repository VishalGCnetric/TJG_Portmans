import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_BASE_URL } from '../config/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  padding-right: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: ${({ showSidebar }) => (showSidebar ? 'block' : 'none')};
  }

  @media (min-width: 768px) {
    width: 20%;
    padding-right: 20px;
    margin-bottom: 0;
  }

  h3 {
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
  width: 100%;
  padding-left: 20px;

  @media (min-width: 768px) {
    width: 80%;
    padding-left: 20px;
  }
`;

const SelectBar = styled.div`
  display: none;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  select {
    width: 100%;
  }
  option {
    width: 100%;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #e7e7e7;

  h2 {
    margin-bottom: 10px;
  }

  @media (min-width: 768px) {
    width: 70%;
  }
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
  transition: all 0.3s ease;

  &:hover {
    background: #2d2d2d;
  }
`;

const RightPanel = styled.div`
  width: 100%;
  padding-left: 20px;

  @media (min-width: 768px) {
    width: 30%;
    padding-left: 20px;
  }
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 30px;
  margin-bottom: 10px;
`;

const MyAccount = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [profile,setProfile]=useState({});
  const { user } = useSelector((state) => state.auth);
  const wt = localStorage.getItem('wt');
  const wtt = localStorage.getItem('wtt');
const fullname = user?.firstName + " " + user?.lastName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(!wt && !wtt){
          alert("you need to login first")
        }else{
          console.log(user?.WCTrustedToken===wtt,wt===user?.WCToken,wt,wtt)
          const response = await axios.get(`${API_BASE_URL}info`, {
            headers: {
              wt: wt || user?.WCToken,
              wtt: wtt || user?.WCTrustedToken,
            },
          });
          const data = response.data;
          setProfile(data);
          console.log('req User ', data);
       
        }
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, [user, wt, wtt]);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Container>
      <Sidebar showSidebar={showSidebar}>
        <h3>My Account</h3>
        <hr />
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
        <SelectBar>
          <select onChange={handleToggleSidebar}>
            <option value="account">Account Home</option>
            <option value="address">Address Book</option>
            <option value="changepassword">Change Password</option>
            <option value="subscription">Subscriptions</option>
            <option value="payment">Saved Payments</option>
            <option value="orders">My Orders</option>
            <option value="signout">Sign Out</option>
          </select>
        </SelectBar>
        <div style={{ backgroundColor: '#e7e7e7', padding: '10px', marginBottom: '10px' }}>
          <h2>Account Home - My Details</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <InfoBox>
            <p>Name:{profile?.firstName + " " + profile?.lastName} </p>

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
