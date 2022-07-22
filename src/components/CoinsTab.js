import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Link,
  Stack,
  Container,
  Typography,
  TextField,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Pagination,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import { appContext } from "../AppContext";
import { CoinList } from "../config/api";
import { styled } from "@mui/system";
import { formateToCurrency } from "./Carousel";

function CoinsTab() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency } = useContext(appContext);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch(CoinList(currency)).then(res => res.json());

    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [currency]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = () => {
    return coins.filter(
      coin =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 3, mb: 5 }}>
      <Typography variant="h4">Crypto Currency Prices by Market Cap</Typography>
      <TextField
        label="Search for a currency..."
        color="secondary"
        sx={{
          marginTop: 3,
          color: "#fff",
          width: "100%",
          "& label.Mui-focused": {
            color: "gold",
          },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "gold",
            },
            "&:hover fieldset": {
              borderColor: "gold",
            },
            "&.Mui-focused fieldset": {
              borderColor: "gold",
            },
          },
        }}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading ? (
        <LinearProgress sx={{ backgroundColor: "gold", marginTop: 5 }} />
      ) : (
        <TableContainer
          sx={{
            marginTop: 1,
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#EEBC1D",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{ color: "#000", fontWeight: 600, fontSize: 18 }}
                >
                  Coin
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: 600, fontSize: 18 }}
                  align="right"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: 600, fontSize: 18 }}
                  align="right"
                >
                  24h change
                </TableCell>
                <TableCell
                  sx={{ color: "#000", fontWeight: 600, fontSize: 18 }}
                  align="right"
                >
                  Market Cap
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map(row => (
                  <TableRow
                    onClick={() => navigate(`coin/${row.id}`)}
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "#16171a",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#13111",
                        transition: "0.3s all ease-in-out",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img src={row.image} alt={row.name} height={50} />
                        <Stack sx={{ marginLeft: 2, textAlign: "center" }}>
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </Stack>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <span style={{ fontSize: 22 }}>
                        {formateToCurrency(row.current_price, currency)}
                      </span>
                    </TableCell>

                    <TableCell align="right">
                      <span
                        fontWeight={600}
                        style={{
                          color:
                            row.price_change_percentage_24h >= 0
                              ? "green"
                              : "red",

                          fontSize: 18,
                          fontWeight: 500,
                        }}
                      >
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span style={{ fontSize: 22 }}>
                        {formateToCurrency(row.market_cap, currency)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination
        count={10}
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3,
          width: "100%",
          "& .Mui-selected": {
            color: "gold",
          },
        }}
        onChange={(e, value) => {
          setPage(value);
          window.scroll(0,450);
        }}
      />
    </Container>
  );
}

export default CoinsTab;
