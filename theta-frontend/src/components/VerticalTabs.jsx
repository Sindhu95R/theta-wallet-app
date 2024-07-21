import React from 'react';
import { Box, Tabs, Tab, Typography, Zoom } from '@mui/material';
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
        <Box sx={{ display: 'flex', minHeight: '400px', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={activeTab}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                        minHeight: 64,
                        justifyContent: 'flex-start',
                        '&.Mui-selected': {
                            color: 'primary.main',
                            bgcolor: 'rgba(42, 184, 230, 0.08)',
                        },
                    },
                }}
            >
                <Tab icon={<GroupIcon />} label="Group Expenses" sx={{ color: 'text.primary' }} />
                <Tab icon={<InsightsIcon />} label="Financial Insights" sx={{ color: 'text.primary' }} />
                <Tab icon={<LocalGasStationIcon />} label="Gas Predictions" sx={{ color: 'text.primary' }} />
                <Tab icon={<ScheduleIcon />} label="Schedule Payments" sx={{ color: 'text.primary' }} />
            </Tabs>
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
    );
}

export default VerticalTabs;