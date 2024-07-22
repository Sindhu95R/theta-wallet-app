import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import styled from 'styled-components';

const BalanceBox = styled(Paper)`
  padding: 1rem;
  background: rgba(10, 25, 41, 0.7);
  border-radius: 16px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(42, 184, 230, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 255, 255, 0.1);
`;

const BalanceItem = styled(Box)`
  text-align: center;
`;

const BalanceSummary = ({ totalBalance, youOwe, youOwed }) => {
  return (
    <BalanceBox elevation={3}>
      <Typography variant="h6" gutterBottom sx={{ color: '#2ab8e6', textAlign: 'center', mb: 2 }}>Balance Summary</Typography>
      <Box display="flex" justifyContent="space-between">
        <BalanceItem>
          <Typography variant="subtitle2" sx={{ color: '#81D4FA' }}>Total Balance</Typography>
          <Typography variant="h6" sx={{ color: '#2ab8e6', textShadow: '0 0 10px rgba(42, 184, 230, 0.5)' }}>{totalBalance} TFUEL</Typography>
        </BalanceItem>
        <BalanceItem>
          <Typography variant="subtitle2" sx={{ color: '#81D4FA' }}>You owe</Typography>
          <Typography variant="h6" sx={{ color: '#FF8027', textShadow: '0 0 10px rgba(255, 128, 39, 0.5)' }}>{youOwe} TFUEL</Typography>
        </BalanceItem>
        <BalanceItem>
          <Typography variant="subtitle2" sx={{ color: '#81D4FA' }}>You are owed</Typography>
          <Typography variant="h6" sx={{ color: '#78B75E', textShadow: '0 0 10px rgba(120, 183, 94, 0.5)' }}>{youOwed} TFUEL</Typography>
        </BalanceItem>
      </Box>
    </BalanceBox>
  );
};

export default BalanceSummary;
