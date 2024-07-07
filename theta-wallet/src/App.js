import React, { useEffect } from 'react';
import { Navbar, Sidebar } from './components';

import './App.css';

const App = () => {
  const activeMenu = true;

  return (
    <div className="App">

      <h1 className='underline text-3xl'>
         Welcome to Theta Wallet
      </h1>

      {activeMenu ? (
        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
          <Sidebar />
        </div>
      ) : (
        <div className='w-0 fixed dark:bg-secondary-dark-bg bg-white'>
          <Sidebar />
        </div>
      )}

      <div className={
        activeMenu ? 'dark:bg-main-bg bg-main-bg min-h-screen md:ml-72 w-full' : 'dark:bg-main-bg bg-main-bg min-h-screen md:ml-0 w-full flex-2'
      }>
        <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default App;
