import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { Button } from '../components'
import { LuSend } from "react-icons/lu";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { dropDownData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropDownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
        <div className='flex flex-wrap lg:flex-nowrap justify-center'>

          {/* Current Balance */}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-cent">
              <div>
                <p className="font-bold text-gray-400">
                  Current Balance
                </p>
                <p className="text-2xl">
                  $75,200.20
                </p>
              </div>

              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className='text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4'
              >
                <BsCurrencyDollar />
              </button>
            </div>

            <div className="mt-6">
              <Button 
                color="white"
                bgColor={currentColor}
                text="See More"
                borderRadius="10px"
              />
            </div>
          </div>

          {/* Send Money */}
          <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
              <button
                type='button'
                style={{ color: 'rgb(255, 244, 229)', 
                backgroundColor: 'rgb(254, 201, 15)' }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <LuSend className="text-4xl" />
              </button>
              <p className="mt-3 text-2xl font-semibold">
                Send Money
              </p>
            </div>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="flex gap-10 m-4 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap">
              <p className="text-xl font-semibold">
                Transaction History
              </p>
              <DropDown currentMode={currentMode} />
            </div>

          </div>
        </div>
    </div>
  );
};

export default Dashboard;
