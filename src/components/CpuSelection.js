import React, {useEffect, useState} from 'react';
import {Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import axios from "axios";


const CpuSelection = ({cpuBrand, setCpuBrand, cpuModel, setCpuModel}) => {

    const cpuCompanies = ['Intel', 'AMD']; // Placeholder data for CPU companies TODO fetch from DB instead
    // State for search results (to display suggestions if needed later)
    const [searchQuery, setSearchQuery] = useState([]);
    // Debounced query to reduce API calls
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce logic to delay the API call until the user stops typing
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedQuery(cpuModel);  // Use cpuModelQuery here
            console.log(debounceTimeout);
        }, 500); // Delay in milliseconds (adjust as needed)
        return () => clearTimeout(debounceTimeout);
    }, [cpuModel]);  // Use cpuModelQuery as the dependency

    // Fetch CPU models whenever a brand is selected
    useEffect(() => {
        if (cpuBrand) {
            const BASE_URL = "http://localhost:8000/api";
            const fetchCpuModels = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/hardware/cpus/brand?brand=${cpuBrand}`);
                    const modelNames = response.data.map((cpu) => cpu.model);
                    setSearchQuery(modelNames); // Assuming API returns an array of models
                    console.log(`Fetched CPU Models for ${cpuBrand}:`, response.data); // Log fetched CPU models
                } catch (error) {
                    console.error("Error fetching CPU models:", error);
                }
            };

            fetchCpuModels();
        }
    }, [cpuBrand]);

    // Fetch CPUs by model when the debounced query changes
    useEffect(() => {
        if (debouncedQuery) {
            const BASE_URL = "http://localhost:8000/api";
            const fetchCpusByModel = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/hardware/cpus/model?model=${debouncedQuery}`);
                    console.log("Search Results:", response.data); // Handle or display search results
                } catch (error) {
                    console.error("Error searching CPUs by model:", error);
                }
            };

            fetchCpusByModel();
        }
    }, [debouncedQuery]);


    return (
        //TODO fix centering horizontally
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            {/* CPU brand */}
            <FormControl fullWidth variant="filled" margin="normal">
                <InputLabel>CPU Company</InputLabel>

                <Select
                    value={cpuBrand}
                    // Update the selected company
                    onChange={(e) => setCpuBrand(e.target.value)}
                    label="CPU Company">
                    {cpuCompanies.map((company) => (
                        <MenuItem key={company} value={company}>
                            {company}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* CPU model */}
            <Autocomplete
                disablePortal
                disabled={!cpuBrand} // Disable input until a company is selected
                options={searchQuery}
                getOptionLabel={(option) => option}
                value={cpuModel}

                renderInput={(params) => (
                    <TextField {...params}
                               label="Search CPU Model"
                               variant="filled"
                               fullWidth
                               onChange={(e) => setCpuModel(e.target.value)}/>
                )}
                onChange={(event, newValue) => setCpuModel(newValue || '')}
                label={!cpuBrand ? "Select a CPU company first" : "Search CPU Model (e.g., Ryzen 3600)"}
                variant="filled"
                fullWidth
                margin="normal"
            />
        </div>
    )
}
export default CpuSelection;
