import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { styled } from '@mui/material/styles';
import Hero from './Hero';
import Logo from '../../components/LogoSign';
const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {
  return (
    <OverviewWrapper>
      <Helmet>
        <title>Food Express</title>
      </Helmet>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center" style={{marginBottom:20,marginTop:20}}>
          <Logo />
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
