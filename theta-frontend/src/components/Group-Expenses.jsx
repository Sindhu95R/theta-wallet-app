import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

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

const GroupExpenses = ({ groups = [] }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    };

    initWeb3();
  }, []);

  const handleSettle = async (group) => {
    if (!web3 || !contract) {
      console.error("Web3 or contract not initialized.");
      return;
    }

    const { members, totalBalance } = group;
    const recipients = members.map(member => member.address);
    const amounts = members.map(member => web3.utils.toWei(member.splitAmount.toString(), 'ether'));
    const totalAmount = amounts.reduce((acc, amount) => web3.utils.toBN(acc).add(web3.utils.toBN(amount)), web3.utils.toBN(0));

    try {
      const accounts = await web3.eth.getAccounts();
      const tx = await contract.methods.payMultiple(recipients, amounts).send({ from: accounts[0], value: totalAmount });
      console.log("Transaction sent:", tx.transactionHash);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <Box>
      {groups.length === 0 ? (
        <Typography>No groups available</Typography>
      ) : (
        groups.map((group, index) => (
          <Box key={index} mb={2} p={2} border={1} borderRadius="8px">
            <Typography variant="h6">Group: {group.groupName}</Typography>
            <Typography variant="subtitle1">Total Balance: {web3.utils.fromWei(group.totalBalance, 'ether')} ETH</Typography>
            {group.members.map((member, idx) => (
              <Box key={idx} mb={1}>
                <Typography variant="body1">Name: {member.name}</Typography>
                <Typography variant="body1">Address: {member.address}</Typography>
                <Typography variant="body1">Split Amount: {member.splitAmount} ETH</Typography>
              </Box>
            ))}
            <Button
              onClick={() => handleSettle(group)}
              variant="contained"
              color="primary"
            >
              Settle
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

GroupExpenses.propTypes = {
  groups: PropTypes.array
};

export default GroupExpenses;
