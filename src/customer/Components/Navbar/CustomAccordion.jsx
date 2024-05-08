import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AccordionWrapper = styled.div`
  width: 95%;
  z-index: 120;
`;

const AccordionItem = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AccordionButton = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f9f9f9;
  border: none;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  outline: none;
  border-radius: 5px 5px 0 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eaeaea;
  }

  div {
    font-size: 16px;
    color: #30497a;
    font-weight: bold;
  }
`;

const AccordionContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${fadeIn} 0.5s ease;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 5px 5px;
`;

const NestedLink = styled.a`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #30497a;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const NestedAccordionContent = styled.div``;

const CustomAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [data, setData] = useState({ extraData: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://49.206.253.146:2109/childCategories?categoryId=3074457345616679204'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AccordionWrapper>
        {data.extraData.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton onClick={() => toggleAccordion(index)}>
              <div>{item.name}</div>
              <div>{openIndex === index ? '-' : '+'}</div>
            </AccordionButton>
            <AccordionContent isOpen={openIndex === index}>
              <NestedAccordionContent>
                {item.children?.map((nestedItem, nestedIndex) => (
                  <NestedLink key={nestedIndex} href="#">
                    {nestedItem.name}
                  </NestedLink>
                ))}
              </NestedAccordionContent>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionWrapper>
    </div>
  );
};

export default CustomAccordion;
