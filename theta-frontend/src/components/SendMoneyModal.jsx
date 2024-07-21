import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

function SendMoneyModal({ onClose, onSendMoney }) {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        onSendMoney(recipient, amount, category);
        onClose();
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
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
            <DialogTitle sx={{ color: 'primary.main', borderBottom: '1px solid rgba(42, 184, 230, 0.2)' }}>Send Money</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Recipient Address"
                        type="text"
                        fullWidth
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
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
                    <TextField
                        margin="dense"
                        label="Amount (TFUEL)"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel sx={{ color: 'text.secondary' }}>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
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
                            <MenuItem value="private">Private</MenuItem>
                            <MenuItem value="transfer">Transfer</MenuItem>
                            <MenuItem value="investment">Investment</MenuItem>
                            <MenuItem value="expense">Expense</MenuItem>
                            <MenuItem value="income">Income</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid rgba(42, 184, 230, 0.2)' }}>
                <Button onClick={onClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                        color: 'text.primary',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                            boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                        },
                    }}
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SendMoneyModal;