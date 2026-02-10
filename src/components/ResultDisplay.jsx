import { Box, Paper, Typography, Divider, Button, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

export default function ResultDisplay({ result }) {
    const isEmpty = !result || typeof result === "string";
    const [history, setHistory] = useState([]);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [showHistory, setShowHistory] = useState(false);

    const valuesStyles = {
        px: 1,
        fontWeight: 600,
        opacity: 0.6,
        letterSpacing: 0.8,
    };

    useEffect(() => {
        if (!result || typeof result === "string") return;
        setHistory(prev => {
            const updated = [result, ...prev];
            return updated.slice(0, 4);
        });
    }, [result]);

    return (
        <Paper
            sx={{
                p: 2,
                mt: 2,
                borderRadius: 2,
                bgcolor: theme =>
                    theme.palette.mode === "dark" ? "grey.900" : "grey.50",
            }}
        >
            {/* CURRENT RESULT */}
            <Box sx={{ mb: isMobile ? 2 : 0 }}>
                {isEmpty ? (
                    <Typography sx={{ opacity: 0.5 }}>
                        Results will appear here
                    </Typography>
                ) : (
                    <>
                        <Box sx={{ display: "flex" }}>
                            Length:
                            <Typography sx={valuesStyles}>{result.length} m</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            Cross-section:
                            <Typography sx={valuesStyles}>{result.area} mm²</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            Material:
                            <Typography sx={valuesStyles}>
                                {result.material === "copper" ? "Copper" : "Aluminum"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            Temperature:
                            <Typography sx={valuesStyles}>
                                {result.usedTemp ? `${result.temperature} °C` : "20 °C (fixed)"}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            Single conductor:
                            <Typography sx={valuesStyles}>{result.single} Ω</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            Total loop:
                            <Typography sx={valuesStyles}>{result.total} Ω</Typography>
                        </Box>
                    </>
                )}
            </Box>

            {/* DESKTOP HISTORY (right side) */}
            {!isMobile && history.length > 0 && (
                <Box
                    sx={{
                        mt: 1,
                        borderTop: "1px solid",
                        borderColor: "divider",
                        pt: 2,
                    }}
                >
                    <Typography variant="subtitle2" sx={{ opacity: 0.6, mb: 1 }}>
                        Last {history.length} results
                    </Typography>

                    {history.map((item, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                            <Typography sx={{ fontSize: 13, opacity: 0.6 }}>
                                {item.length}m • {item.area}mm²
                            </Typography>

                            <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                                {item.usedTemp ? `${item.temperature}°C` : "20°C"} •{" "}
                                {item.material === "copper" ? "Cu" : "Al"}
                            </Typography>

                            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                {item.total} Ω
                            </Typography>

                            {index < history.length - 1 && (
                                <Divider sx={{ my: 0.8, opacity: 0.25 }} />
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {/* MOBILE COLLAPSIBLE HISTORY */}
            {isMobile && history.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setShowHistory(prev => !prev)}
                        sx={{ mb: 1, minWidth: 140}}
                    >
                        {showHistory ? "Hide history" : "Show history"}
                    </Button>

                    {showHistory && (
                        <Box sx={{ mt: 1 }}>
                            {history.map((item, index) => (
                                <Box key={index} sx={{ mb: 1 }}>
                                    <Typography sx={{ fontSize: 13, opacity: 0.6 }}>
                                        {item.length}m • {item.area}mm²
                                    </Typography>

                                    <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
                                        {item.usedTemp ? `${item.temperature}°C` : "20°C"} •{" "}
                                        {item.material === "copper" ? "Cu" : "Al"}
                                    </Typography>

                                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                                        {item.total} Ω
                                    </Typography>

                                    {index < history.length - 1 && (
                                        <Divider sx={{ my: 0.8, opacity: 0.25 }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Paper>
    );
}
