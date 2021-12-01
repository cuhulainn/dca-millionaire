import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
//https://bareynol.github.io/mui-theme-creator/
let theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#85bb65",
    },
  },
  typography: {
    fontFamily: "Jura",
    h1: {
      fontFamily: "Jura",
    },
    h2: {
      fontFamily: "Jura",
    },
    h3: {
      fontFamily: "Jura",
    },
    h4: {
      fontFamily: "Jura",
    },
    h6: {
      fontFamily: "Jura",
    },
    h5: {
      fontFamily: "Jura",
    },
    subtitle1: {
      fontFamily: "Jura",
    },
    subtitle2: {
      fontFamily: "Jura",
    },
    button: {
      fontFamily: "Jura",
      fontWeight: 900,
    },
    overline: {
      fontFamily: "Jura",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
