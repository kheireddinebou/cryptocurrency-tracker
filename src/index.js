import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContext from "./AppContext";
import { theme } from "./AppTheme";
import 'react-alice-carousel/lib/alice-carousel.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContext>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AppContext>
);
