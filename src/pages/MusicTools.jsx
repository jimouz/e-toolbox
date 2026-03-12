import { useState } from "react";
import { Box, Button, Container, Paper, Typography, Stack, MenuItem, TextField } from "@mui/material";
import { Notes, Modes, MajorScales, SeventhChordTypes } from "../data/Notes";
import { containerStyles, paperStyles, pStyles } from "../styles/musicToolStyles";
import { generatePDF } from "../components/generatePDF";
import ModesList from "../components/ModesList";
import ChordsList from "../components/ChordsList";
import ChordNoteList from "../components/ChordNoteList";
import KeySignature from "../components/KeySignature";
import { keySignatureMap } from "../data/Notes";
import { useScaleData } from "../hooks/useScaleData";

// import UnderConstruction from "../components/UnderConstruction";

export default function MusicTools() {

    const [root, setRoot] = useState("");
    const scale = root ? MajorScales[root] : [];
    const { modes, chords, chordNotes } = useScaleData(root, scale);
    
    const handleExport = async () => {
        const data = {
            root,
            scale,
            modes,
            chords,
            chordNotes,
            sharps,
            flats
        };

        const pdfBytes = await generatePDF(data);
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${root}-scale.pdf`;
        a.click();
    };

    const { sharps = 0, flats = 0 } = keySignatureMap[root] || {};

    return (
        <Container sx={{...containerStyles, ...pStyles, }}>
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
                    <Paper sx={{ ...pStyles, ...paperStyles, }}>
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
                        <Box sx={{ display: "flex", gap: { xs: 2, sm: 4 }, flexDirection: {xs: "column", md: "row" } }}>
                            {/* Modes Results */}
                            <ModesList scale={scale} modes={modes} />

                            {/* Chords Results */}
                            <ChordsList scale={scale} chords={chords} />

                            {/* Chord Notes Results */}
                            <ChordNoteList chordNotes={chordNotes} />
                            {/* Key Signature Results */}
                            <KeySignature sharps={sharps} flats={flats} />
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