import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Stack,
    Button,
    FormControlLabel,
    Switch,
    // useMediaQuery
} from "@mui/material";
import { useState } from "react";
import ResultDisplay from "../components/ResultDisplay.jsx";
import CableTheory from "../components/CableTheory.jsx";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

export default function CableResistance() {
    const [length, setLength] = useState("");
    const [area, setArea] = useState("");
    const [temperature, setTemperature] = useState(20);
    const [useTemperature, setUseTemperature] = useState(true);
    const [material, setMaterial] = useState("copper");
    const [result, setResult] = useState(null);

    const temperatures = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
    const areas = [
        0.5, 0.75, 1, 1.5, 2.5, 4, 6, 10, 16,
        25, 35, 50, 70, 95, 120, 150, 185, 240
    ];
    const handleReset = () => {
        setLength("");
        setArea("");
        setMaterial("copper");
        setTemperature(20);
        setUseTemperature(true);
        setResult(null);
    };
    const handleCalculate = () => {
        const len = Number(length);
        const areaVal = Number(area);

        if (!len || len < 0.1) {
            setResult("Length must be at least 0.1 m");
            return;
        }
        if (!areaVal) {
            setResult("Please select a cable cross-section");
            return;
        }

        const rho20 = material === "copper" ? 0.017241 : 0.028264;
        const alpha = material === "copper" ? 0.00393 : 0.00403;

        const rhoT = useTemperature
            ? rho20 * (1 + alpha * (temperature - 20))
            : rho20;

        const R = rhoT * (len / areaVal);
        const R_total = R * 2;

        const newResult = {
            single: R.toFixed(6),
            total: R_total.toFixed(6),
            rho: rhoT.toFixed(6),
            usedTemp: useTemperature,
            temperature: temperature,
            length: len,
            area: areaVal,
            material: material

        };
        setResult(newResult);
        setLength("");
        setArea("");
        setMaterial("copper");
        setTemperature(20);
        setUseTemperature(true);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Cable Resistance
                </Typography>

                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Length (m)"
                        type="number"
                        value={length}
                        onChange={e => {
                            const val = Number(e.target.value);
                            if (val >= 0) setLength(e.target.value);
                        }}
                        inputProps={{ min: 0.5, step: 0.5 }}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Cross-sectional area (mm²)"
                        value={area}
                        onChange={e => setArea(e.target.value)}
                        fullWidth
                    >
                        {areas.map(a => (
                            <MenuItem key={a} value={a}>
                                {a} mm²
                            </MenuItem>
                        ))}
                    </TextField>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={useTemperature}
                                onChange={() => setUseTemperature(prev => !prev)}
                            />
                        }
                        label="Use temperature in calculation"
                    />

                    <TextField
                        select
                        label="Temperature (°C)"
                        value={temperature}
                        onChange={e => setTemperature(Number(e.target.value))}
                        fullWidth
                        disabled={!useTemperature}
                    >
                        {temperatures.map(t => (
                            <MenuItem key={t} value={t}>
                                {t} °C
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Material"
                        value={material}
                        onChange={e => setMaterial(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="copper">Copper</MenuItem>
                        <MenuItem value="aluminum">Aluminum</MenuItem>
                    </TextField>

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleCalculate}>
                            Calculate
                        </Button>

                        <Button variant="outlined" color="error" onClick={handleReset}>
                            Clear
                        </Button>
                    </Stack>
                    
                     {/*Error - Resistivity info  */}
                    <Box
                        sx={{
                            minHeight: 32,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 1,
                        }}
                    >
                        {typeof result === "string" && (
                            <>
                                <ErrorOutlineIcon color="error" fontSize="small" />
                                <Typography variant="body2" color="error">
                                    {result}
                                </Typography>
                            </>
                        )}
                        {result && typeof result === "object" && (
                            <>
                                <ElectricalServicesIcon
                                    sx={{ opacity: 0.7 }}
                                    fontSize="small"
                                />
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                    ρ at {result.usedTemp ? `${result.temperature}°C` : "20°C"}: {result.rho} Ω·mm²/m
                                </Typography>
                            </>
                        )}
                    </Box>

                    {/* ResultDisplay ALWAYS visible */}
                    <ResultDisplay result={result} />
                </Stack>
            </Paper>
            <Paper sx={{ p: 4, my: 2}}>
                <CableTheory />
            </Paper>
        </Container>
    );
}