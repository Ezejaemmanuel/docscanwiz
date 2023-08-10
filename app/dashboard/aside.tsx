"use client";
import MainArea from "@/components/dashboard-mainArea";
import Sidebar from "@/components/sidebar/dashboard-sidebar";
import React, { useState } from "react";
interface IncomingBool {
    user: boolean;
}
const AsideDashboardPage: React.FC<IncomingBool> = ({ user }) => {
    console.log("Rendering AsideDashboardPage with user: ", user);  // Log when rendering with user value
    const [activeTab, setActiveTab] = useState("home");
    if (!user) {
        return <div>this is an error</div>
    }

    return (
        <div className="flex">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex flex-col w-full">
                <MainArea activeTab={activeTab} />
            </div>
        </div>
    );
};

export default AsideDashboardPage;
