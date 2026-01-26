import { Grid } from "@mui/material";
import ToolCard from "./ToolCard";

export default function ToolCardList() {

    const tools = [
        {
            title: "Cable Resistance Calculator",
            description: "Compute conductor resistance based on length, material, temperature and cross‑section.",
            to: "/cable-resistance",
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mt: 2, justifyContent: "center" }}>
            {tools.map((tool, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <ToolCard
                        title={tool.title}
                        description={tool.description}
                        to={tool.to}
                    />
                </Grid>
            ))}
        </Grid>
    );
}