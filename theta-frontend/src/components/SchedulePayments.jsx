import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SchedulePayments() {
    const [gasPredictions, setGasPredictions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [timeFrameSelected, setTimeFrameSelected] = useState(false);

    useEffect(() => {
        fetchGasPredictions();
    }, []);

    const fetchGasPredictions = async () => {
        try {
            const response = await axios.get('https://theta-wallet-app.onrender.com/api/gas-price/predict');
            setGasPredictions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching gas predictions:', error);
            setLoading(false);
        }
    };

    // ... (keep the chartOptions and prepareChartData functions as they are)

    const handleTimeFrameSelection = (event) => {
        setScheduledTime(event.target.value);
        setTimeFrameSelected(true);
    };

    const handleSchedulePayment = () => {
        console.log('Scheduling payment:', { recipient, amount, category, scheduledTime });
        // Reset form fields
        setRecipient('');
        setAmount('');
        setCategory('');
        setScheduledTime('');
        setTimeFrameSelected(false);
    };

    return (
        <Paper elevation={3} sx={{ /* keep the existing styles */ }}>
            <Typography variant="h5" gutterBottom sx={{ /* keep the existing styles */ }}>
                Schedule Payments
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ height: 300, mb: 3 }}>
                            <Line options={chartOptions} data={prepareChartData(gasPredictions)} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'text.secondary' }}>Select Time Frame</InputLabel>
                            <Select
                                value={scheduledTime}
                                label="Select Time Frame"
                                onChange={handleTimeFrameSelection}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(42, 184, 230, 0.2)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(42, 184, 230, 0.5)' },
                                    '& .MuiSelect-icon': { color: 'text.secondary' },
                                }}
                            >
                                {gasPredictions && Object.keys(gasPredictions.predictions).map((time) => (
                                    <MenuItem key={time} value={time}>
                                        {time} - {gasPredictions.predictions[time].toFixed(2)} GWEI
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {timeFrameSelected && (
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Recipient Address"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    fullWidth
                                    sx={{ /* keep the existing styles */ }}
                                />
                                <TextField
                                    label="Amount (TFUEL)"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    fullWidth
                                    sx={{ /* keep the existing styles */ }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
                                    <Select
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                        sx={{ /* keep the existing styles */ }}
                                    >
                                        <MenuItem value="private">Private</MenuItem>
                                        <MenuItem value="transfer">Transfer</MenuItem>
                                        <MenuItem value="investment">Investment</MenuItem>
                                        <MenuItem value="expense">Expense</MenuItem>
                                        <MenuItem value="income">Income</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button
                                    onClick={handleSchedulePayment}
                                    sx={{ /* keep the existing styles */ }}
                                >
                                    Schedule Payment
                                </Button>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            )}
        </Paper>
    );
}

export default SchedulePayments;