import { Box, Typography, useTheme } from "@mui/material";
import { getKeySignatureImage } from "../utils/keySignatureImage";


export default function KeySignature({ root }) {
    const theme = useTheme();
    const img = getKeySignatureImage(root);
    const filter = theme.palette.mode == "dark" ? "brightness(0) invert(1)" : "none";

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Key Signature
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                {img && (
                    <img
                        src={img}
                        alt={`${root} key signature`}
                        style={{ height: 60, opacity: 0.7, filter }}
                    />
                )}
            </Box>
        </Box>
    );
}
