import { useState } from "react";
import { Box, Container, Paper, Typography, Stack, MenuItem, TextField } from "@mui/material";
import { Notes, Modes, MajorScales, SeventhChordTypes } from "../data/Notes";
// import UnderConstruction from "../components/UnderConstruction";

function useChordNotes(scale, degree, chordType) {
    if (!scale || scale.length !== 7) return [];

    const root = scale[degree];
    const third = scale[(degree + 2) % 7];
    const fifth = scale[(degree + 4) % 7];
    const seventh = scale[(degree + 6) % 7];

    let notes = [root, third, fifth, seventh];

    // Apply alterations
    if (chordType.includes("♭3")) notes[1] = flat(notes[1]);
    if (chordType.includes("♭5")) notes[2] = flat(notes[2]);
    if (chordType.includes("♭7")) notes[3] = flat(notes[3]);

    return notes;
}
function flat(note) {
    // if (note.includes("#")) return note.replace("#", "");
    // if (!note.includes("b")) return note + "b";

    if (note.includes("#")) {
        return note.replace("#", "");
    }

    return note;
}
export default function MusicTools() {
    const [root, setRoot] = useState("");
    const scale = root ? MajorScales[root] : [];

    return (
        <Container
            sx={{
                minHeight: "80vh",
                mt: 4, mx: "auto",
                p: { xs: "4px", sm: "8px", md: "16px" },
                maxWidth: {xs: "360px", sm: "600px", md: "800px"}
            }}
        >
            <Paper sx={{ p: { xs: "4px", sm: "8px", md: 4 }, }}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                    Music Tools
                </Typography>
                {/* <UnderConstruction /> */}
                <Stack
                    sx={{
                        p: { xs: "4px", sm: "8px", md: "16px" },
                    }}
                >
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
                            p: { xs: "4px", sm: "8px", md: "16px" },
                            mt: 2,
                            borderRadius: 2,
                            bgcolor: theme =>
                                theme.palette.mode === "dark" ? "grey.900" : "grey.50",
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                            {root} Major Scale
                        </Typography>
                        <Typography sx={{ opacity: 0.7 }}>
                            {scale.join(" – ")}
                        </Typography>
                        <Box sx={{ display: "flex", gap: { sm: 1, md: 4 }}}>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Modes
                                </Typography>

                                {Modes.map((mode, i) => (
                                    <Typography key={mode.name} sx={{ opacity: 0.6, letterSpacing: "1.2px"  }}>
                                        <strong>{scale[i]}</strong>: {mode.name}
                                    </Typography>
                                ))}
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Chords
                                </Typography>

                                {scale.map((note, i) => (
                                    <Typography key={note + "-7th"} sx={{ opacity: 0.6, letterSpacing: "1.2px" }}>
                                        <strong>{note}</strong>{SeventhChordTypes[i]}
                                    </Typography>
                                ))}
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Chord Notes
                                </Typography>

                                {scale.map((note, i) => {
                                    const chordType = SeventhChordTypes[i];
                                    const chordNotes = useChordNotes(scale, i, chordType);

                                    return (
                                        <Typography key={note + "-notes"} sx={{ opacity: 0.6 }}>
                                            : {chordNotes.join(" – ")}
                                        </Typography>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Paper>
                )}
            </Paper>
        </Container>
    );
}