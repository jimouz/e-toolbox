import { Typography, Box } from "@mui/material";

export default function ModesList({ scale, modes }) {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Modes
            </Typography>
            {modes.map((mode, i) => (
                <Typography key={mode.name}
                    sx={{
                        opacity: 0.6,
                        letterSpacing: "0.8px",
                    }}
                >
                    <strong>{scale[i]}</strong>: {mode.name}
                </Typography>
            ))}
        </Box>
    )
}