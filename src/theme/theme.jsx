import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
    palette: {
            mode: "light",
            primary: {
            main: "#1976d2",
        },
            secondary: {
            main: "#9c27b0",
        },
            background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: '#000000',
            secondary: '#0f0f0f',
        },
    },
    typography: {
        fontFamily: "Inter, Roboto, sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
            secondary: {
            main: "#ce93d8",
        },
            background: {
            default: "#0d1117",
            paper: "#161b22",
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    },
    typography: {
        fontFamily: "Inter, Roboto, sans-serif",
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
    },
});