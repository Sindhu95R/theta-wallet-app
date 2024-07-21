import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, CircularProgress, Fade, Snackbar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function SchedulePayments() {
    const [gasPredictions, setGasPredictions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [timeFrameSelected, setTimeFrameSelected] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const walletAddress = '0xAA32Ed0706d0eDFB73976f7af6B90B99f78FdEF3';

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
            setError('Failed to fetch gas predictions. Please try again later.');
            setLoading(false);
        }
    };

    const handleTimeFrameSelection = (event) => {
        setScheduledTime(event.target.value);
        setTimeFrameSelected(true);
    };

    const handleSchedulePayment = async () => {
        try {
            const currentDate = new Date();
            const [scheduledDate, scheduledTime] = scheduledTime.split(' ');
            const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);

            // If the scheduled time is in the past, add a day
            if (scheduledDateTime < currentDate) {
                scheduledDateTime.setDate(scheduledDateTime.getDate() + 1);
            }

            const transactionData = {
                wallet_address: walletAddress,
                sender: walletAddress, // Assuming the wallet owner is the sender
                recipient: recipient,
                gas_fee: amount,
                category: category,
                hash: `0x${Math.random().toString(36).substr(2, 34)}`, // Generate a random hash
                date: scheduledDateTime.toISOString().split('T')[0],
                time: scheduledDateTime.toTimeString().split(' ')[0],
            };

            const response = await axios.post('https://theta-wallet-app.onrender.com/api/transaction', transactionData);

            console.log('Transaction scheduled:', response.data);
            setSnackbarMessage('Payment scheduled successfully!');
            setSnackbarOpen(true);

            // Reset form fields
            setRecipient('');
            setAmount('');
            setCategory('');
            setScheduledTime('');
            setTimeFrameSelected(false);
        } catch (error) {
            console.error('Error scheduling payment:', error);
            setSnackbarMessage('Failed to schedule payment. Please try again.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress sx={{ color: '#2ab8e6' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Fade in={true} timeout={1000}>
            <Paper elevation={3} sx={{
                p: 3,
                mb: 3,
                background: 'rgba(10, 25, 41, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(42, 184, 230, 0.2)',
                boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'conic-gradient(from 0deg at 50% 50%, #2ab8e6 0deg, transparent 60deg, transparent 300deg, #00ffff 360deg)',
                    animation: 'rotate 20s linear infinite',
                    opacity: 0.1,
                },
                '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            }}>
                <Typography variant="h5" gutterBottom sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(42, 184, 230, 0.5)',
                    position: 'relative',
                    display: 'inline-block',
                    mb: 3,
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-5px',
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #2ab8e6, #00ffff)',
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    },
                }}>
                    Schedule Payments
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel sx={{ color: 'text.secondary' }}>Select Time Frame</InputLabel>
                            <Select
                                value={scheduledTime}
                                label="Select Time Frame"
                                onChange={handleTimeFrameSelection}
                                startAdornment={<AccessTimeIcon sx={{ mr: 1, color: 'secondary.main' }} />}
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(42, 184, 230, 0.2)' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(42, 184, 230, 0.5)' },
                                    '& .MuiSelect-icon': { color: 'text.secondary' },
                                }}
                            >
                                {gasPredictions && gasPredictions.predictions && Object.entries(gasPredictions.predictions).map(([time, value]) => (
                                    <MenuItem key={time} value={time}>
                                        {time} - {value.toFixed(2)} GWEI
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'rgba(42, 184, 230, 0.2)' },
                                            '&:hover fieldset': { borderColor: 'rgba(42, 184, 230, 0.5)' },
                                            '&.Mui-focused fieldset': { borderColor: '#2ab8e6' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'text.secondary' },
                                        '& .MuiInputBase-input': { color: 'white' },
                                    }}
                                />
                                <TextField
                                    label="Amount (TFUEL)"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'rgba(42, 184, 230, 0.2)' },
                                            '&:hover fieldset': { borderColor: 'rgba(42, 184, 230, 0.5)' },
                                            '&.Mui-focused fieldset': { borderColor: '#2ab8e6' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'text.secondary' },
                                        '& .MuiInputBase-input': { color: 'white' },
                                    }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
                                    <Select
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(42, 184, 230, 0.2)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(42, 184, 230, 0.5)' },
                                            '& .MuiSelect-icon': { color: 'text.secondary' },
                                        }}
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
                                    startIcon={<SendIcon />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                                        color: 'white',
                                        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                                            boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                                            transform: 'translateY(-3px)',
                                        },
                                    }}
                                >
                                    Schedule Payment
                                </Button>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Fade>
    );
}

export default SchedulePayments;