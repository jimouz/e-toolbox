import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

export default function ToolCard({ icon, title, description, to }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const Icon = icon;

    return (
        <Card
            elevation={0}
            sx={{
                maxWidth: 600,
                width: "100%",
                mx: "auto",
                borderRadius: 2,
                backdropFilter: "blur(12px)",
                background: isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.04)",
                transition: "0.25s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    background: isDark
                        ? "rgba(255, 255, 255, 0.10)"
                        : "rgba(0, 0, 0, 0.06)",
                },
            }}
        >
            <CardActionArea component={RouterLink} to={to}>
                <CardContent sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 1,
                            display: "flex",
                            alignItems: "center"
                        }
                    }>
                        {icon && <Icon sx={{ fontSize: 36, opacity: 0.5, mr: 1 }} />} {title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
