import ToolCardList from "../components/ToolCardList.jsx";
import HomeHero from "../components/HomeHero";
import { Container, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container 
            maxWidth="md"
            sx={(theme) => ({
                my: 4,
                minHeight: "78vh",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            })}
        >
            <HomeHero />

            <Typography
                variant="h5"
                sx={{
                    my: 2,
                    letterSpacing: "1px",
                    opacity: 0.8,
                    textAlign: "center",
                }}
            >
                Tools
            </Typography>
            <ToolCardList />
        </Container>
    );
}
