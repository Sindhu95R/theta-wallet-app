import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function SendMoneyModal({ onClose, onSendMoney }) {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        onSendMoney(recipient, amount, category);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Send Money</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Recipient Address"
                    type="text"
                    fullWidth
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Amount (TFUEL)"
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="private">Private</MenuItem>
                        <MenuItem value="transfer">Transfer</MenuItem>
                        <MenuItem value="investment">Investment</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Send</Button>
            </DialogActions>
        </Dialog>
    );
}

export default SendMoneyModal;