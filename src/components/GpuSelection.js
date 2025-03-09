import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import axios from "axios";

const GpuSelection = ({gpuBrand, setGpuBrand, gpuModel, setGpuModel}) => {

    // Placeholder data for gpu companies TODO in the future, fetch from DB
    const gpuCompanies = ['Intel', 'AMD', 'Nvidia'];
    // State for search results (to display suggestions if needed later)
    const [searchQuery, setSearchQuery] = useState([]);
    // Debounced query to reduce API calls
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce logic to delay the API call until the user stops typing
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedQuery(gpuModel);  // Use gpuModelQuery here
            console.log(debounceTimeout);
        }, 500); // Delay in milliseconds (adjust as needed)
        return () => clearTimeout(debounceTimeout);
    }, [gpuModel]);  // Use gpuModelQuery as the dependency

    // Fetch GPU models whenever a brand is selected
    useEffect(() => {
        if (gpuBrand) {
            const BASE_URL = "http://localhost:8000/api";
            const fetchGpuModels = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/hardware/gpus/brand?brand=${gpuBrand}`);
                    const modelNames = response.data.map((gpu) => gpu.model);
                    setSearchQuery(modelNames); // Assuming API returns an array of models
                    console.log(`Fetched GPU Models for ${gpuBrand}:`, response.data); // Log fetched GPU models
                } catch (error) {
                    console.error("Error fetching GPU models:", error);
                }
            };

            fetchGpuModels();
        }
    }, [gpuBrand]);

    // Fetch GPUs by model when the debounced query changes
    useEffect(() => {
        if (debouncedQuery) {
            const BASE_URL = "http://localhost:8000/api";
            const fetchGpusByModel = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/hardware/gpus/model?model=${debouncedQuery}`);
                    console.log("Search Results:", response.data); // Handle or display search results
                } catch (error) {
                    console.error("Error searching GPUs by model:", error);
                }
            };

            fetchGpusByModel();
        }
    }, [debouncedQuery]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: 'column',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {/* GPU brand */}
            <FormControl fullWidth variant="filled" margin="normal">

                <InputLabel>GPU Company</InputLabel>
                <Select
                    value={gpuBrand}
                    // Update the selected company
                    onChange={(e) => setGpuBrand(e.target.value)}
                    label="GPU Company">
                    {gpuCompanies.map((company) => (
                        <MenuItem key={company} value={company}>
                            {company}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* GPU model */}
            <Autocomplete
                disablePortal
                disabled={!gpuBrand} // Disable input until a company is selected
                options={searchQuery}
                getOptionLabel={(option) => option}
                value={gpuModel}

                renderInput={(params) => (
                    <TextField {...params}
                               label="Search GPU Model"
                               variant="filled"
                               fullWidth
                               onChange={(e) => setGpuModel(e.target.value)}/>
                )}
                onChange={(event, newValue) => setGpuModel(newValue || '')}
                label={!gpuBrand ? "Select a GPU company first" : "Search GPU Model (e.g., RTX 4090)"}
                variant="filled"
                fullWidth
                margin="normal"/>

            <Button
                variant="contained"
                sx={{margin: '10px'}}
                /* TODO add showing the GPU selection or move this button to SetupFill */>
                Continue to pick RAM amount</Button>
        </div>
    )
}
export default GpuSelection;