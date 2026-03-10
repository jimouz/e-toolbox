import { Modes, SeventhChordTypes } from "../data/Notes";
import { useChordNotes } from "./useChordNotes";

export function useScaleData(root, scale) {
    return {
        modes: Modes.map((m, i) => ({ degree: scale[i], name: m.name })),
        chords: scale.map((note, i) => note + SeventhChordTypes[i]),
        chordNotes: scale.map((_, i) =>
            useChordNotes(scale, i, SeventhChordTypes[i])
        )
    };
}