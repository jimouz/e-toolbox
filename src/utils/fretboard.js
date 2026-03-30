import { Chromatic } from "../data/Notes";

// Find note at fret
export function getNoteAtFret(openNote, fret) {
    const startIndex = Chromatic.indexOf(openNote);
    const index = (startIndex + fret) % Chromatic.length;
    return Chromatic[index];
}

// Create fretboard
export function generateFretboard(tuning, frets = 20) {
    return tuning.map((openNote, stringIndex) => {
        const positions = [];

        for (let fret = 0; fret <= frets; fret++) {
        positions.push({
            string: stringIndex + 1,
            fret,
            note: getNoteAtFret(openNote, fret),
        });
        }

        return {
            string: stringIndex + 1,
            open: openNote,
            positions,
        };
    });
}