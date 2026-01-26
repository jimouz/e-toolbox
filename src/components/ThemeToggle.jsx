import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

export default function ThemeToggle({ mode, onToggle }) {
    const [rotating, setRotating] = useState(false);
    const handleClick = () => {
        setRotating(true);
        onToggle();

        setTimeout(() => setRotating(false), 300);
    };
    return (
        <IconButton
        onClick={handleClick}
        color="inherit"
        sx={{
            transition: "transform 0.3s ease",
            transform: rotating ? "rotate(180deg)" : "rotate(0deg)",
        }}
        >
        {mode === "dark" ? (
            <LightModeIcon sx={{ transition: "opacity 0.3s ease" }} />
        ) : (
            <DarkModeIcon sx={{ transition: "opacity 0.3s ease" }} />
        )}
        </IconButton>
    );
}
