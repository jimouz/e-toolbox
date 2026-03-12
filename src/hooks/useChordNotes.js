export function useChordNotes(scale, degree, chordType) {
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
    // Fix enharmonic bug F -> F#
    if (scale[0] === "C#" && root === "B#" && chordType.includes("♭5")) {
        notes[2] = "F#";
    };

    return notes;
};

function flat(note) {
    if (note.includes("#")) {
        return note.replace("#", "");
    }
    return note;
};