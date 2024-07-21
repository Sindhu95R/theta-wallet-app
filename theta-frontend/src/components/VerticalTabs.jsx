import React from 'react';
import { Box, Tabs, Tab, Typography, Zoom, Paper } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import InsightsIcon from '@mui/icons-material/Insights';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ScheduleIcon from '@mui/icons-material/Schedule';
import GroupExpenses from './GroupExpenses';
import FinancialInsights from './FinancialInsights';
import GasPredictions from './GasPredictions';
import SchedulePayments from './SchedulePayments';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Zoom in={true} style={{ transitionDelay: value === index ? '300ms' : '0ms' }}>
                        <div>{children}</div>
                    </Zoom>
                </Box>
            )}
        </div>
    );
}

function VerticalTabs({ activeTab, setActiveTab }) {
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                minHeight: '400px',
                background: 'rgba(10, 25, 41, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(42, 184, 230, 0.2)',
                boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
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
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={activeTab}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'rgba(42, 184, 230, 0.2)',
                    '& .MuiTab-root': {
                        minHeight: 64,
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        transition: 'all 0.3s ease-in-out',
                        '&.Mui-selected': {
                            color: 'primary.main',
                            bgcolor: 'rgba(42, 184, 230, 0.08)',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                        },
                        '&:hover': {
                            bgcolor: 'rgba(42, 184, 230, 0.05)',
                            color: 'primary.light',
                        },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: 'primary.main',
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    },
                }}
            >
                <Tab icon={<GroupIcon />} label="Group Expenses" />
                <Tab icon={<InsightsIcon />} label="Financial Insights" />
                <Tab icon={<LocalGasStationIcon />} label="Gas Predictions" />
                <Tab icon={<ScheduleIcon />} label="Schedule Payments" />
            </Tabs>
            <Box sx={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
                <TabPanel value={activeTab} index={0}>
                    <GroupExpenses />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <FinancialInsights />
                </TabPanel>
                <TabPanel value={activeTab} index={2}>
                    <GasPredictions />
                </TabPanel>
                <TabPanel value={activeTab} index={3}>
                    <SchedulePayments />
                </TabPanel>
            </Box>
        </Paper>
    );
}

export default VerticalTabs;