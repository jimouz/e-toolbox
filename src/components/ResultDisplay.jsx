import { Box, Paper, Typography } from "@mui/material";

export default function ResultDisplay({ single, total, empty }) {
    
    const resultStyles = {
        px: 1,
        fontWeight: 600,
        opacity: 0.6,
        letterSpacing: 0.8,
    }

    return (
        <Paper
            sx={{
                p: 2,
                mt: 2,
                minHeight: 90,
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
                    <Box sx={{display: "flex"}}>
                        Single conductor : <Typography sx={resultStyles}> {single} Ω</Typography>
                    </Box>
                    <Box sx={{display: "flex"}}>
                        Total loop : <Typography sx={resultStyles}> {total} Ω</Typography>
                    </Box>
                </>
            )}
        </Paper>
    );
}