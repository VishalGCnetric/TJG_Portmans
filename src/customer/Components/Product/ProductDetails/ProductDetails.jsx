import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { LinearProgress, Rating } from "@mui/material";
import { receiveProductsById } from '../../../../action';


// Styled components
const Container = styled.div`
  display: flex;
  /* justify-content: space-evenly; */
  align-items: flex-start;
  /* max-width: 1200px; */
  margin: 20px ;
 padding:50px;
 border-radius: 10px;
  background-color: aliceblue;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.div`
  width: 40%;
  height:400px;
  border-radius: 10px;
  /* background-color: antiquewhite; */
  /* height: 400px; */
  /* max-height: 400px; */
  /* object-fit: cover; */
  img{
     height: 100%;
     width: 100%;
     object-fit:contain;

     
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
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


const product = {
  id: 1,
  name: 'Example Product',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  price: 99.99,
  imageUrl: 'https://justjeans.jgl.com.au/JJ/aurora/images/products/large/039057_vintageink_l.jpg',
  quantity: 10,
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['#ff0000', '#00ff00', '#0000ff'],
};
const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
 console.log(productDetails.catalogEntryView)

  useEffect(() => {
    receiveProductsById(productId).then((res) => {
      // console.log("this is new details product page", res);
      setProductDetails(res);
    });
  }, [productId]);

  // const [topProducts, setTopProducts] = useState([]);

  // useEffect(() => {
  //   receiveProducts().then((data) => {
  //     setTopProducts(data.hits);
  //   });
  // }, []);




  return (
    <Container>
      <Link to='/shops'>Product /</Link>
      <ProductImage >
        <img src={product.imageUrl} alt={product.name}  />
        </ProductImage>
      <ProductDetail>
        <Title>{product.name}</Title>
        <Details>{product.description}</Details>
        <Price>Price: ${product.price}</Price>
        <QuantityContainer>
          <QuantityButton >-</QuantityButton>
          <QuantityDisplay>{0}</QuantityDisplay>
          <QuantityButton >+</QuantityButton>
        </QuantityContainer>
        <SizeDropdown>
          {product.sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </SizeDropdown>
        <div>
          <label>Color:</label>
          <ColorVariant>
            {product.colors.map((color) => (
              <ColorCircle key={color} style={{ backgroundColor: color }} />
            ))}
          </ColorVariant>
          <Rating
            name="read-only"
            value={4.6}
            precision={0.5}
            readOnly

          />
        </div>
        {/* Add buttons for actions like "Add to Cart" */}
        <AddToCartButton >Add to Cart</AddToCartButton>
      </ProductDetail>
    </Container>
  );
};

export default ProductDetails;
