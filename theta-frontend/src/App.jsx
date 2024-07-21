import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Dashboard from './components/Dashboard';
import VerticalTabs from './components/VerticalTabs';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2ab8e6',
    },
    secondary: {
      main: '#00ffff',
    },
    background: {
      default: '#000000',
      paper: 'rgba(10, 25, 41, 0.7)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#81D4FA',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
            transform: 'translateY(-3px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          background: 'rgba(10, 25, 41, 0.7)',
          boxShadow: '0 8px 32px 0 rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(42, 184, 230, 0.2)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 32px 0 rgba(0, 255, 255, 0.3)',
          },
        },
      },
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `
            linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98H1V1zm2 2v94h94V3H3zm4 4h86v86H7V7z' fill='%23042b3e' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")
          `,
          backgroundSize: '50px 50px',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(42, 184, 230, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 10s infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(42, 184, 230, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)',
            pointerEvents: 'none',
          },
          '@keyframes pulse': {
            '0%': { transform: 'translate(-50%, -50%) scale(1)' },
            '50%': { transform: 'translate(-50%, -50%) scale(1.5)' },
            '100%': { transform: 'translate(-50%, -50%) scale(1)' },
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Dashboard />
            <VerticalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;