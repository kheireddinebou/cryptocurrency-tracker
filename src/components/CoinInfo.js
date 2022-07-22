import React, { useState, useEffect, useContext } from "react";
import { appContext } from "../AppContext";
import { HistoricalChart } from "../config/api";
import { Box, CircularProgress, Stack } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = useContext(appContext);

  const fetchData = async () => {
    const data = await fetch(HistoricalChart(coin.id, days, currency)).then(
      res => res.json()
    );

    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchData();
  }, [days, currency]);

  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
          font: {
            size: 18,
          },
        },
        grid: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 18,
          },
        },
      },
    },
  };

  const data = {
    labels: historicalData.map(coin => {
      let date = new Date(coin[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price (Past ${days} Days) in ${currency}`,
        data: historicalData.map(price => price[1]),
        borderColor: "gold",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: "30px",
      }}
    >
      {!historicalData ? (
        <CircularProgress
          size={100}
          sx={{ color: "gold", marginTop: { md: "260px" } }}
        />
      ) : (
        <>
          <Line data={data} options={options} />
          <Box
            mt={3}
            width={"100%"}
            display={"flex"}
            justifyContent={"space-around"}
          >
            {chartDays.map(day => (
              <button
                onClick={e => setDays(e.target.value)}
                key={day.value}
                value={day.value}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid gold",
                  color: "#fff",
                  fontFamily: "Montserrat",
                  padding: "10px",
                  fontSize: "18px",
                  width: "22%",
                  borderRadius: "10px",
                }}
              >
                {day.label}
              </button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default CoinInfo;
