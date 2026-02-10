import { useState } from "react";
import { Box, Container, Paper, Typography, Stack } from "@mui/material";
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
export default function MusicTools() {
    const [root, setRoot] = useState("");

    return (
        <Container maxWidth="md" sx={{ minHeight: "80vh", mt: 4, mx: "auto" }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2}}>
                    Music Tools
                </Typography>

                <Box
                    sx={{
                        disply: "flex",
                        flexDirection: "column",
                        mt: 7,
                        textAlign:"center",
                    }}>
                    <ConstructionRoundedIcon 
                        sx={{
                            mr: 2,
                            fontSize: "10rem",
                            color: "#fff8",
                        }}
                    />
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, color: "#fff8", }}>
                        Under Construction
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}