import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from './Modal';
import AddFriendForm from '../containers/AddFriendForm';
import styled from 'styled-components';

const StyledTableCell = styled(TableCell)`
  color: #FFFFFF;
`;

const GroupExpenses = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [groups, setGroups] = useState([]);

  // Load groups from local storage when the component mounts
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  // Save groups to local storage whenever groups state changes
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleFormSubmit = (results) => {
    setGroups([...groups, results]);
    setOpenAddFriendBox(false);
  };

  const addNewGroup = () => {
    setOpenAddFriendBox(true);
  };

  const closeModal = () => {
    setOpenAddFriendBox(false);
  };

  const handleSettleClick = (group) => {
    // Define settle functionality here
    console.log(`Settle functionality for group: ${group.groupName}`);
  };

  return (
    <Box sx={{ padding: 3, background: '#0A192F', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#81D4FA' }}>
        Group Expenses
      </Typography>
      <Button
        variant="outlined"
        color="info"
        startIcon={<AddIcon />}
        onClick={addNewGroup}
        sx={{ marginBottom: 2 }}
      >
        Add Group
      </Button>
      <Modal open={openAddFriendBox} onClose={closeModal} title="Add New Group">
        <AddFriendForm onSubmit={handleFormSubmit} onClose={closeModal} />
      </Modal>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper} elevation={3} sx={{ background: 'rgba(10, 25, 41, 0.7)', color: '#81D4FA' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Group Name</StyledTableCell>
                  <StyledTableCell>Total Expenses</StyledTableCell>
                  <StyledTableCell>Members</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groups.map((group, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>{group.groupName}</StyledTableCell>
                    <StyledTableCell>{group.totalBalance} ETH</StyledTableCell>
                    <StyledTableCell>
                      {group.members.map((member, memberIndex) => (
                        <Box key={memberIndex} sx={{ marginBottom: 1 }}>
                          <Typography variant="body2" sx={{ color: '#81D4FA' }}>Name: {member.name}</Typography>
                          <Typography variant="body2" sx={{ color: '#81D4FA' }}>Address: {member.address}</Typography>
                          <Typography variant="body2" sx={{ color: '#81D4FA' }}>Amount Owed: {member.splitAmount}</Typography>
                        </Box>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleSettleClick(group)}
                      >
                        Settle
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroupExpenses;
