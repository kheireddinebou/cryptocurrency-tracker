import { styled } from "@mui/system";
import { Box, Link, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../config/api";
import { appContext } from "../AppContext";
import AliceCarousel from "react-alice-carousel";

export const formateToCurrency = (num, currency) => {
  const numFormatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  });

  return numFormatter.format(num);
};

function Carousel() {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const { currency, symbol } = useContext(appContext);

  const fetchData = async () => {
    const data = await fetch(TrendingCoins(currency)).then(res => res.json());

    setTrendingCoins(data);
  };
  useEffect(() => {
    fetchData();
  }, [currency]);

  const items = trendingCoins.map(coin => (
    <Link
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "#fff",
      }}
      href={`/coin/${coin.id}`}
      key={coin.id}
    >
      <img src={coin.image} alt={coin.name} style={{ height: "80px" }} />
      <Stack mt={2} direction="row" spacing={1}>
        <Typography>{coin.symbol}</Typography>
        <Typography
          fontWeight={600}
          sx={{
            color: coin.price_change_percentage_24h >= 0 ? "green" : "red",
          }}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </Typography>
      </Stack>

      <Typography mt={1} fontWeight={"bold"} variant={"h5"}>
        {formateToCurrency(coin.current_price.toFixed(2), currency)}
      </Typography>
    </Link>
  ));

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    960: {
      items: 6,
    },
  };

  return (
    <Box
      sx={{
        height: "50%",
        width: "100%",
        marginTop: "40px",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </Box>
  );
}

export default Carousel;
