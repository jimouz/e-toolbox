import { Paper, Typography } from "@mui/material";

export default function ResultDisplay({ single, total, empty }) {
    return (
        <Paper
            sx={{
                p: 2,
                mt: 2,
                minHeight: 90, // σταθερό ύψος
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {empty ? (
                <Typography sx={{ opacity: 0.5 }}>
                    Results will appear here
                </Typography>
            ) : (
                <>
                    <Typography>Single conductor: {single} Ω</Typography>
                    <Typography>Total loop: {total} Ω</Typography>
                </>
            )}
        </Paper>
    );
}