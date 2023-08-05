"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
    FiSearch,
    FiHome,
    FiShoppingCart,
    FiPieChart,
    FiMessageSquare,
    FiCalendar,
    FiGrid,
    FiTrendingUp,
    FiUsers,
} from 'react-icons/fi';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
    const [query, setQuery] = useState('');

    const menuData = [
        {
            icon: <div className="w-6 h-6"><FiHome /></div>,
            title: 'Dashboard',
        },
        {
            icon: <div className="w-6 h-6"><FiShoppingCart /></div>,
            title: 'Products',
        },
        {
            icon: <div className="w-6 h-6"><FiPieChart /></div>,
            title: 'Reports',
        },
        {
            icon: <div className="w-6 h-6"><FiMessageSquare /></div>,
            title: 'Messages',
        },
        {
            icon: <div className="w-6 h-6"><FiCalendar /></div>,
            title: 'Calendar',
        },
        {
            icon: <div className="w-6 h-6"><FiGrid /></div>,
            title: 'Table',
        },
        {
            icon: <div className="w-6 h-6"><FiTrendingUp /></div>,
            title: 'UI Components',
        },
    ];

    return (
        <div
            className={`bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'
                }`}

        >
            <div className="space-y-6 md:space-y-10 mt-10">
                <h1 className="font-bold text-4xl text-center md:hidden">
                    D<span className="text-teal-600">.</span>
                </h1>

                <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                    Dashwind<span className="text-teal-600">.</span>
                </h1>

                <div id="profile" className="space-y-3">
                    <Image
                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80"
                        alt="Avatar"
                        className="w-10 md:w-16 rounded-full mx-auto"
                        width={200}
                        height={200}
                    />

                    <div>
                        <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">Eduard Pantazi</h2>
                        <p className="text-xs text-gray-500 text-center">Administrator</p>
                    </div>
                </div>

                <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
                    <input
                        type="text"
                        className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block" onClick={onClose}>
                        <FiSearch className="w-4 h-4" />
                    </button>
                </div>

                <div id="menu" className="flex flex-col space-y-2">
                    {menuData.map((menuItem, index) => (
                        <Link
                            key={index}
                            href=""
                            className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
                        >
                            <div className="w-6 h-6">{menuItem.icon}</div>
                            <span className="">{menuItem.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
