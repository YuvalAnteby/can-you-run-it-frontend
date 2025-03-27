import React from 'react';
import {Box, Slider, Typography} from "@mui/material";

const FpsSlider = ({minFps, maxFps, fps, setFps}) => {
console.log(fps)
    return (
        <Box sx={{ padding: "10px" }}>
            <Typography variant="body1">Select Target FPS:</Typography>
            <Slider
                value={fps}
                min={minFps}
                max={maxFps}
                step={1}
                onChange={(e, newValue) => setFps(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} FPS`}/>
        </Box>
    )
}
export default FpsSlider;