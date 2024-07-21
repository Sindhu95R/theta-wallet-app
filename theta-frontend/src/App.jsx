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
      main: '#8A2BE2', // Vibrant purple
    },
    secondary: {
      main: '#00CED1', // Turquoise
    },
    background: {
      default: '#000000',
      paper: 'rgba(0, 0, 0, 0.7)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0C4DE',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
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
          padding: '10px 20px',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #8A2BE2 30%, #00CED1 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #9932CC 30%, #20B2AA 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
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
          background: 'linear-gradient(45deg, #FF00FF, #00FFFF, #FF1493, #1E90FF)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%'
            },
            '50%': {
              backgroundPosition: '100% 50%'
            },
            '100%': {
              backgroundPosition: '0% 50%'
            },
          },
          padding: '2rem',
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