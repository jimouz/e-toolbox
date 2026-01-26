import { Box, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                pb: 2,
                textAlign: "center",
                borderTop: '1px solid rgba(255,255,255,0.08)',
                opacity: 0.6,
                fontSize: "0.85rem",
                userSelect: "none",
                color: 'text.secondary',
            }}
        >
            <Typography variant="body2" sx={{ opacity: 0.6, textAlign: "center", mt: 6 }}>
                © {new Date().getFullYear()} e‑toolbox — Engineering Tools
                <br />
                Developed by{" "}
                <Link
                    href="https://jimouz.github.io/portfolio/"
                    target="_blank"
                    rel="noopener"
                    underline="none"
                    sx={{
                        fontWeight: 500,
                        cursor: "pointer",
                        textDecoration: "none",
                        color:
                        theme.palette.mode === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.primary.dark,
                        "&:hover": {
                        color: theme.palette.primary.main,
                        },
                    }}
                >
                    Dimitris Ouzounis
                </Link>

            </Typography>
        </Box>
    );
}