import { useState } from "react";
import { Box, Container, Paper, Typography, Stack, MenuItem, TextField } from "@mui/material";
import { Notes, Modes, MajorScales, SeventhChordTypes } from "../data/Notes";
// import UnderConstruction from "../components/UnderConstruction";

export default function MusicTools() {
    const [root, setRoot] = useState("");
    const scale = root ? MajorScales[root] : [];

    return (
        <Container maxWidth="md" sx={{ minHeight: "80vh", mt: 4, mx: "auto" }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2}}>
                    Music Tools
                </Typography>
                {/* <UnderConstruction /> */}
               <Stack>
                    <TextField
                        select
                        id="root"
                        label="Root Note"
                        value={root}
                        onChange={(e) => setRoot(e.target.value)}
                        fullWidth
                    >
                        {Notes.map((note) => (
                            <MenuItem key={note} value={note}>
                                {note}
                            </MenuItem>
                        ))}
                    </TextField>

               </Stack>
                    {root && (
                        <Paper
                            sx={{
                                p: 2,
                                mt: 2,
                                borderRadius: 2,
                                bgcolor: theme =>
                                    theme.palette.mode === "dark" ? "grey.900" : "grey.50",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                {root} Major Scale:
                            </Typography>

                            <Typography sx={{ opacity: 0.7 }}>
                                {scale.join(" – ")}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2}}>

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                        Modes:
                                    </Typography>

                                    {Modes.map((mode, i) => (
                                        <Typography key={mode.name} sx={{ opacity: 0.6, letterSpacing: "1.2px"  }}>
                                            <strong>{scale[i]}</strong>: {mode.name}
                                        </Typography>
                                    ))}
                                </Box>

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                        Chords:
                                    </Typography>

                                    {scale.map((note, i) => (
                                        <Typography key={note + "-7th"} sx={{ opacity: 0.6, letterSpacing: "1.2px" }}>
                                            <strong>{note}</strong>{SeventhChordTypes[i]}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    )}
            </Paper>
        </Container>
    );
}