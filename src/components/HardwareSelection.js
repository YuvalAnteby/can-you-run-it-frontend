import React, {useEffect, useState} from 'react';
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import axios from "axios";

// TODO add feature to search from all CPUs, with filter button to filter using company/socket etc
const HardwareSelection = ({type, brand, setBrand, model, setModel}) => {

    const isCPU = type === "CPU";
    const companies = isCPU ? ["Intel", "AMD"] : ["Nvidia", "AMD", "Intel"];
    const [models, setModels] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    // State for search results (to display suggestions if needed later)
    const [searchQuery, setSearchQuery] = useState([]);

    /**
     * Debounces the user input to reduce API calls when searching for GPU/CPU models.
     * Updates `debouncedQuery` after a delay of 500ms.
     */
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedQuery(model);  // Use gpuModelQuery here
            console.log(debounceTimeout);
        }, 500); // Delay in milliseconds (adjust as needed)
        return () => clearTimeout(debounceTimeout);
    }, [model]);  // Use gpuModelQuery as the dependency

    /**
     * Fetches GPUs/CPUs models when a brand is selected.
     * Makes an API call to retrieve available models for the chosen GPU brand.
     */
    useEffect(() => {
        if (brand) {
            const BRANDS_URL = `http://localhost:8000/api/hardware/${type.toLowerCase()}s/brand?brand=${brand}`;
            //const BRANDS_URL = `http://172.16.26.200:8000/api/hardware/${type.toLowerCase()}s/brand?brand=${brand}`;
            const fetchModels = async () => {
                try {
                    const response = await axios.get(BRANDS_URL);
                    const modelNames = response.data.map((data) => data.model);
                    setSearchQuery(modelNames); // Assuming API returns an array of models
                    setModel("");
                    console.log(`Fetched ${type} Models for ${brand}:`, response.data); // Log fetched GPU models
                } catch (error) {
                    console.error(`Error fetching ${type} models:`, error);
                }
            };

            fetchModels();
        }
    }, [brand]);

    /**
     * Fetches GPUs/CPUs by model when the debounced query changes.
     * Used for search-based retrieval of GPU details.
     */
    useEffect(() => {
        if (debouncedQuery) {
            const BASE_URL = `http://localhost:8000/api/hardware/${type.toLowerCase()}s/model?model=`;
            const fetchByModel = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}${debouncedQuery}`);
                    console.log(`${type} Search Results:`, response.data); // Handle or display search results
                } catch (error) {
                    console.error(`Error searching ${type} by model:`, error);
                }
            };

            fetchByModel();
        }
    }, [debouncedQuery]);


    return (
        <div
            style={{
                marginTop: '0px',
                display: "flex",
                flexDirection: 'column',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {/* GPU/CPU brand */}
            <FormControl fullWidth variant="filled" margin="normal"
                         style={{padding:'0px', marginTop: '10px'}}>

                <InputLabel>{type} Company</InputLabel>
                <Select
                    sx={{textAlign: "left"}}
                    value={brand}
                    // Update the selected company
                    onChange={(e) => {
                        setBrand(e.target.value);
                        setModel("");
                    }}
                    label={`${type} Company`}>
                    {companies.map((company) => (
                        <MenuItem key={company} value={company}>{company}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* GPU model */}
            <Autocomplete
                disablePortal
                disabled={!brand} // Disable input until a company is selected
                options={searchQuery}
                getOptionLabel={(option) => option}
                value={model}

                renderInput={(params) => (
                    <TextField {...params}
                               label={`Search ${type} Model`}
                               variant="filled"
                               fullWidth
                               onChange={(e) => setModel(e.target.value)}/>
                )}
                onChange={(event, newValue) => setModel(newValue || '')}
                //label={!brand ? "Select a GPU company first" : "Search GPU Model (e.g., RTX 4090)"}
                variant="filled"
                fullWidth
                //margin="normal"
            />
        </div>
    )
}
export default HardwareSelection;