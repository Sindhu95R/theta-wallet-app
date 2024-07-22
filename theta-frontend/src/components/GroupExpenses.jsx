import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from './Modal';
import AddFriendForm from '../containers/AddFriendForm';
import styled from 'styled-components';
import Web3 from 'web3';

const StyledTableCell = styled(TableCell)`
  color: #FFFFFF;
`;

const GroupExpenses = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [groups, setGroups] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const contractAddress = "0xF654962ad844c1a54d6163a5Cc86eF6B43D0710c";
  const abi = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "recipients",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "name": "payMultiple",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          const contractInstance = new web3Instance.eth.Contract(abi, contractAddress, { from: accounts[0] });
          setContract(contractInstance);
        })
        .catch(error => console.error(error));
    } else {
      console.error("MetaMask is not installed.");
    }
  }, []);

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

  const handleSettleClick = async (group) => {
    // if (!contract) {
    //   console.error("Web3 or contract is not initialized.");
    //   return;
    // }

    const recipients = group.members.map(member => member.address);
    const amounts = group.members.map(member => web3.utils.toWei(member.splitAmount.toString(), 'ether'));
    // const totalAmount = amounts.reduce((total, amount) => total.add(Number(amount)), Number(0));
    let totalAmount
    for(let i = 0; i < amounts.length; i++){
      totalAmount += Number(amounts[i])}

    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      const tx = await contract.methods.payMultiple(recipients, amounts).send({ from: accounts[0], value: totalAmount });
      console.log(`Transaction sent: ${tx.transactionHash}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
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
                          <Typography variant="body2" sx={{ color: '#81D4FA' }}>Amount Owed: {member.splitAmount} ETH</Typography>
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
