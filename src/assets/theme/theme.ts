import { createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const unknownColor = grey[700];

// Primary colors
export const golden = "#FAC864";
export const passion = "#FF8484";
export const dart = "#5E6FDB";
export const python = "#55A398";
export const tiger = "#FFB37C";
export const black = "#000000";
export const white = "#ffffff";

// Shade colors
export const goldenShade = "#FFE598";
export const passionShade = "#FFB5B5";
export const dartShade = "#B0B8ED";
export const pythonShade = "#BDDCD8";
export const tigerShade = "#FFDBC0";
export const lightGray = "#C4C4C4";
export const backgroundGray = "#fbfbfb";
export const dividerGrey = "#d9d9d9";
export const iconGrey = "#37352F";

// Menu colors
export const selected = "#272D3D";

// Graph colors
export const graphColors = [tiger, python, golden, dart];
export const lineGraphColors = [dart, golden, tiger, python];

// Note! If the theme colors change, the color placeholder in ../pkg/emailprovider/ must be manually updated

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: black,
      light: white,
      dark: black,
    },
    secondary: {
      main: white,
      light: white,
      dark: black,
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
    body1: {
      fontSize: "0.85rem",
    },
    body2: {
      fontSize: "0.80rem",
    },
    h1: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h2: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h4: {
      fontFamily: ["Roboto"].join(","),
    },
    h5: {
      fontFamily: ["Roboto"].join(","),
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: ["Roboto"].join(","),
      padding: 0.5,
      fontSize: "1rem",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        boxShadow: "none",
      },
      outlinedSecondary: {
        borderColor: black,
        boxSizing: "border-box",
        color: black,
        "&:hover": {
          borderColor: black,
        },
        backgroundColor: white,
      },
      containedPrimary: {
        backgroundColor: black,
        color: white,
        "&:hover": {
          backgroundColor: black,
          boxShadow: "none",
        },
        "&:disabled": {
          backgroundColor: lightGray,
        },
        boxShadow: "none",
      },
      contained: {
        backgroundColor: black,
        color: white,
        "&:hover": {
          backgroundColor: black,
          boxShadow: "none",
        },
        "&:disabled": {
          backgroundColor: lightGray,
        },
        boxShadow: "none",
      },
      containedSecondary: {
        backgroundColor: white,
        color: black,
        "&:hover": {
          backgroundColor: white,
          boxShadow: "none",
        },
        "&:disabled": {
          backgroundColor: lightGray,
        },
        boxShadow: "none",
      },
    },
    MuiCheckbox: {
      root: {
        color: black,
      },
    },
    MuiRadio: {
      colorSecondary: {
        "&$checked": {
          color: black,
        },
      },
    },
  },
});

export default theme;
