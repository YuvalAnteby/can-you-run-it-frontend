import React, {useState} from 'react';
import CpuSelection from '../components/CpuSelection';
import GpuSelection from '../components/GpuSelection';
import {Button} from "@mui/material";


const SetupFill = () => {
    const [cpuBrand, setCpuBrand] = useState(''); // Track selected CPU brand
    const [cpuModel, setCpuModel] = useState(''); // Track selected CPU model

    const [gpuBrand, setGpuBrand] = useState(''); // Track selected GPU brand
    const [gpuModel, setGpuModel] = useState(''); // Track selected GPU model

    const [showGpuSelection, setShowGpuSelection] = useState(false); // Track if GPU selection should be shown
    const [showRamSelection, setShowRamSelection] = useState(false); // Track if GPU selection should be shown

    const handleContinueToGpu = () => {
        if (cpuModel) {
            setShowGpuSelection(true);
        }
    };

    const handleContinueToRam = () => {
        if (gpuBrand && cpuModel) {
            setShowRamSelection(true);
        }
    };

    return (
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
            <h2 style={{marginBottom: '5px'}}>Let's find your CPU</h2>
            <div
                style={{
                    width: '60%', // Ensure the CpuSelection takes up 60% of the container's width
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <CpuSelection
                    cpuBrand={cpuBrand}
                    setCpuBrand={setCpuBrand}
                    cpuModel={cpuModel}
                    setCpuModel={setCpuModel}/>

                <Button
                    variant="contained"
                    sx={{ margin: '10px' }}
                    onClick={handleContinueToGpu}
                    disabled={!cpuModel}>
                    Continue to pick your GPU
                </Button>
            </div>

            {showGpuSelection && cpuModel && (
                <div
                    style={{
                        width: '60%', // Ensure the GpuSelection takes up 60% of the container's width
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <h2 style={{marginBottom: '5px'}}>Now let's find your GPU</h2>
                    <GpuSelection
                        gpuBrand={gpuBrand}
                        setGpuBrand={setGpuBrand}
                        gpuModel={gpuModel}
                        setGpuModel={setGpuModel}/>
                </div>
            )}

            {showRamSelection && cpuModel && gpuModel && (
                
            )}
        </div>
    );
}
export default SetupFill;