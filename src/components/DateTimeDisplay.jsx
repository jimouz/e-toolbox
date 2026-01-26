import { useEffect, useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";

export default function DateTimeDisplay() {
    const [now, setNow] = useState(new Date());

    const isMobile = useMediaQuery("(max-width:600px)");

    useEffect(() => {
        const timer = setInterval(() => {
        setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Ώρα με seconds
    const timeFormat = now.toLocaleString("el-GR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    // Ημερομηνία
    const dateFormat = now.toLocaleString("el-GR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    return (
        <Typography
        variant="body2"
        sx={{
            mr: 2,
            fontWeight: 500,
            whiteSpace: "nowrap",
        }}
        >
            {isMobile
                ? timeFormat
                : `${timeFormat} - ${dateFormat}`}
        </Typography>
    );
}