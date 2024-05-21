import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import OpenHumburger from "./OpenHumburger"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/Auth/Action';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@mui/material';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { getCartItems } from '../../../action/cart';
import { AutoFixHighTwoTone } from '@mui/icons-material';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const {  cart, newUser, cartItems } = useSelector((store) => store);
  const totalQuantity = cartItems?.cartItems?.orderItem?.length || 0;

  // console.log(cartItems,"quantity")
const navigate = useNavigate();
  const DROPDOWN_LINKS = [
    { text: 'Sign In', href: '/sign-in' },
    { text: 'Create Account', href: '/sign-up' },
    { text: 'Account Help', href: '#' }
  ];
  useEffect(() => {
    if (auth) {
      dispatch(getCartItems());
    }

  }, []);

  const DROPDOWN_LINKS_auth = [
    { text: 'My Profile', href: '/my-account' },
    { text: 'Account Help', href: '#' },
   { text: 'Sign Out', href: '#' }
  ];
  const data = auth ? DROPDOWN_LINKS_auth : DROPDOWN_LINKS;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownItemClick = (option) => {
    if(option.text=='Sign Out'){
      dispatch(logout());
      toast.success("Logged out successfully");

    }else{
      navigate(option.href);
    }
    setSelectedOption(option);
    setIsDropdownVisible(false); // Close the dropdown after selection
  };

  return (
    <ContainerRoot>
      <Toaster />
      <HamburgerIcon>
        <div>
          {isOpen ? (
            <Cross onClick={toggleMenu}>X</Cross>
          ) : (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px" }}>
              <div onClick={toggleMenu}>
                <Line />
                <Line />
                <Line />
              </div>
              <SearchModel onClick={toggleDropdown}>
              <Link to="/shops">
                <img alt="" src="/icon--search.svg" style={{ height: "20px", width: "20px" }} />
                </Link>
              </SearchModel>
            </div>
          )}
        </div>
      </HamburgerIcon>

      {showSearchInput ? (
        <SearchContainer >
          <input
            type="text"
            placeholder="Search"
            style={{
              border: "none",
              padding: "5px",
              // margin: "10px",
              borderBottom: "1px solid black",
            }}
          />
          <div>
            <img alt=""src="/icon--search.svg" style={{ height: "20px", width: "20px",cursor:"pointer" }} onClick={() => setShowSearchInput(false)}/>
          </div>
        </SearchContainer>
      ) : (
        <SearchButton >
          <Link to="/shops">
          <img alt="" src="/icon--search.svg" style={{ height: "20px", width: "20px" }} />
          </Link>
          <Link to="/shops">
          <SearchButtonText>Search</SearchButtonText>
          </Link>
        </SearchButton>
      )}
      <LogoContainer>
        <Link to ="/">
        <img alt="portmans" src="/ajoWZ801.svg" style={{ height: "28px", width: "198.4px" }} />
        </Link>
      </LogoContainer>
      <SvgContainer>
      <PersonImg
        alt="User"
        src="/icon--account.svg"
        onClick={toggleDropdown}
        
      />
      {isDropdownVisible && (
        <DropdownMenu onMouseLeave={toggleDropdown} >
          {data.map((link, index) => (
            <DropdownItem key={index} >
              <Link to={link.href} onClick={() => handleDropdownItemClick(link)}>
                {link.text}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
      <img alt="fevorite" src="/icon--wishlist.svg" />
     {/* <Link to="/cart">
       
     <span className="ml-2 text-sm font-medium  text-gray-800">
                      {newUser?.newUser?.user?.name
                        ? cartItems?.cartItems?.cart?.totalQuantity
                        : 0}
                    </span>
                    <img alt="shopping-cart" src="/icon--bag.svg" />
     </Link> */}
   
     <Link to="/cart" className="relative inline-block">
      <img alt="shopping-cart" src="/icon--bag.svg" className="w-6 h-6" />
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
          {totalQuantity}
        </span>
    
    </Link>
               
    </SvgContainer>
    
      <OpenHumburger drawer={isOpen} setDrawer={setIsOpen}/>
    </ContainerRoot>
  );
};

export default SearchBar;

const ContainerRoot = styled.header`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 8px 0px;
  box-sizing: border-box;
  top: 0;
  z-index: 999;
  /* position: sticky; */
  background-color: white;
  max-width: 100%;
  text-align: left;
  font-size: 14px;
  color: #333333;
  font-family: "Inter Bold", sans-serif;
  
`;

const SearchButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 25px;
  margin-left: 10px;
  &:hover {
    opacity: 0.8; 
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SearchButtonText = styled.p`
  margin-left: 5px;
  
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    opacity: 0.8; 
  }
`;



const HamburgerIcon = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
  }
`;
const SearchModel = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: block;
  }`;
const Line = styled.div`
  width: 20px;
  height: 2px;
  background-color: #333;
  margin: 4px 0;
`;

const Cross = styled.div`
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  padding: 10px;
  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }
  @media screen and (max-width: 1024px) {
    display: none;
    margin-bottom: 10px;
  }
 
`;
const DropdownMenu = styled.div`
  position: absolute;
  right: -6px; /* Adjust as needed */
  top: calc(100% - 3px); /* Position below the account icon */
  // top:1px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 999; /* Ensure it's above other content */ 
  min-width: 150px; /* Set minimum width as needed */
  `;

const DropdownItem = styled.a`
  display: block;
  padding: 4px;
  color: #333;
  z-index: 999;
  text-decoration: none;
  &:hover {
    background-color: gray;
    z-index: 999;
  }
  `;

const SvgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  margin-right: 20px;
  position: relative; /* Set position to relative */
  &:hover {
    opacity: 0.8; /* Reduce opacity on hover */
  }
`;

const PersonImg = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;





