import React, { useContext } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Link,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { appContext } from "../AppContext";

function Header() {
  const { currency, setCurrency } = useContext(appContext);

  return (
    <AppBar color="transparent" position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/">
            <Typography variant="h5" fontWeight={600}>
              Crypto Hunter
            </Typography>
          </Link>

          <Select value={currency} onChange={e => setCurrency(e.target.value)}>
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
