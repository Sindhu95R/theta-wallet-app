import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Button, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TransactionModal from './TransactionModal';
import SendMoneyModal from './SendMoneyModal';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [allTransactions, setAllTransactions] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);



    const walletAddress = '0xAA32Ed0706d0eDFB73976f7af6B90B99f78FdEF3';
    const balance = '288.44 TFUEL';

    useEffect(() => {
        fetchRecentTransactions();
    }, []);

    const fetchRecentTransactions = async () => {
        try {
            const response = await axios.get(`https://theta-wallet-app.onrender.com/api/transactions/${walletAddress}`);
            setRecentTransactions(response.data.transactions.slice(0, 5));
            updateChartData(response.data.transactions);
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
        }
    };

    const fetchAllTransactions = async () => {
        try {
            const response = await axios.get(`https://theta-wallet-app.onrender.com/api/transactions/${walletAddress}`);
            setAllTransactions(response.data.transactions);
            setShowTransactionModal(true);
        } catch (error) {
            console.error('Error fetching all transactions:', error);
        }
    };

    const updateChartData = (transactions) => {
        const categories = {};
        transactions.forEach(transaction => {
            if (categories[transaction.category]) {
                categories[transaction.category]++;
            } else {
                categories[transaction.category] = 1;
            }
        });

        const labels = Object.keys(categories);
        const data = Object.values(categories);
        const backgroundColors = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`);
        const borderColors = backgroundColors.map(color => color.replace('0.8', '1'));

        setChartData({
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        });
    };

    const handleSendMoney = async (recipient, amount, category) => {
        try {
            const response = await axios.post('https://theta-wallet-app.onrender.com/api/transaction', {
                wallet_address: walletAddress,
                sender: walletAddress,
                recipient: recipient,
                amount: amount,
                gas_fee: amount,
                category: category,
                hash: `0x${Math.random().toString(36).substr(2, 9)}`,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toTimeString().split(' ')[0],
            });
            console.log('Transaction stored:', response.data);
            fetchRecentTransactions();
        } catch (error) {
            console.error('Error sending money:', error);
        }
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' transactions';
                        }
                        return label;
                    }
                }
            }
        },
    };

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl(null);
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(walletAddress).then(() => {
            setSnackbarOpen(true);
            handleProfileClose();
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

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
                <IconButton
                    onClick={handleProfileClick}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                            boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                        },
                    }}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom sx={{
                            color: 'primary.main',
                            fontWeight: 'bold',
                            textShadow: '0 0 10px rgba(42, 184, 230, 0.5)',
                            position: 'relative',
                            display: 'inline-block',
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
                            Wallet Dashboard
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AccountBalanceWalletIcon sx={{ mr: 1, color: 'secondary.main', filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))' }} />
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Balance: {balance}</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>Address: {walletAddress}</Typography>
                        <Box sx={{ mb: 3 }}>
                            <Button
                                startIcon={<SendIcon />}
                                variant="contained"
                                color="primary"
                                onClick={() => setShowSendMoneyModal(true)}
                                sx={{
                                    mr: 1,
                                    background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                                        boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                                        transform: 'translateY(-3px)',
                                    },
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>Recent Transactions</Typography>
                        <TableContainer component={Paper} sx={{
                            mb: 2,
                            background: 'rgba(10, 25, 41, 0.5)',
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(42, 184, 230, 0.2)',
                            },
                        }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Category</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Amount</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Sender</TableCell>
                                        <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentTransactions.map((transaction) => (
                                        <TableRow key={transaction._id} sx={{ '&:hover': { background: 'rgba(42, 184, 230, 0.1)' } }}>
                                            <TableCell sx={{ color: 'text.primary' }}>{transaction.category}</TableCell>
                                            <TableCell sx={{ color: 'text.primary' }}>{transaction.gas_fee} TFUEL</TableCell>
                                            <TableCell sx={{ color: 'text.primary' }}>{transaction.sender}</TableCell>
                                            <TableCell sx={{ color: 'text.primary' }}>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            endIcon={<MoreHorizIcon />}
                            onClick={fetchAllTransactions}
                            sx={{
                                color: 'secondary.main',
                                '&:hover': {
                                    background: 'rgba(42, 184, 230, 0.1)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            View All Transactions
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'radial-gradient(circle, rgba(42, 184, 230, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
                                zIndex: -1,
                            },
                        }}>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleProfileClose}
                                PaperProps={{
                                    sx: {
                                        background: 'rgba(10, 25, 41, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(42, 184, 230, 0.2)',
                                        boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
                                        color: 'text.primary',
                                        '& .MuiMenuItem-root': {
                                            '&:hover': {
                                                background: 'rgba(42, 184, 230, 0.1)',
                                            },
                                        },
                                    },
                                }}
                            >
                                <MenuItem>
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                    </Typography>
                                    <IconButton size="small" onClick={handleCopyAddress}>
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </MenuItem>
                            </Menu>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                open={snackbarOpen}
                                autoHideDuration={3000}
                                onClose={handleSnackbarClose}
                                message={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CheckCircleOutlineIcon sx={{ mr: 1, color: '#00ffff' }} />
                                        <Typography>Address copied to clipboard</Typography>
                                    </Box>
                                }
                                ContentProps={{
                                    sx: {
                                        background: 'rgba(10, 25, 41, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(42, 184, 230, 0.2)',
                                        boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
                                        color: 'text.primary',
                                        '& .MuiSnackbarContent-message': {
                                            padding: '8px 0',
                                        },
                                    },
                                }}
                            />

                            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', textAlign: 'center', mb: 2 }}>
                                Transaction Distribution
                            </Typography>
                            <Box sx={{
                                flexGrow: 1,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '110%',
                                    height: '110%',
                                    background: 'conic-gradient(from 0deg at 50% 50%, rgba(42, 184, 230, 0.2) 0deg, transparent 60deg, transparent 300deg, rgba(0, 255, 255, 0.2) 360deg)',
                                    borderRadius: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    animation: 'rotate 10s linear infinite',
                                    zIndex: -1,
                                },
                            }}>
                                <Pie data={chartData} options={chartOptions} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {showTransactionModal && (
                    <TransactionModal
                        onClose={() => setShowTransactionModal(false)}
                        transactions={allTransactions}
                    />
                )}

                {showSendMoneyModal && (
                    <SendMoneyModal onClose={() => setShowSendMoneyModal(false)} onSendMoney={handleSendMoney} />
                )}
            </Paper>
        </Fade>
    );
}

export default Dashboard;