import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import GameCard from "../components/GameCard";
import axios from "axios";
import {Box, Stack} from "@mui/material";


const Games = () => {
    const location = useLocation();
    const { cpu, gpu, ramAmount } = location.state || {};
    const [games, setGames] = useState([]); // All games from API
    const [searchQuery, setSearchQuery] = useState(""); // Search input
    const [filteredGames, setFilteredGames] = useState([]); // Games matching search
    const [debouncedQuery, setDebouncedQuery] = useState(""); // Delayed search

    // Debounce input to reduce API calls
    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                //const ALL_GAMES = `http://172.16.26.200:8000/api/games`
                const ALL_GAMES = `http://localhost:8000/api/games`
                const response = await axios.get(ALL_GAMES)
                setGames(response.data);
                setFilteredGames(response.data);
                console.log(cpu, gpu, ramAmount);
                //console.log(`Fetched games:`, response.data); // Log fetched GPU models
            } catch (e) {
                console.log(`Error fetching games: `, e);
            }
        }
        fetchGames();
    }, []);

    // Filter games by name when search input changes
    useEffect(() => {
        if (!debouncedQuery) {
            setFilteredGames(games);
        } else {
            const filtered = games.filter((game) =>
                game.name.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
            setFilteredGames(filtered);
        }
    }, [debouncedQuery, games]);


    return (
        /* Main div */
            <Box sx={{ padding: '20px' }}>
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {games.map((game) => (
                        <Box key={game.id} sx={{ width: { xs: '100%', sm: '48%', md: '23%' }, marginBottom: 2 }}>
                            <GameCard game={game} cpu={cpu} gpu={gpu} ramAmount={ramAmount} />
                        </Box>
                    ))}
                </Stack>
            </Box>
    );
};

export default Games;