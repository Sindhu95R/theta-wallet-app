import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Table,
  TableBody, TableCell, TableContainer, TableHead,
  TableRow, Fade, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import Modal from './Modal';
import AddFriendForm from '../containers/AddFriendForm';
import BalanceSummary from '../containers/BalanceSummary';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const GroupExpenses = () => {
  const [openAddFriendBox, setOpenAddFriendBox] = useState(false);
  const [groups, setGroups] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('https://your-api-endpoint/groups');
      setGroups(response.data);
      updateChartData(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const updateChartData = (groups) => {
    const labels = groups.map(group => `Group ${group.id}`);
    const data = groups.map(group => group.totalBalance);
    const backgroundColors = labels.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`);
    const borderColors = backgroundColors.map(color => color.replace('0.8', '1'));

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  };

  const handleFormSubmit = async (results) => {
    try {
      const response = await axios.post('https://your-api-endpoint/groups', results);
      setGroups([...groups, response.data]);
      updateChartData([...groups, response.data]);
      setOpenAddFriendBox(false);
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const addNewGroup = () => {
    setCurrentGroupIndex(groups.length);
    setOpenAddFriendBox(true);
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#81D4FA',
          font: {
            family: '"Orbitron", "Roboto", sans-serif',
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + ' TFUEL';
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <Fade in={true} timeout={1000}>
      <Paper elevation={3} sx={{
        p: 3,
        mb: 3,
        background: 'rgba(10, 25, 41, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(42, 184, 230, 0.2)',
        boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'conic-gradient(from 0deg at 50% 50%, #2ab8e6 0deg, transparent 60deg, transparent 300deg, #00ffff 360deg)',
          animation: 'rotate 20s linear infinite',
          opacity: 0.1,
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(42, 184, 230, 0.5)',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, #2ab8e6, #00ffff)',
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              },
            }}>
              Group Expenses
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ mr: 1, color: 'secondary.main', filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))' }} />
              <Typography variant="h6" sx={{ color: 'text.primary' }}>Total Groups: {groups.length}</Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={addNewGroup}
                sx={{
                  mr: 1,
                  background: 'linear-gradient(45deg, #2ab8e6 30%, #00ffff 90%)',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00ffff 30%, #2ab8e6 90%)',
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                Add New Group
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>Group List</Typography>
            <TableContainer component={Paper} sx={{
              mb: 2,
              background: 'rgba(10, 25, 41, 0.5)',
              '&:hover': {
                boxShadow: '0 0 20px rgba(42, 184, 230, 0.2)',
              },
            }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Group Name</TableCell>
                    <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Total Balance</TableCell>
                    <TableCell sx={{ color: 'text.secondary', borderBottom: '2px solid rgba(42, 184, 230, 0.3)' }}>Members</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((group) => (
                    <TableRow key={group.id} sx={{ '&:hover': { background: 'rgba(42, 184, 230, 0.1)' } }}>
                      <TableCell sx={{ color: 'text.primary' }}>Group {group.id}</TableCell>
                      <TableCell sx={{ color: 'text.primary' }}>{group.totalBalance} TFUEL</TableCell>
                      <TableCell sx={{ color: 'text.primary' }}>{group.members.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle, rgba(42, 184, 230, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
                zIndex: -1,
              },
            }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', textAlign: 'center', mb: 2 }}>
                Group Balance Distribution
              </Typography>
              <Box sx={{
                flexGrow: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '110%',
                  height: '110%',
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(42, 184, 230, 0.2) 0deg, transparent 60deg, transparent 300deg, rgba(0, 255, 255, 0.2) 360deg)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'rotate 10s linear infinite',
                  zIndex: -1,
                },
              }}>
                <Pie data={chartData} options={chartOptions} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        {openAddFriendBox && (
          <Modal title="Add New Group" onClose={() => setOpenAddFriendBox(false)}>
            <AddFriendForm onClose={() => setOpenAddFriendBox(false)} onSubmit={handleFormSubmit} />
          </Modal>
        )}
      </Paper>
    </Fade>
  );
}

export default GroupExpenses;