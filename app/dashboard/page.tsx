"use client";
import MainArea from "@/components/dashboard-mainArea";
import Sidebar from "@/components/sidebar/dashboard-sidebar";
// import Header from "@/components/dashboard-header";
import React, { useState } from "react";

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className="flex">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex flex-col w-full">
                {/* <Header /> */}
                <MainArea activeTab={activeTab} />
            </div>
        </div>
    );
};

export default DashboardPage;
// pages/index.tsx
// "use client";
// import Sidebar from '@/components/dashboard-2-sidebar';
// import Dashboard from '@/components/dashbord-2-mainArea';
// import { useState } from 'react'
// import { FiMenu, FiSearch } from 'react-icons/fi'



// export default function Home() {

//     const [sidebarOpen, setSidebarOpen] = useState(true)

//     return (
//         <div className="h-full w-screen flex flex-row font-poppins antialiased">
//             <button
//                 className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
//                 onClick={() => setSidebarOpen(true)}
//             >
//                 <FiMenu className="w-5 h-5" />
//             </button>

//             <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//             <Dashboard />
//         </div>
//     )
// }