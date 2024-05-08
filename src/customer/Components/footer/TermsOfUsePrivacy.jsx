import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  // background-color: #fff;
  color:black;
  border-top: 1px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 17px 0px 16px;
`;

const LinksContainer = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

`;

const LinkWrapper = styled.div`
  align-self: stretch;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 17px 0px 16px;
  &:last-child {
    border-right: none;
  }
`;

const Link = styled.a`
  position: relative;
  letter-spacing: 0.4px;
  line-height: 15px;
  // color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const TermsOfUsePrivacy = () => (
  <FooterContainer>
    <LinksContainer>
      <LinkWrapper>
        <Link href="https://justjeans.jgl.com.au/shop/terms-of-use" target="_blank">
          Terms Of Use
        </Link>
      </LinkWrapper>
      <LinkWrapper>
        <Link href="https://justjeans.jgl.com.au/shop/privacy" target="_blank">
          Privacy
        </Link>
      </LinkWrapper>
    </LinksContainer>
  </FooterContainer>
);

export default TermsOfUsePrivacy;
