import React, { forwardRef } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { generateFretboard } from "../utils/fretboard";

const Fretboard = forwardRef(function Fretboard(
    { tuning = [], frets = 12, highlightNotes = [], root = null, renderNote },
    ref
) {
    const theme = useTheme();
    const fretboard = generateFretboard(tuning, frets);

    return (
        <Box
            ref={ref}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                p: 1,
                background: theme.palette.background.paper,
                borderRadius: "8px",
                border: `1px solid ${theme.palette.divider}`,
                overflowX: "auto",
                whiteSpace: "nowrap",
            }}
        >
        {fretboard.map((string, sIndex) => (
            <Box
                key={sIndex}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexShrink: 0,
                }}
            >
            {string.positions.map((pos) => {
                const isRoot = pos.note === root;
                const isHighlighted = highlightNotes.includes(pos.note);

                return (
                    <Box
                        key={pos.fret}
                        sx={{
                            width: { xs: "19px", sm: "52px", md: "60px" },
                            height: { xs: "26px", sm: "30px", md: "32px" },
                            border: `1px solid ${theme.palette.divider}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.palette.text.primary,
                            fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" },
                            userSelect: "none",
                            background: theme.palette.background.default,
                            flexShrink: 0,
                            ...(isHighlighted && {
                                background: theme.palette.secondary.main,
                                color: theme.palette.getContrastText(
                                    theme.palette.secondary.main
                                ),
                                fontWeight: "bold",
                            }),
                            ...(isRoot && {
                                background: theme.palette.primary.main,
                                color: theme.palette.getContrastText(
                                    theme.palette.primary.main
                                ),
                                fontWeight: "bold",
                            }),
                        }}
                    >
                        {renderNote ? renderNote(pos) : pos.note}
                    </Box>
                );
            })}
            </Box>
        ))}
        </Box>
    );
});

export default Fretboard;