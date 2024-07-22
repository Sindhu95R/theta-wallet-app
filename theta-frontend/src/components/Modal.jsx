import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const ModalWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(Paper)`
  background: rgba(10, 25, 41, 0.9);
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(42, 184, 230, 0.3);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
`;

const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Modal = ({ title, children, onClose }) => {
  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>
          <Typography variant="h5" sx={{ color: '#2ab8e6', textShadow: '0 0 10px rgba(42, 184, 230, 0.5)' }}>
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#81D4FA' }}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;