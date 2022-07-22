import { Box, Container, styled } from "@mui/system";
import { Typography } from "@mui/material";


import React from "react";
import Carousel from "./Carousel";

const StyledBanner = styled(Box)({
  miHeight: 400,
  background: 'url("./banner2.jpg") center center/cover no-repeat',
  paddingBottom : 20
});

const StyledContainer = styled(Container)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: 45,
});

function Banner() {
  return (
    <StyledBanner>
      <StyledContainer>
        <Typography  fontWeight={"bold"} variant="h2" textAlign={'center'} pb={2}>
          Crypto Hunter
        </Typography>
        <Typography textAlign={'center'} textTransform={'capitalize'} variant="subtitle-2">
          get all the info regarding your favorite crypto currency
        </Typography>
        <Carousel />
      </StyledContainer>
    </StyledBanner>
  );
}

export default Banner;
