import { useState, useRef  } from "react";
import domtoimage from "dom-to-image";
import { Box, Button, Container, Paper, Typography, Stack, MenuItem, TextField } from "@mui/material";
import { Notes, Modes, MajorScales, SeventhChordTypes } from "../data/Notes";
import { containerStyles, paperStyles, pStyles } from "../styles/musicToolStyles";
import { generatePDF } from "../components/generatePDF";
import ModesList from "../components/ModesList";
import ChordsList from "../components/ChordsList";
import ChordNoteList from "../components/ChordNoteList";
import KeySignature from "../components/KeySignature";
import Fretboard from "../components/Fretboard";
import InstrumentSelector from "../components/InstrumentSelector";
import { useScaleData } from "../hooks/useScaleData";
import { Tunings } from "../data/instruments";

// import UnderConstruction from "../components/UnderConstruction";

export default function MusicTools() {

    const fretboardRef = useRef(null);
    const [root, setRoot] = useState("");
    const scale = root ? MajorScales[root] : [];
    const { modes, chords, chordNotes } = useScaleData(root, scale);
    const [instrument, setInstrument] = useState("bass4");

    const handleExport = async () => {
        const fretboardNode = fretboardRef.current;
        const fretboardImage = await domtoimage.toPng(fretboardNode);

        const data = {
            root,
            scale,
            modes,
            chords,
            chordNotes,
            fretboardImage,
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
                            <Typography variant="subtitle1" sx={{ mb: 1, opacity: 0.8 }}>
                                {root} Major Scale
                            </Typography>

                            {/* Key Signature Results */}
                            <KeySignature root={root}/>
                            
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
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, opacity: 0.8 }}>
                                Fretboard Viewer
                            </Typography>
                            <InstrumentSelector
                                instrument={instrument}
                                setInstrument={setInstrument}
                            />
                            <Fretboard
                                ref={fretboardRef}
                                tuning={Tunings[instrument]}
                                highlightNotes={scale}
                                root={root}
                            />
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