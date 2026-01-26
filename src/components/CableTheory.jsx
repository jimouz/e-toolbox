import { Paper, Typography, Stack, Link } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTheme } from "@mui/material/styles";

export default function CableTheory() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                mt: 4,
                mb: 2,
                borderRadius: 2,
                backdropFilter: "blur(12px)",
                background: isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.04)",
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h6">📐 Theory Behind Cable Resistance</Typography>
                <Typography variant="body1">
                The electrical resistance of a conductor is calculated using the formula:
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    R = ρ · (L / A)
                </Typography>
                <Typography variant="body1">
                    Where:
                    <br />• <strong>R</strong> = resistance (Ω)
                    <br />• <strong>ρ</strong> = resistivity of the material (Ω·mm²/m)
                    <br />• <strong>L</strong> = length of the conductor (m)
                    <br />• <strong>A</strong> = cross-sectional area (mm²)
                </Typography>
                <Typography variant="body1">
                    The resistivity ρ increases with temperature, following:
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    ρ<sub>T</sub> = ρ<sub>20</sub> · [1 + α · (T − 20)]
                </Typography>
                <Typography variant="body1">
                    Where α is the temperature coefficient:
                    <br />• Copper: 0.00393
                    <br />• Aluminum: 0.00403
                </Typography>
            </Stack>
            <Stack spacing={1} sx={{ mt: 2, mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Sources:
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LinkIcon fontSize="small" sx={{ opacity: 0.6 }} />
                    <Link
                    href="https://webstore.iec.ch/publication/634"
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    >
                    IEC 60228 – Conductors of Insulated Cables
                    </Link>
                    <OpenInNewIcon fontSize="small" sx={{ opacity: 0.6 }} />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LinkIcon fontSize="small" sx={{ opacity: 0.6 }} />
                    <Link
                    href="https://ocw.mit.edu/courses/6-007-electromagnetic-energy-from-motors-to-lasers-spring-2011/resources/mit6_007s11_chap02/"
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    >
                    MIT OpenCourseWare – Resistivity & Temperature Dependence
                    </Link>
                    <OpenInNewIcon fontSize="small" sx={{ opacity: 0.6 }} />
                </Stack>
            </Stack>
        </Paper>
    );
}
