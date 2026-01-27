import { useEffect, useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";

export default function DateTimeDisplay() {
    const [now, setNow] = useState(new Date());

    const isMobile = useMediaQuery("(max-width:600px)");
    const dateTimeSX = (theme) => ({
        mr: 2,
        fontWeight: 600,
        letterSpacing: "1px",
        textShadow:
            theme.palette.mode === "dark" ? "0 0 4px rgba(255,255,255,0.15)" : "none",
        whiteSpace: "nowrap",
        opacity: theme.palette.mode === "dark" ? 0.9 : 0.7,
    });
    useEffect(() => {
        const timer = setInterval(() => {
        setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Time section
    const timeFormat = now.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // Date section
    const dateFormat = now.toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <Typography
            variant="body2"
            sx= { dateTimeSX }>
            {isMobile
                ? timeFormat : `${timeFormat} - ${dateFormat}`}
        </Typography>
    );
}