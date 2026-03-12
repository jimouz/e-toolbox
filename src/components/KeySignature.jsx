import { Box, Typography } from "@mui/material";

export default function KeySignature({ sharps = 0, flats = 0 }) {
    const sharpSymbol = "♯";
    const flatSymbol = "♭";

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Key Signature
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-end", fontFamily: "Bravura Text, serif", letterSpacing: "2px" }}>
                <Typography
                    sx= {{
                        fontSize: 70,
                        mr: 1.5,
                        mt: 4,
                        opacity: 0.6,
                    }}
                >
                    𝄞
                </Typography>
                <Typography sx={{fontSize: 50, mt: 2, opacity: 0.6}}>
                    <span>
                        {sharps > 0 && sharpSymbol.repeat(sharps)}
                        {flats > 0 && flatSymbol.repeat(flats)}
                    </span>
                </Typography>
            </Box>
        </Box>
    );
}