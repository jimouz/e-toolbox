import ToolCardList from "../components/ToolCardList.jsx";
import HomeHero from "../components/HomeHero";
import { Container } from "@mui/material";

export default function Home() {
    return (
        <Container maxWidth="md" sx={{ my: 4, minHeight: "78vh" }}>
            <HomeHero />
            <ToolCardList />
        </Container>
    );
}
