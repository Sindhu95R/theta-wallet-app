import React from 'react';
import { GrGoogleWallet } from "react-icons/gr";
import { GrAppsRounded } from "react-icons/gr";
import { PiFilesFill } from "react-icons/pi";
import { MdLibraryBooks } from "react-icons/md";
import { IoSettings } from "react-icons/io5";


const Sidebar = () => {
    const activeMenu = true;

    return (
        <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
            {activeMenu && (<>
                <div className='flex justify-between items-center'>
                    {/* Task: Implement the link here or route here */}
                    <a href="www/google.com" className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
                        <GrGoogleWallet /> <span>CryptoWallet</span>
                    </a>
                </div>
            </>)}
        </div>
    )
}

export default Sidebar;
