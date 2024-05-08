import React, { useEffect, useState } from "react";
import { Grid, Link, Typography } from '@mui/material';
import  CustomAccordion from "./CustomAccordian";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import FooterBrandList from "./FooterBrandList";
import TermsOfUsePrivacy from "./TermsOfUsePrivacy";  
import styled from "styled-components";
const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming mobile below 768px width
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Grid className=' text-white  text-center' container color={'white' } sx={{ bgcolor: 'Light Gray', 
    color: 'black', py: 3 }}>
        <FooterWrapper>
    {isMobile ? <CustomAccordion/> : <FooterRight />}
    <FooterLeft />
  </FooterWrapper>
  <FooterBrandList />
  <TermsOfUsePrivacy />
      
{/*       
      <Grid  item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Company
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Jobs
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Press
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Partners
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Solutions
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Marketing
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Analytics
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Commerce
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Insights
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Support
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Documentation
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Guides
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          API Status
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Legal
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Claim
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Privacy
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Terms
        </Typography>
      </Grid>
      <Grid className='pt-20' item xs={12} >
        <Typography variant="body2" component="p" align="center">
          &copy; 2023 Cnetric. All rights reserved.
        </Typography> */}
        {/* <Typography variant="body2" component="p" align="center">
          Made with love by Me.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Icons made by{' '}
          <Link href="https://www.freepik.com" color="inherit" underline="always">
            Freepik
          </Link>{' '}
          from{' '}
          <Link href="https://www.flaticon.com/" color="inherit" underline="always">
            www.flaticon.com
          </Link>
        </Typography> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default Footer;
const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  justify-content: center; /* Center horizontally */
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;