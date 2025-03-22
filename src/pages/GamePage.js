import React from "react";
import {useLocation} from "react-router-dom";
import {Typography, Box} from "@mui/material";
import GameBanner from "../components/GameBanner";

const GamePage = () => {
    const location = useLocation();
    console.log("Location State:", location.state); // Debugging line
    const {game, cpu, gpu, ramAmount} = location.state || {};

    if (!game) {
        return <Typography variant="h4">Game not found</Typography>;
    }

    return (
        <Box sx={{padding: 3, width: "100%", height: "100%", paddingTop: '60px',}}>
            <GameBanner game={game}/>

            <Box sx={{marginTop: 2}}>
                <Typography variant="h5">Your Hardware:</Typography>
                <Typography>CPU: {cpu.model}</Typography>
                <Typography>GPU: {gpu.model}</Typography>
                <Typography>RAM: {ramAmount} GB</Typography>
            </Box>
        </Box>
    );
};

export default GamePage;
