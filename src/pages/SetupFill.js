import React, {useState} from 'react';
import {Button} from "@mui/material";
import RamSelection from "../components/RamSelection";
import HardwareSelection from "../components/HardwareSelection";


const SetupFill = () => {
    const [cpuBrand, setCpuBrand] = useState(''); // Track selected CPU brand
    const [cpuModel, setCpuModel] = useState(''); // Track selected CPU model

    const [gpuBrand, setGpuBrand] = useState(''); // Track selected GPU brand
    const [gpuModel, setGpuModel] = useState(''); // Track selected GPU model

    const [ramAmount, setRamAmount] = useState('');

    const [showGpuSelection, setShowGpuSelection] = useState(false); // Track if GPU selection should be shown
    const [showRamSelection, setShowRamSelection] = useState(false); // Track if GPU selection should be shown
    const [moveToGames, setMoveToGames] = useState(false); // Track if GPU selection should be shown

    const handleContinueToGames = () => {
        if (gpuModel && cpuModel && ramAmount) {
            setMoveToGames(true);
        } else {
            setMoveToGames(false);
        }
        console.log();
    }

    const handleContinueToGpu = () => {
        if (cpuModel) {
            setShowGpuSelection(true);
        } else {
            setShowGpuSelection(false);
        }
    };

    const handleContinueToRam = () => {
        if (gpuBrand && cpuModel) {
            setShowRamSelection(true);
        } else {
            setShowRamSelection(false);
        }
    };

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
            <h2 style={{marginBottom: '5px'}}>Let's find your CPU</h2>
            {/* CPU div */}
            <div
                style={{
                    width: '60%', // Ensure the CpuSelection takes up 60% of the container's width
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HardwareSelection type="CPU"
                                   brand={cpuBrand}
                                   setBrand={setCpuBrand}
                                   model={cpuModel}
                                   setModel={setCpuModel}
                onChange={handleContinueToGpu}/>

                <Button
                    variant="contained"
                    sx={{margin: '10px'}}
                    onClick={handleContinueToGpu}
                    disabled={!cpuModel}>
                    Continue to pick your GPU
                </Button>
            </div>
            {/* GPU div */}
            {showGpuSelection && /*cpuModel && */(
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <h2 style={{marginBottom: '0px'}}>Now let's find your GPU</h2>
                    <div
                        style={{
                            width: '60%', // Ensure the CpuSelection takes up 60% of the container's width
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <HardwareSelection type="GPU"
                                           brand={gpuBrand}
                                           setBrand={setGpuBrand}
                                           model={gpuModel}
                                           setModel={setGpuModel}/>
                        <Button
                            variant="contained"
                            sx={{margin: '10px'}}
                            onClick={handleContinueToRam}
                            disabled={!gpuModel || !cpuModel}>
                            Continue to pick your RAM amount
                        </Button>
                    </div>
                </div>
            )}
            {/* RAM div */}
            {/* showRamSelection */ showGpuSelection && cpuModel && /* gpuModel && */ (
                <div
                    style={{
                        height: '100vh',
                        width: '100%', // Ensure the GPU Selection takes up 60% of the container's width
                        display: 'flex',
                        marginTop: '0px',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <RamSelection style={{
                        marginTop: '0px',
                    }} ramAmount={ramAmount} setRamAmount={setRamAmount}/>

                    <Button
                        variant="contained"
                        sx={{margin: '10px'}}
                        onClick={handleContinueToGames}
                        disabled={!ramAmount && !cpuModel && !cpuModel}>
                        Continue to games
                    </Button>
                </div>
            )}

        </div>
    );
}
export default SetupFill;