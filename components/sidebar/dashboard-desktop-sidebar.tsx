"use client";
import React from "react";
import { TiHome, TiUpload, TiCog } from "react-icons/ti";

const DesktopSidebars: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const DesktopSidebarsItems = [
        { id: "home", label: "Home", icon: <TiHome /> },
        { id: "upload", label: "Upload", icon: <TiUpload /> },
        { id: "history", label: "History", icon: <TiUpload /> },
        { id: "settings", label: "Settings", icon: <TiCog /> },
    ];

    return (
        <nav className="h-screen w-1/5 lg:flex md:flex flex-col pt-12 justify-center border-spacing-3 rounded-md sm:hidden dark:bg-gray-800 bg-slate-300 z-5 text-gray-200">
            {DesktopSidebarsItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className="text-xl mb-2 flex items-center space-x-2 p-4 cursor-pointer text-yellow-500"
                >
                    <div className="text-yellow-500">
                        {item.icon}
                    </div>
                    <span>{item.label}</span>
                </div>
            ))}
        </nav>
    );
};

export default DesktopSidebars;
