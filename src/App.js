import React, {useState, useEffect} from 'react';
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import axios from "axios";

export default function CpuSearch() {
    // State to store the selected input by the user.
    const [selectedBrand, setSelectedBrand] = useState('');
    const [cpuModelQuery, setCpuModel] = useState('');
    // Placeholder data for CPU companies TODO in the future, fetch from DB
    const cpuCompanies = ['Intel', 'AMD'];
    // State for search results (to display suggestions if needed later)
    const [searchQuery, setSearchQuery] = useState([]);
    // Debounced query to reduce API calls
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce logic to delay the API call until the user stops typing
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setDebouncedQuery(cpuModelQuery);  // Use cpuModelQuery here
            console.log(debounceTimeout);
        }, 500); // Delay in milliseconds (adjust as needed)
        return () => clearTimeout(debounceTimeout);
    }, [cpuModelQuery]);  // Use cpuModelQuery as the dependency

    // Fetch CPU models whenever a brand is selected
    useEffect(() => {
        if (selectedBrand) {
            const BASE_URL = "http://localhost:8000/api";
            const fetchCpuModels = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/hardware/cpus/brand?brand=${selectedBrand}`);
                    setCpuModel(response.data); // Assuming API returns an array of models
                    console.log(`Fetched CPU Models for ${selectedBrand}:`, response.data); // Log fetched CPU models
                } catch (error) {
                    console.error("Error fetching CPU models:", error);
                }
            };

            fetchCpuModels();
        }
    }, [selectedBrand]);

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

        <>
            {/* Main header */}
            <div className="MainHeading">
                <h1>Enter your setup info</h1>
            </div>

            {/* Dropdown for CPU brand */}
            <FormControl fullWidth variant="filled" margin="normal">
                <InputLabel>CPU Company</InputLabel>
                <Select
                    value={selectedBrand}
                    // Update the selected company
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    label="CPU Company">
                    {cpuCompanies.map((company) => (
                        <MenuItem key={company} value={company}>
                            {company}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* TextField for CPU model search */}
            <TextField
                label={!selectedBrand ? "Select a CPU company first" : "Search CPU Model (e.g., Ryzen 3600)"}
                variant="filled"
                value={cpuModelQuery}
                onChange={(e) => setCpuModel(e.target.value)} // Update cpuModelQuery directly
                fullWidth
                margin="normal"
                // Disable input until a company is selected
                disabled={!selectedBrand}
            />
        </>
    );
}
