import React from 'react';
import Payment from './Payment';
import AmountDetails from './AmountDeatails';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
  }
`;




function PaymentPage({handleNext}) {
  return (
    <Div >
      
        <Payment handleNext={handleNext}/>
     
        <AmountDetails />
    
    </Div>
  );
}

export default PaymentPage;
