import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat"
    },
  },
  palette: {
    background: {
      default: "#14161a",
    },
    mode: "dark",
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        sx: {
          color: "gold",
        },
        underline: "none",
      },
    },
  },
});
