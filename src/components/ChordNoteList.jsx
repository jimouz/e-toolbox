import { Typography, Box } from "@mui/material";

export default function ChordNoteList({ chordNotes }) {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Chord Notes
            </Typography>
            {chordNotes.map((notes, i) => (
                <Typography key={i} sx={{ opacity: 0.6 }}>
                    : {notes.join(" – ")}
                </Typography>
            ))}
        </Box>        
    );
}