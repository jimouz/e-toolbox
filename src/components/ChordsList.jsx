import { Typography, Box } from "@mui/material";

export default function ChordsList({ chords }) {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Chords
            </Typography>

            {chords.map((chord, i) => (
                <Typography
                    key={i}
                    sx={{
                        opacity: 0.6,
                        letterSpacing: "1.6px"
                    }}
                >
                    {chord}
                </Typography>
            ))}
        </Box>
    );
}