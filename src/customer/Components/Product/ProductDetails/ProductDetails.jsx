import React from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating,IconButton } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { lengha_page1 } from "../../../../Data/Women/LenghaCholi";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import { receiveProducts, receiveProductsById } from "../../../../action";
import { AddItemToCartNew, getCartItems } from "../../../../action/cart";
import { grey } from "@mui/material/colors";
import styled from "styled-components";
import { SingleBedSharp } from "@mui/icons-material";
import  { toast,Toaster } from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const[checkCart,setCheckCart] = useState(false)
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, cartItems } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const [productDetails, setProductDetails] = useState({});
  const [loading,setLoading] =useState(false)
  const  {auth}= useSelector((store) => store.auth);
  const [topProducts, setTopProducts] = useState([]);


  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const partNumber = activeImage && activeImage.partNumber;
    const quantity = qty;
    if(!auth){
      navigate("/sign-in");
    }
    if (partNumber) {
      AddItemToCartNew({partNumber,quantity})
        .then((res) => {
          // alert("Added to Cart")
          toast.success("Product Added To Cart")
          dispatch(getCartItems());
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    } else {
      toast.error("out of Stock")
      console.error("Part number is missing.");
    }
   
  };

  useEffect(() => {
  
    if (cartItems?.cartItems?.cart?.lines.length > 0) {
      dispatch(getCartItems());
    }
  }, [cartItems?.cartItems?.cart?.lines.length]);

  useEffect(() => {
    receiveProductsById(productId).then((res) => {
      setProductDetails(res.catalogEntryView[0]);
    });
  }, [productId]);


  useEffect(() => {
    receiveProducts().then((data) => {
      setTopProducts(data.hits);
      setLoading(!loading)
    });
  }, []);

  useEffect(() => {
    const checkItem = CheckCardItem(productDetails?.sKUs?.[0]?.partNumber);
    setCheckCart(checkItem);
  }, [cartItems, productDetails]);
 
  const CheckCardItem = (ID) => {
    let Cart = cartItems?.cartItems?.orderItem;
    let foundInCart = false;
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        // console.log("cartItem---", cartItem.partNumber, "ID---", ID);
 
        if (cartItem.partNumber === ID) {
          foundInCart = true;
          break;
        }
      }
    }
    setCheckCart(foundInCart);
    return foundInCart;
  };

// // console.log(productDetails)
// if(!loading){
//   return <LinearProgress/>
// }
 



  return (
    <>
    <Toaster/>
      <div style={{ marginTop: '20px', marginLeft: '100px',marginBottom:'20px' }}>
        <Link to='/shops'> <b>Product /</b> {productDetails?.name}</Link>
      </div>
      <Container >
        {
          productDetails && <>

            <ProductImage>
              <img
                //  src={productDetails[0]?.fullImage} h
                src={activeImage ? activeImage.mainImage : productDetails?.fullImage}
                alt={productDetails?.name} />
            </ProductImage>
            <ProductDetail>
              <Title>{productDetails?.name}</Title>
              
              <div style={{ marginBottom: '10px' }}>
                {/* <span className="text-gray-600 text-sm">
            <del>${productDetails[0]?.price[0]?.value}</del>
          </span> */}
                <span className="text-green-600 font-bold text-lg">
                  ${productDetails?.price?.[1]?.value}
                </span>
              </div>
              <div style={{ marginTop: '12px' }}>
                <Rating
                  name="read-only"
                  value={4.6}
                  precision={0.5}
                  readOnly
                />
              </div>


              <div style={{ marginTop: '10px' }}>
                {productDetails?.variants &&
                <div>
                <label>Color:   {activeImage?.colour}</label>
                </div>}
                <ColorVariant>

                  {productDetails?.variants && productDetails?.variants.map((variant, index) => (
                    <ColorCircle key={index} onClick={() => setActiveImage(variant)} style={{ backgroundImage: `url(${variant?.smallImage})` }} />
                  ))}
                </ColorVariant>
                {/* {productDetails?.variants &&
                <div style={{ fontSize: '10px', color: `${activeImage?.partNumber && activeImage.partNumber ? "green" : "red"}` }}>
                  <span>{activeImage?.partNumber && activeImage.partNumber ? 'In Stock' : 'Out of Stock'}</span>
                </div>} */}
                <div style={{ marginTop: '10px' }}>
                  {productDetails?.sizes &&
                  <div>
                    <label htmlFor="">
                      Size:
                    </label>
                  </div>}
                 <ColorVariant>
                    {productDetails?.sizes && productDetails?.sizes.map((size, index) => {
                      const digits = size.match(/\d+/);
                      return (
                        <ColorCircle key={index} onClick={() => setSelectedSize(size)}>
                          {digits && digits[0]}
                        </ColorCircle>
                      );
                    })}
                  </ColorVariant>
                </div>
                {/* <QuantityContainer>
                  <QuantityButton disabled={qty == 1} onClick={() => setQty((pre) => pre - 1)}>-</QuantityButton>
                  <QuantityDisplay >{qty}</QuantityDisplay>
                  <QuantityButton onClick={() => setQty((pre) => pre + 1)}>+</QuantityButton>
                </QuantityContainer> */}

              
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={() => setQty((pre) => pre - 1)}
              disabled={qty <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">
              {qty}
            </span>
            <IconButton
               onClick={() => setQty((pre) => pre + 1)}
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        
        </div>


              </div>
             
             {!checkCart ? (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        bgcolor: grey[900],
                      }}
                      onClick={handleSubmit}
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        bgcolor: grey[900],
                      }}
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      View Cart
                    </Button>
                  )}
             <div>
              <h2 style={{marginTop:'20px'}}> <b>Description</b> </h2>
             </div>
            <Details style={{marginTop:'10px'}}>{productDetails?.longDescription}</Details>
            </ProductDetail>
          </>
        }
      </Container>
    </>
  );
}


const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px 50px;
  border-radius: 10px;
  background-color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 40%;
  height: 450px;
  border-radius: 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const ProductDetail = styled.div`
  width: 50%;
  padding-left: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0;
    margin-top: 20px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Details = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  padding: 8px 12px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const QuantityDisplay = styled.span`
  margin: 0 10px;
`;

const SizeDropdown = styled.select`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 10px;
`;

const ColorVariant = styled.div`
  display: flex;
  align-items: center;
`;

const ColorCircle = styled.div`
  border-radius: 2px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 30px;
  height: 30px;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  object-fit: contain;
  border:1px solid #c2c2c2;
  margin-right: 10px;
  margin-top: 5px;
  &:hover{
    border:1.5px solid #000000;
  }
`;


const AddToCartButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #000000;
  color: #fff;
  border: none;   
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #373837;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
  }
`;

