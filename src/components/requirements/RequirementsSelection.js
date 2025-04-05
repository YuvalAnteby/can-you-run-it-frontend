import React, {useEffect} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import FpsSlider from "../hardware/FpsSlider";

const RequirementsSelection = ({game, resolution, setResolution, setting, setSetting, fps, setFps}) => {


    useEffect(() => {
        console.log('Game:', game);
    }, [game]);

    return (
        <Box sx={{ padding: '20px' }}>
            <FormControl fullWidth variant="filled" margin="normal"
                         style={{padding: '0px', marginTop: '10px'}}>

                <InputLabel>Resolution</InputLabel>
                <Select
                    sx={{textAlign: "left"}}
                    value={resolution}
                    // Update the selected company
                    onChange={(e) => {
                        setResolution(e.target.value);
                    }}
                    label={`Resolution`}>
                    {game.available_resolutions.map((resolution) => (
                        <MenuItem key={resolution} value={resolution}>{resolution}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth variant="filled" margin="normal"
                         style={{padding: '0px', marginTop: '10px'}}>

                <InputLabel>Graphic level</InputLabel>
                <Select
                    sx={{textAlign: "left"}}
                    value={setting}
                    // Update the selected company
                    onChange={(e) => {
                        setSetting(e.target.value);
                    }}
                    label={`Graphic level`}>
                    {game.supported_settings.map((setting_name) => (
                        <MenuItem key={setting_name} value={setting_name}>{setting_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FpsSlider minFps={0} maxFps={240} fps={fps} setFps={setFps}/>
        </Box>
    )

}
export default RequirementsSelection;