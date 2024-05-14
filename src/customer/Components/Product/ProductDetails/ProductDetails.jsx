import React from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
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

const product = {
  name: "Basic Tee 6-Pack",
  price: "₹996",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    "This item might be useful if you're preparing for one of these exams",
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, cartItems } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  // console.log("param",productId,customersProduct.product)
  const [productDetails, setProductDetails] = useState({});

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = { id:productDetails.product?.variants[0]?.id, size: selectedSize.name };
    // dispatch(addItemToCart({ data, jwt }));
    // navigate("/cart");
    // dispatch(AddItemToCartNew(productDetails.product?.variants[0]?.id))
    AddItemToCartNew(productDetails.product?.variants[0]?.id).then((res) => {
      dispatch(getCartItems());
    });
  };

  useEffect(() => {
    // const data = { productId: productId, jwt };
    // dispatch(findProductById(data));
    // dispatch(getAllReviews(productId));
    if (cartItems?.cartItems?.cart?.lines.length > 0) {
      dispatch(getCartItems());
    }
  }, [cartItems?.cartItems?.cart?.lines.length]);

  useEffect(() => {
    receiveProductsById(productId).then((res) => {
      // console.log("this is new details product page", res);
      setProductDetails(res.catalogEntryView);
    });
  }, [productId]);

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    receiveProducts().then((data) => {
      setTopProducts(data.hits);
    });
  }, []);


  const CheckCardItem = (ID) => {
    let checkcart = false;

    let Cart = cartItems?.cartItems?.cart?.lines;
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        if (cartItem.productVariant.id === ID) {
          checkcart = true;
        }
      }
    }
    return checkcart;
  };

  // useEffect(() => {

  // }, [cartItems?.cartItems?.cart?.lines.length]);

  if (!productDetails) {
    return <LinearProgress />
  }

  return (
    <Container>
      {
        productDetails && <>
        <div style={{marginTop:'-30px'}}>
          <Link to='/shops'>Product /</Link>
        </div>
          <ProductImage>
            <img
              //  src={productDetails[0]?.fullImage} h
              src={activeImage ? activeImage.mainImage : productDetails[0]?.fullImage}
              alt={productDetails[0]?.name} />
          </ProductImage>
          <ProductDetail>
            <Title>{productDetails[0]?.name}</Title>
            <Details>{productDetails[0]?.longDescription}</Details>
            <div style={{ marginBottom: '10px' }}>
              {/* <span className="text-gray-600 text-sm">
            <del>${productDetails[0]?.price[0]?.value}</del>
          </span> */}
              <span className="text-green-600 font-bold text-lg">
                ${productDetails[0]?.price[1]?.value}
              </span>
            </div>
            <QuantityContainer>
              <QuantityButton >-</QuantityButton>
              <QuantityDisplay>{1}</QuantityDisplay>
              <QuantityButton >+</QuantityButton>
            </QuantityContainer>

            <div style={{ marginTop: '10px' }}>
              <label>Color:   {activeImage?.colour}</label>
              <ColorVariant>
              
                 {productDetails[0]?.variants && productDetails[0]?.variants.map((variant, index) => (
                  <ColorCircle key={index} onClick={() => setActiveImage(variant)} style={{ backgroundImage: `url(${variant?.smallImage})` }} />
                ))}
              </ColorVariant>
              <div style={{ marginTop: '10px' }}>
                <div>
                  <label htmlFor="">
                    Size:
                  </label>
                </div>
                <ColorVariant>
                  {productDetails[0]?.sizes && productDetails[0]?.sizes.map((size, index) => {
                    const digits = size.match(/\d+/);
                    return (
                      <ColorCircle key={index} onClick={() => setSelectedSize(size)}>
                        {digits && digits[0]}
                      </ColorCircle>
                    );
                  })}
                </ColorVariant>
              </div>
              <div style={{ marginTop: '12px' }}>
                <Rating
                  name="read-only"
                  value={4.6}
                  precision={0.5}
                  readOnly
                />
              </div>
            </div>
            <AddToCartButton>
             <Link to='/cart' >Add to Cart</Link> </AddToCartButton>
          </ProductDetail>
        </>
      }
    </Container>
  );
}



const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 50px;
  border-radius: 10px;
  background-color: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 40%;
  height: 400px;
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
  margin-bottom: 10px;
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
  &:hover{
    border:1.5px solid #000000;
  }
`;

const AddToCartButton = styled.button`
  margin-top: 30px;
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

