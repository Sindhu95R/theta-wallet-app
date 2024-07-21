import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
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

function GasPredictions() {
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGasPredictions();
    }, []);

    const fetchGasPredictions = async () => {
        try {
            const response = await axios.get('https://theta-wallet-app.onrender.com/api/gas-price/predict');
            setPredictionData(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching gas predictions:', err);
            setError('Failed to fetch gas predictions. Please try again later.');
            setLoading(false);
        }
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#FFFFFF',
                },
            },
            title: {
                display: true,
                text: 'Gas Price Predictions',
                color: '#FFFFFF',
                font: {
                    size: 16,
                    weight: 'bold',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Gas Price: ${context.parsed.y.toFixed(2)} GWEI`;
                    }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#81D4FA',
                },
                grid: {
                    color: 'rgba(42, 184, 230, 0.1)',
                },
            },
            y: {
                ticks: {
                    color: '#81D4FA',
                    callback: function (value) {
                        return value.toFixed(2) + ' GWEI';
                    }
                },
                grid: {
                    color: 'rgba(42, 184, 230, 0.1)',
                },
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart',
        },
    };

    const prepareChartData = (data) => {
        const timeIntervals = ['10m', '30m', '1h', '4h', '10h', '1d'];
        const sortedData = timeIntervals.map(interval => ({
            interval,
            price: data.predictions[interval]
        }));

        return {
            labels: sortedData.map(item => item.interval),
            datasets: [
                {
                    label: 'Predicted Gas Price',
                    data: sortedData.map(item => item.price),
                    borderColor: '#2ab8e6',
                    backgroundColor: 'rgba(42, 184, 230, 0.2)',
                    pointBackgroundColor: '#00ffff',
                    pointBorderColor: '#FFFFFF',
                    pointHoverBackgroundColor: '#FFFFFF',
                    pointHoverBorderColor: '#2ab8e6',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    };

    return (
        <Paper elevation={3} sx={{
            p: 3,
            background: 'rgba(10, 25, 41, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(42, 184, 230, 0.2)',
            boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
            borderRadius: 2,
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
            }}>
                Gas Price Predictions for {predictionData?.chain.toUpperCase() || 'Ethereum'}
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Box sx={{ height: 400, position: 'relative' }}>
                    <Line options={chartOptions} data={prepareChartData(predictionData)} />
                </Box>
            )}
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                This graph shows predicted gas prices for different time intervals. The x-axis represents time intervals, and the y-axis shows the predicted gas price in GWEI. The line chart helps visualize the trend of gas prices over time.
            </Typography>
        </Paper>
    );
}

export default GasPredictions;