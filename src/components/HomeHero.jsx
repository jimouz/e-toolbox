import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

const slideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(12px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export default function HomeHero() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box
            sx={{
                maxWidth: 600,
                width: "100%",
                mx: "auto",
                mt: 4,
                mb: 6,
                p: { xs: 3, sm: 4 },
                textAlign: "center",
                borderRadius: 3,
                backdropFilter: "blur(14px)",
                background: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.03)",
                animation: `${slideUp} 0.6s ease-out`,
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    mb: 1,
                }}
            >
                e‑toolbox
            </Typography>

            <Box
                sx={{
                    width: 120,
                    height: 3,
                    mx: "auto",
                    mb: 2,
                    borderRadius: 2,
                    background: isDark
                        ? "linear-gradient(90deg, #ffffff33, #ffffff88)"
                        : "linear-gradient(90deg, #00000022, #00000066)",
                }}
            />

            <Typography
                variant="h6"
                sx={{
                    opacity: 0.75,
                    fontWeight: 400,
                    maxWidth: 520,
                    mx: "auto",
                }}
            >
                Engineering tools designed for clarity, precision and speed.
            </Typography>
        </Box>
    );
}