// "use client";
// import SignInComponent from "@/components/YouAreNotSignedIn";
// import LoadingComponent from "@/components/aboutToLoad";
// import MainArea from "@/components/dashboard-mainArea";
// import Sidebar from "@/components/sidebar/dashboard-sidebar";
// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";

// async function getUser() {
//     const res = await fetch("api/confirmOrCreate");
//     const user = await res.json();
//     return user
// }
// const AsideDashboardPage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState("home");

//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ["user"],
//         queryFn: () => getUser,

//     })
//     console.log("this is the data oooooo....", data);
//     if (isLoading) {
//         console.log(isLoading, "this is the IsLoading")
//         return <LoadingComponent loadingText={"loading user"} />

//     }
//     if (isError) {
//         console.log("this isthe data yyyy", data);
//         console.log("this is the isError", isError);
//         console.log("this is the error", error);
//         return <SignInComponent />
//     }
//     if (!data) {
//         console.log("look at the data inside the !data", data);
//         return <SignInComponent />
//     }
//     return (
//         <div className="flex flex-col">
//             <Sidebar setActiveTab={setActiveTab} />
//             <div className="flex flex-col w-full">
//                 <MainArea activeTab={activeTab} />
//             </div>
//         </div>
//     );
// };
// export default AsideDashboardPage;
"use client"
import dynamic from 'next/dynamic';
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ErrorDisplayComponent from '@/components/ErrorInComponent';

const SignInComponent = dynamic(() => import("@/components/YouAreNotSignedIn"));
const LoadingComponent = dynamic(() => import("@/components/aboutToLoad"));
const MainArea = dynamic(() => import("@/components/dashboard-mainArea"));
const Sidebar = dynamic(() => import("@/components/sidebar/dashboard-sidebar"));

// async function getUser() {
//     const res = await fetch("api/confirmOrCreate");
//     const user = await res.json();
//     return user
// }
async function getUser() {
    try {
        const res = await fetch('api/confirmOrCreate');
        if (!res.ok) {
            throw new Error('Error fetching user data');
        }
        const user = await res.json();
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
const AsideDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("home");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    })
    console.log(data, "this is the data");
    if (isLoading) {
        return <LoadingComponent loadingText={"loading user"} />
    }

    if (isError) {
        // Consider logging the error or displaying it to the user

        return <ErrorDisplayComponent errorMessage={"there is an error somehwere"} />
    }
    if (!data) {
        return <SignInComponent />
    }
    return (
        <div className="flex flex-col">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex flex-col w-full">
                <MainArea activeTab={activeTab} />
            </div>
        </div>
    );
};

export default AsideDashboardPage;
