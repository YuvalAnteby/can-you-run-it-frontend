import React from 'react';
import {Button} from "@mui/material";
import { useLocation } from "react-router-dom";


const Games = () => {
    const location = useLocation();
    const { gpuModel, cpuModel, ramAmount } = location.state || {};

    return (
        /* Main div */
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
            <p>GPU: {gpuModel}</p>
            <p>CPU: {cpuModel}</p>
            <p>RAM: {ramAmount}</p>
        </div>
    );
}
export default Games;