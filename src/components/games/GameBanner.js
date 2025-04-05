import React from 'react';
import {Box, Typography} from "@mui/material";

const GameBanner = ({game}) => {
    //TODO make additional box for cases of small screens as a column instead
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Add a subtle background color to the banner
                padding: 3,
                borderRadius: 2,  // Slightly round the corners
                boxShadow: 3,  // Add a shadow to create separation from the background
                marginBottom: 3,  // Add space below the banner
                width: '100%',
            }}>
            {/* Game Banner */}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center', // Ensures image is centered in its container
                    justifyContent: 'center',
                    maxHeight: '500px',
                }}>
                    <picture
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                        <source media="(max-width: 600px)" srcSet={`${game.landscape_s}.jpg`}/>
                        <source media="(max-width: 1024px)" srcSet={`${game.landscape_s}.jpg`}/>
                        <source media="(min-width: 1025px)" srcSet={`${game.landscape_m}.jpg`}/>
                        <img
                            src={game.landscape_xl}
                            alt={game.name}
                            style={{
                                width: 'auto',
                                height: '100%',
                                objectFit: 'cover',
                                maxHeight: '500px',
                                borderRadius: '8px'
                            }}
                        />
                    </picture>
                </Box>
                {/* Game text */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '20px',
                    flex: 1,  // Allow text to take up the remaining space
                    color: 'white',  // Make the text stand out on dark background
                }}>
                    <Typography variant="h3" sx={{marginBottom: 2, fontWeight: "bold", fontSize: { xs: '2rem', md: '3rem' }}}>
                        {game.name}
                    </Typography>

                    <Typography variant="h5" sx={{marginBottom: 1, fontWeight: "bold", fontSize: { xs: '1.2rem', md: '1.5rem' }}}>
                        Developer: {game.developer}
                    </Typography>

                    <Typography variant="h5" sx={{marginBottom: 1, fontWeight: "bold", fontSize: { xs: '1.2rem', md: '1.5rem' }}}>
                        Publisher: {game.publisher}
                    </Typography>

                    <Typography sx={{marginTop: 3, fontSize: { xs: '1rem', md: '1.2rem' }}} variant="h6">
                        {game.desc}
                    </Typography>

                    <Typography sx={{marginTop: 3, fontSize: { xs: '1rem', md: '1.2rem' }}} variant="h6">Genres:</Typography>
                    <ul style={{marginTop: 0}}>
                        {game.genres.map((genre, index) => (
                            <li key={index}>
                                <Typography variant="body1" sx={{fontSize: { xs: '0.9rem', md: '1rem' }}}>{genre}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            </div>
        </Box>
    )
}
export default GameBanner;