import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://www.thetatoken.org/">
                        Theta Network Wallet
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;