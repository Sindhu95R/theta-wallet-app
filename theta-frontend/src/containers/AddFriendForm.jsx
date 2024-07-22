import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import styled from 'styled-components';

const FormField = styled(Box)`
  margin-bottom: 1.5rem;
`;

const StyledPaper = styled(Paper)`
  background: rgba(10, 25, 41, 0.7);
  padding: 1.5rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(42, 184, 230, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 255, 255, 0.1);
`;

const AddFriendForm = ({ onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([{ name: '', address: '' }]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addMember = () => {
    setMembers([...members, { name: '', address: '' }]);
  };

  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = {
      name: groupName,
      members: members,
      totalBalance: totalAmount,
    };
    onSubmit(results);
    onClose();
  };

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit}>
        <FormField>
          <TextField
            fullWidth
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            InputProps={{
              style: { color: '#FFFFFF' }
            }}
            InputLabelProps={{
              style: { color: '#81D4FA' }
            }}
          />
        </FormField>
        <FormField>
          <TextField
            fullWidth
            type="number"
            label="Total Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
            required
            InputProps={{
              style: { color: '#FFFFFF' }
            }}
            InputLabelProps={{
              style: { color: '#81D4FA' }
            }}
          />
        </FormField>
        {members.map((member, index) => (
          <Box key={index} mb={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#81D4FA' }}>Member {index + 1}</Typography>
            <TextField
              fullWidth
              label="Name"
              value={member.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              margin="normal"
              required
              InputProps={{
                style: { color: '#FFFFFF' }
              }}
              InputLabelProps={{
                style: { color: '#81D4FA' }
              }}
            />
            <TextField
              fullWidth
              label="Address"
              value={member.address}
              onChange={(e) => handleChange(index, 'address', e.target.value)}
              margin="normal"
              required
              InputProps={{
                style: { color: '#FFFFFF' }
              }}
              InputLabelProps={{
                style: { color: '#81D4FA' }
              }}
            />
          </Box>
        ))}
        <Button
          type="button"
          onClick={addMember}
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            color: '#00ffff',
            borderColor: '#00ffff',
            '&:hover': {
              borderColor: '#2ab8e6',
              backgroundColor: 'rgba(0, 255, 255, 0.1)',
            }
          }}
        >
          Add More Members
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
            },
          }}
        >
          Create Group
        </Button>
      </form>
    </StyledPaper>
  );
};

export default AddFriendForm;