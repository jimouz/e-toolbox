import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Tunings, InstrumentLabels } from "../data/instruments";
import { useTheme } from "@mui/material/styles";

export default function InstrumentSelector({ instrument, setInstrument }) {
    const theme = useTheme();

    return (
        <ButtonGroup
            variant="contained"
            sx={{
                mb: 2,
                background: theme.palette.background.paper,
                borderRadius: "8px",
                p: "2px",
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",

            }}
        >
            {Object.keys(Tunings).map((key) => (
                <Button
                    key={key}
                    onClick={() => setInstrument(key)}
                    sx={{
                        fontSize: {xs: "0.6rem", sm: "0.9rem"},
                        textTransform: "none",
                        fontWeight: instrument === key ? 700 : 400,
                        backgroundColor:
                            instrument === key
                                ? theme.palette.primary.main
                                : theme.palette.background.default,
                        color:
                            instrument === key
                                ? theme.palette.getContrastText(theme.palette.primary.main)
                                : theme.palette.text.primary,
                            "&:hover": {
                                backgroundColor:
                                    instrument === key
                                    ? theme.palette.primary.dark
                                    : theme.palette.action.hover,
                            },
                    }}
                >
                    {InstrumentLabels[key]}
                </Button>
            ))}
        </ButtonGroup>
    );
}