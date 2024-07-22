import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Button,
    Typography,
    Backdrop,
    Fade,
    CircularProgress
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import axios from 'axios';

function TransactionModal({ onClose, transactions, walletAddress }) {
    const [dateFilter, setDateFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const [pdfCreated, setPdfCreated] = useState(false);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');

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

    const handleExportAsPdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Transaction Report', 14, 22);

        if (dateFilter) {
            doc.setFontSize(12);
            doc.text(`Date: ${dateFilter}`, 14, 32);
        }

        if (categoryFilter) {
            doc.setFontSize(12);
            doc.text(`Category: ${categoryFilter}`, 14, categoryFilter ? 42 : 32);
        }

        const columns = [
            { header: 'Category', dataKey: 'category' },
            { header: 'Amount (TFUEL)', dataKey: 'gas_fee' },
            { header: 'Sender', dataKey: 'sender' },
            { header: 'Date', dataKey: 'timestamp' },
        ];

        const data = filteredTransactions.map(transaction => ({
            ...transaction,
            timestamp: new Date(transaction.timestamp).toLocaleDateString()
        }));

        doc.autoTable({
            columns,
            body: data,
            startY: categoryFilter ? 46 : 36,
            styles: { fontSize: 8 },
            columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 30 }, 2: { cellWidth: 65 }, 3: { cellWidth: 30 } }
        });

        const pdfBlobGenerated = doc.output('blob');
        setPdfBlob(pdfBlobGenerated);
        setPdfCreated(true);
    };

    const handleDownload = () => {
        if (pdfBlob) {
            const fileName = `transaction_report_${new Date().toISOString().split('T')[0]}.pdf`;
            saveAs(pdfBlob, fileName);
        }
    };

    const handleUploadToEdgeCloud = async () => {
        if (!pdfBlob) {
            setUploadStatus('No PDF to upload');
            return;
        }

        setIsUploading(true);
        setUploadStatus('Uploading...');

        try {
            const fileName = `transaction_report_${new Date().toISOString().split('T')[0]}.pdf`;
            const fileKey = `${walletAddress}_${Date.now()}`;

            const formData = new FormData();
            formData.append('file', pdfBlob, fileName);
            formData.append('key', fileKey);
            formData.append('walletAddress', walletAddress);

            const response = await axios.post('https://theta-wallet-app.onrender.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data && response.data.success) {
                setUploadStatus('File uploaded successfully!');
            } else {
                setUploadStatus('Upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading file to Edge Cloud:', error);
            setUploadStatus('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
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
            <DialogTitle sx={{
                color: 'primary.main',
                borderBottom: '1px solid rgba(42, 184, 230, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>All Transactions</span>
                <Button
                    variant="contained"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleExportAsPdf}
                    sx={{
                        background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                            boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                        },
                    }}
                >
                    Export as PDF
                </Button>
            </DialogTitle>
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

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pdfCreated}
            >
                <Fade in={pdfCreated}>
                    <Box sx={{
                        background: 'rgba(10, 25, 41, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(42, 184, 230, 0.2)',
                        boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
                        padding: 4,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '80%'
                    }}>
                        <Typography variant="h6" sx={{ color: 'text.primary', mb: 3 }}>
                            PDF created successfully
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                onClick={handleDownload}
                                sx={{
                                    background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                                    },
                                }}
                            >
                                Download
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : <CloudUploadIcon />}
                                onClick={handleUploadToEdgeCloud}
                                disabled={isUploading}
                                sx={{
                                    background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                                        boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                                    },
                                }}
                            >
                                {isUploading ? 'Uploading...' : 'Upload to Edge Cloud'}
                            </Button>
                        </Box>
                        {uploadStatus && (
                            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
                                {uploadStatus}
                            </Typography>
                        )}
                    </Box>
                </Fade>
            </Backdrop>
        </Dialog>
    );
}

export default TransactionModal;