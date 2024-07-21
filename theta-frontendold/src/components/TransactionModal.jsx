import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
        <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>All Transactions</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        label="Date Filter"
                        type="date"
                        value={dateFilter}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Category Filter</InputLabel>
                    <Select
                        value={categoryFilter}
                        label="Category Filter"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="transfer">Transfer</MenuItem>
                        <MenuItem value="investment">Investment</MenuItem>
                        <MenuItem value="expenses">Expenses</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="refund">Refund</MenuItem>
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Sender</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>{transaction.category}</TableCell>
                                    <TableCell>{transaction.gas_fee} TFUEL</TableCell>
                                    <TableCell>{transaction.sender}</TableCell>
                                    <TableCell>{new Date(transaction.timestamp).toLocaleDateString()}</TableCell>
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