export const Notes = [
    "C", "C#", "Db",
    "D", "D#", "Eb",
    "E",
    "F", "F#", "Gb",
    "G", "G#", "Ab",
    "A", "A#", "Bb",
    "B"
];

export const Modes = [
    { name: "Ionian (Major)", pattern: [2, 2, 1, 2, 2, 2, 1] },
    { name: "Dorian",         pattern: [2, 1, 2, 2, 2, 1, 2] },
    { name: "Phrygian",       pattern: [1, 2, 2, 2, 1, 2, 2] },
    { name: "Lydian",         pattern: [2, 2, 2, 1, 2, 2, 1] },
    { name: "Mixolydian",     pattern: [2, 2, 1, 2, 2, 1, 2] },
    { name: "Aeolian (Minor)",pattern: [2, 1, 2, 2, 1, 2, 2] },
    { name: "Locrian",        pattern: [1, 2, 2, 1, 2, 2, 2] }
];

export const MajorScales = {
    C:  ["C", "D", "E", "F", "G", "A", "B"],
    G:  ["G", "A", "B", "C", "D", "E", "F#"],
    D:  ["D", "E", "F#", "G", "A", "B", "C#"],
    A:  ["A", "B", "C#", "D", "E", "F#", "G#"],
    E:  ["E", "F#", "G#", "A", "B", "C#", "D#"],
    B:  ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    "C#": ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
    F:  ["F", "G", "A", "Bb", "C", "D", "E"],
    Bb: ["Bb", "C", "D", "Eb", "F", "G", "A"],
    Eb: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    Ab: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
    Db: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
    Gb: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
    Cb: ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
};

export const SeventhChordTypes = [
    "Maj7",   // I
    "m7",     // II
    "m7",     // III
    "Maj7",   // IV
    "7",      // V
    "m7",     // VI
    "m7♭5"    // VII
];
