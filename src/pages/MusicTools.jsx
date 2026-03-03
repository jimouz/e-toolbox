import { useState } from "react";
import { Box, Button, Container, Paper, Typography, Stack, MenuItem, TextField } from "@mui/material";
import { Notes, Modes, MajorScales, SeventhChordTypes } from "../data/Notes";
import { generatePDF } from "../components/generatePDF";
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
};

function flat(note) {
    if (note.includes("#")) {
        return note.replace("#", "");
    }
    return note;
};

const pStyles = {
    p: { xs: "4px", sm: "8px", md: "16px" }
};

export default function MusicTools() {

    const [root, setRoot] = useState("");
    const scale = root ? MajorScales[root] : [];
    
    const handleExport = async () => {
        const data = {
            root,
            scale,
            modes: Modes.map((m, i) => ({ degree: scale[i], name: m.name })),
            chords: scale.map((note, i) => note + SeventhChordTypes[i]),
            chordNotes: scale.map((note, i) =>
                useChordNotes(scale, i, SeventhChordTypes[i])
            )
        };

        const pdfBytes = await generatePDF(data);
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${root}-scale.pdf`;
        a.click();
    };

    return (
        <Container
            sx={{
                maxWidth: {xs: "360px", sm: "600px", md: "800px"},
                minHeight: "80vh",
                mt: 4,
                mx: "auto",
                ...pStyles,
            }}
        >
            <Paper sx={{ ...pStyles, }}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                    Music Tools
                </Typography>
                {/* <UnderConstruction /> */}
                <Stack sx={{ ...pStyles, my: 2, }}>
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
                            ...pStyles,
                            my: 2,
                            borderRadius: 2,
                            bgcolor: theme =>
                                theme.palette.mode === "dark" ? "grey.900" : "grey.50",
                        }}
                    >
                        {/* Major Scale Notes */}
                        <Box>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                {root} Major Scale
                            </Typography>
                            <Typography sx={{ opacity: 0.7 }}>
                                {scale.join(" – ")}
                            </Typography>
                        </Box>

                        {/* Modes, Chords, Chord Notes Box container */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: { xs: 1, sm: 4 }
                            }}
                        >
                            {/* Modes Results */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Modes
                                </Typography>
                                {Modes.map((mode, i) => (
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

                            {/* Chords Results */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Chords
                                </Typography>
                                {scale.map((note, i) => (
                                    <Typography key={note + "-7th"} 
                                        sx={{
                                            opacity: 0.6,
                                            letterSpacing: "1.6px"
                                        }}
                                    >
                                        <strong>{note}</strong>{SeventhChordTypes[i]}
                                    </Typography>
                                ))}
                            </Box>

                            {/* Chord Notes Results */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                    Chord Notes
                                </Typography>
                                {scale.map((note, i) => {
                                    const chordType = SeventhChordTypes[i];
                                    const chordNotes = useChordNotes(scale, i, chordType);
                                    return (
                                        <Typography key={note + "-notes"}
                                            sx={{ opacity: 0.6 }}
                                        >
                                            : {chordNotes.join(" – ")}
                                        </Typography>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Paper>
                )}
                <Button
                    variant="contained"
                    onClick={handleExport}
                    disabled={!root}
                    sx={{
                        opacity: !root ? 0.4 : 1,
                        pointerEvents: !root ? "none" : "auto",
                        transition: "opacity 0.2s ease"
                    }}
                >
                    Export PDF
                </Button>
            </Paper>
        </Container>
    );
}