import React, {useEffect, useState} from 'react';
import GameCard from "../games/GameCard";
import axios from "axios";
import {Box, Stack, Typography} from "@mui/material";
import SkeletonCard from "./SkeletonCard";

const GamesShelf = ({title, fetchUrl, params, cpu, gpu, ramAmount, loading}) => {

    const [games, setGames] = useState([]);


    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api" + fetchUrl, {params});
                setGames(res.data);
            } catch (error) {
                console.error(`Failed to fetch games for ${title}`, error);
            }
        };
        if (!loading) {
            fetchGames();
        }
    }, [fetchUrl, loading, params, title]);


    return (
        <Box sx={{mb: 4}}>
            <Box sx={{display: 'inline-block'}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 0,
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    <Typography
                        variant="h5">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        onClick={() => console.log(`Browsing more from "${title}" shelf`)} // placeholder
                        sx={{cursor: 'pointer'}}>
                        BROWSE MORE
                    </Typography>
                </Box>


                <Box sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 1,
                    paddingY: 1,
                    marginY: 0,
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {display: 'none'}, // optional: hide scrollbar
                    WebkitOverflowScrolling: 'touch',
                    width: '100%', // ensures the container doesn't expand the page
                    maxWidth: '100vw', // extra safety to prevent horizontal page scroll
                }}>
                    {loading
                        ? [...Array(4)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                        : games.map((game) => (
                            <Box
                                key={game.id}
                                sx={{ width: { xs: '100%', sm: '48%', md: '23%' }, mb: 2 }}
                            >
                                <GameCard game={game} cpu={cpu} gpu={gpu} ramAmount={ramAmount} />
                            </Box>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default GamesShelf;