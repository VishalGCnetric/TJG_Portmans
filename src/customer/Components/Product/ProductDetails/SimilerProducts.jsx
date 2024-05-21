import React from 'react';
import styled from 'styled-components';

const SimilarProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const ProductCard = styled.div`
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductName = styled.div`
  margin-top: 8px;
  font-size: 16px;
  color: #333;
`;

const ProductPrice = styled.div`
  margin-top: 4px;
  font-size: 18px;
  color: #666;
`;

const SimilerProducts = ({product}) => {
    console.log(product)
  return (
    
    <ProductCard>
      <ProductImage src={product.fullImage} alt={product.name} />
      {/* <ProductName>{product.name}</ProductName> */}
      {/* <ProductPrice>{price}</ProductPrice> */}
    </ProductCard>
 
  );
};

export default SimilerProducts