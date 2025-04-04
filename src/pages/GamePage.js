import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Typography, Box} from "@mui/material";
import GameBanner from "../components/games/GameBanner";
import RequirementsSelection from "../components/RequirementsSelection";
import axios from "axios";

const GamePage = () => {
    const location = useLocation();
    //console.log("Location State:", location.state); // Debugging line
    const {game, cpu, gpu, ramAmount} = location.state || {};
    const [chosenResolution, setResolution] = useState('');
    const [chosenSetting, setSetting] = useState('');
    const [chosenFps, setFps] = useState(null);
    const [fetchedFps, setFetchedFps] = useState(null); ///TODO remove on release
    const [isFpsMet, setIsFpsMet] = useState(null);


    useEffect(() => {
        //console.log("Game:", game.id);
        //console.log("CPU:", cpu.id);
        //console.log("GPU:", gpu.id);
        //console.log("RAM Amount:", ramAmount);
        const URL = `http://localhost:8000/api/req/game-requirements/`
            + `?game_id=${game.id.trim()}`
            + `&cpu_id=${cpu.id.trim()}`
            + `&gpu_id=${gpu.id.trim()}`
            + `&ram=${ramAmount}`
            + `&resolution=${chosenResolution}`
            + `&setting_name=${chosenSetting}`
            + `&${chosenFps ? `&fps=${chosenFps}` : ''}` // Keeping the option to have no FPS chosen or choosing FPS
        const fetchPerformances = async () => {
            try {
                const response = await axios.get(URL);
                const receivedFps = response.data.fps;
                setFetchedFps(receivedFps);
                // Compare fetched FPS with chosen FPS
                if (chosenFps) {
                    setIsFpsMet(receivedFps >= parseInt(chosenFps));
                }
            } catch (error) {
                console.log(`Error fetching game requirements: `, error);
            }
        };
        fetchPerformances();
    }, [chosenFps, chosenSetting, chosenResolution, game.id, cpu.id, gpu.id, ramAmount]);


    if (!game) {
        return <Typography variant="h4">Error game not found</Typography>;
    }

    return (
        <Box sx={{padding: 3, width: "100%", height: "100%", paddingTop: '60px',}}>

            <GameBanner game={game}/>

            <RequirementsSelection
                game={game}
                resolution={chosenResolution}
                setResolution={setResolution}
                setting={chosenSetting}
                setSetting={setSetting}
                fps={chosenFps}
                setFps={setFps}/>

            {/*
            <Box sx={{marginTop: 2}}>
                <Typography variant="h5">Your Hardware:</Typography>
                <Typography>CPU: {cpu.model}</Typography>
                <Typography>GPU: {gpu.model}</Typography>
                <Typography>RAM: {ramAmount} GB</Typography>
            </Box> */}
            {/* TODO remove on release */}
            {/* <Typography variant="h6">Fetched FPS:{fetchedFps !== null ? fetchedFps : "Loading..."}</Typography> */}
            {chosenFps && (
                <Typography variant="h6">
                    Your chosen FPS ({chosenFps}) is {isFpsMet ? "achievable ✅" : "not achievable ❌"}.
                </Typography>
            )}
        </Box>
    );
};

export default GamePage;
