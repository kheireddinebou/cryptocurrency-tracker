import { Box, Container } from "@mui/system";
import { Divider, Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { appContext } from "../AppContext";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { formateToCurrency } from "../components/Carousel";



function CoinPage() {
  const [coin, setCoin] = useState();

  const { currency } = useContext(appContext);
  const { id } = useParams();
  const fetchData = async () => {
    const data = await fetch(SingleCoin(id)).then(res => res.json());

    setCoin(data);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <Container maxWidth={"xl"}>
      <Stack
        width={"100%"}
        direction={{ xs: "column", md: "row" }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={6}
        mt={3}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={coin?.image.large} alt={coin?.name} />
          <h3 style={{ fontSize: "30px", margin: "10px" }}>{coin?.name}</h3>
          <p
            style={{ fontSize: "20px", margin: "0", textAlign: "center" }}
            dangerouslySetInnerHTML={{
              __html: coin?.description.en.split(". ")[0],
            }}
          ></p>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              alignSelf: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography variant={"h5"} mt={2} fontWeight={600}>
              Rank :{" "}
              <span style={{ fontSize: "24px", fontWeight: 400 }}>
                {coin?.market_cap_rank}
              </span>
            </Typography>
            <Typography variant={"h5"} mt={2} fontWeight={600}>
              Current Price :{" "}
              <span style={{ fontSize: "24px", fontWeight: 400 }}>
                {formateToCurrency(
                  coin?.market_data.current_price[currency.toLowerCase()],
                  currency
                )}
              </span>
            </Typography>
            <Typography variant={"h5"} mt={2} fontWeight={600}>
              Market Cap :{" "}
              <span style={{ fontSize: "24px", fontWeight: 400 }}>
                {formateToCurrency(
                  coin?.market_data.market_cap[currency.toLowerCase()],
                  currency
                )}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >  
          <CoinInfo coin={coin} />
          
        </Box>
      </Stack>
    </Container>
  );
}

export default CoinPage;
