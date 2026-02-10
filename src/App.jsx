import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "./theme/theme.jsx";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import Navbar from "./components/NavBar.jsx";
import CableResistance from "./pages/CableR.jsx";
import MusicTools from "./pages/MusicTools.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const [mode, setMode] = useState("dark");
    const theme = mode === "dark" ? darkTheme : lightTheme;

    const handleToggle = () => {
        setMode(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar mode={mode} onToggle={handleToggle} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cable-resistance" element={<CableResistance />} />
                <Route path="/music-tool" element={<MusicTools />} />
            </Routes>
            <Footer />
        </ThemeProvider>
    );
}

export default App;