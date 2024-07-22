import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {title}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
