import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

function TransactionModal({ onClose, transactions }) {
    const [dateFilter, setDateFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    useEffect(() => {
        filterTransactions();
    }, [dateFilter, categoryFilter, transactions]);

    const filterTransactions = () => {
        const filtered = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.timestamp).toISOString().split('T')[0];
            const dateMatch = dateFilter ? transactionDate === dateFilter : true;
            const categoryMatch = categoryFilter ? transaction.category === categoryFilter : true;
            return dateMatch && categoryMatch;
        });
        setFilteredTransactions(filtered);
    };

    const handleDateChange = (event) => {
        setDateFilter(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    background: 'rgba(10, 25, 41, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(42, 184, 230, 0.2)',
                    boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
                    color: 'text.primary',
                }
            }}
        >
            <DialogTitle sx={{ color: 'primary.main', borderBottom: '1px solid rgba(42, 184, 230, 0.2)' }}>All Transactions</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2, mb: 2, display: 'flex', gap: 2 }}>
                    <FormControl fullWidth>
                        <TextField
                            label="Date Filter"
                            type="date"
                            value={dateFilter}
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(42, 184, 230, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(42, 184, 230, 0.5)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'text.secondary',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel sx={{ color: 'text.secondary' }}>Category Filter</InputLabel>
                        <Select
                            value={categoryFilter}
                            label="Category Filter"
                            onChange={handleCategoryChange}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(42, 184, 230, 0.2)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(42, 184, 230, 0.5)',
                                },
                                '& .MuiSelect-icon': {
                                    color: 'text.secondary',
                                },
                            }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="transfer">Transfer</MenuItem>
                            <MenuItem value="investment">Investment</MenuItem>
                            <MenuItem value="expenses">Expenses</MenuItem>
                            <MenuItem value="income">Income</MenuItem>
                            <MenuItem value="refund">Refund</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer component={Paper} sx={{ background: 'rgba(10, 25, 41, 0.5)' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Category</TableCell>
                                <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Amount</TableCell>
                                <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Sender</TableCell>
                                <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
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
            </DialogContent>
        </Dialog>
    );
}

export default TransactionModal;