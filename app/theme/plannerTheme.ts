import { createTheme } from "@mui/material/styles";

export const plannerTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#B99AE8",
      light: "#D8C5F2",
      dark: "#9877CE",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#EFB6C9",
      light: "#F7D5E0",
      dark: "#D996AF",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#A9D7C7",
      light: "#D6EEE5",
      dark: "#7FBAA5",
    },

    info: {
      main: "#B8D8F1",
      light: "#DDECF8",
      dark: "#8CBBD9",
    },

    warning: {
      main: "#F1D59A",
      light: "#F8EBC9",
      dark: "#D5B96F",
    },

    background: {
      default: "#FBF9FC",
      paper: "rgba(255,255,255,0.62)",
    },

    text: {
      primary: "#393542",
      secondary: "#817A89",
    },

    divider: "rgba(102, 88, 115, 0.10)",
  },

  typography: {
    fontFamily:
      'sans-serif',

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.035em",
    },

    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },

    h3: {
      fontWeight: 750,
      letterSpacing: "-0.025em",
    },

    h4: {
      fontWeight: 750,
      letterSpacing: "-0.02em",
    },

    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 18,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          minHeight: 42,
          borderRadius: 16,
          paddingLeft: 18,
          paddingRight: 18,
          transition:
            "background-color 180ms ease, border-color 180ms ease, transform 180ms ease",

          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          transition:
            "background-color 180ms ease, transform 180ms ease",

          "&:active": {
            transform: "scale(0.96)",
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 24,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },

      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 16,
            backgroundColor: "rgba(255,255,255,0.56)",

            "& fieldset": {
              borderColor: "rgba(120, 104, 132, 0.12)",
            },

            "&:hover fieldset": {
              borderColor: "rgba(185,154,232,0.45)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#B99AE8",
              borderWidth: 1,
            },
          },
        },
      },
    },
  },
});
