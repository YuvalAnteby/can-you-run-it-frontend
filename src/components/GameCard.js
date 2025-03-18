import React from 'react';
import {useNavigate} from "react-router-dom";
import {Box, Card, CardMedia, Typography} from "@mui/material";

const GameCard = ({game}) => {

    const navigate = useNavigate();

    return (
        <Card sx={{
            width: { xs: '110px', sm: '150px', md: '190px' },
            height: 'auto',  // Auto height to ensure it adjusts with content
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'scale(1.05)',
            },
        }}
        onClick={() => navigate('/')}> {/* TODO set destination */}
            <CardMedia
                component="img"
                alt={game.name}
                image={`${game.portrait_url}.jpg`}//TODO add a placeholder image
                title={game.name}
                sx={{
                    padding: 0,
                    margin: 0,
                    objectFit: 'cover',
                    width: '100%',
                    height: 'auto', // Ensure the image adjusts properly
                }}/>

            <Box sx={{
                padding: '0px',
                margin: 0,
                display: 'flex',
                justifyContent: 'center',
            }}>

                <Typography variant="h6" align="center" sx={{
                    margin: 0,
                    padding: '2px',
                    fontWeight: 'bold',
                    fontSize: { xs: '14px', sm: '16px', md: '18px' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {game.name}
                </Typography>
            </Box>
        </Card>
    );

};

export default GameCard;