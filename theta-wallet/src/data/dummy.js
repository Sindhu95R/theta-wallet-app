import React from 'react';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';
import { VscGraph } from 'react-icons/vsc';
import { MdAttachMoney } from 'react-icons/md';
import { BsCurrencyDollar } from 'react-icons/bs';
import avatar from './avatar.jpg';

export const links = [
    {
      title: 'Dashboard',
      links: [
        {
          name: 'Dashboard',
          icon: <MdSpaceDashboard />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'Group Expenses',
          icon: <FaMoneyCheckAlt />,
        },
        {
          name: 'Financial Insights',
          icon: <VscGraph />,
        },
        {
          name: 'Gas Predictions',
          icon: <HiLightBulb />,
        },
        {
          name: 'Schedule Payments',
          icon: <MdAttachMoney />,
        },
      ],
    },
  ];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const chatData = [
  {
    image:
      avatar,
    message: 'Dhyey Joined the Eatery!',
    desc: 'Notify the team',
    time: '9:08 AM',
  },
  {
    image:
      avatar,
    message: 'Money received',
    desc: 'Sindhu sent you her payment',
    time: '11:56 AM',
  },
  {
    image:
      avatar,
    message: 'New Payment received',
    desc: 'Check your financial insights',
    time: '4:39 AM',
  },
  {
    image:
      avatar,
    message: 'Muthu requested for his balance',
    desc: 'Assign him new balance',
    time: '1:12 AM',
  },
];

export const dropDownData = [
  {
    Id: '1',
    Time: 'January 2024',
  },
  {
    Id: '2',
    Time: 'February 2024',
  },
  {
    Id: '3',
    Time: 'March 2024',
  },
  {
    Id: '4',
    Time: 'April 2024',
  },
  {
    Id: '5',
    Time: 'May 2024',
  },
  {
    Id: '6',
    Time: 'June 2024',
  },
]

