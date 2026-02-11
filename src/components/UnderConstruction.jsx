import { useState } from "react";
import { Box, Container, Paper, Typography, Stack } from "@mui/material";
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

export default function UnderConstruction() {

    return (
        <Box
            sx={{
                disply: "flex",
                flexDirection: "column",
                mt: 10,
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
    );
}