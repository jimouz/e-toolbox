import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import DateTimeDisplay from "./DateTimeDisplay.jsx";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CableRoundedIcon from '@mui/icons-material/CableRounded';

export default function Navbar({ mode, onToggle }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => setOpen(prev => !prev);

    const menuItems = [
        { text: "Home", path: "/", icon: <HomeRoundedIcon /> },
        { text: "Cable Resistance", path: "/cable-resistance", 
            icon: <CableRoundedIcon sx={{ opacity: 0.5 }} /> },
    ];

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/* Hamburger Menu */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Brand */}
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            letterSpacing: "0.5px",
                        }}
                    >
                        e-toolbox
                    </Typography>
                    {/* Date & Time Display */}
                    <DateTimeDisplay />
                    {/* Theme Toggle */}
                    <ThemeToggle mode={mode} onToggle={onToggle} />
                </Toolbar>
            </AppBar>
            {/* Drawer Menu */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <List sx={{ width: 250 }}>
                    {menuItems.map(item => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={toggleDrawer}
                            >
                                {item.icon}
                                <ListItemText primary={item.text} sx={{ ml: 2 }}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}