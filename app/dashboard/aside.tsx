
// "use client"
// import dynamic from 'next/dynamic';
// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import ErrorDisplayComponent from '@/components/ErrorInComponent';

// const SignInComponent = dynamic(() => import("@/components/YouAreNotSignedIn"));
// const LoadingComponent = dynamic(() => import("@/components/aboutToLoad"));
// const MainArea = dynamic(() => import("@/components/dashboard-mainArea"));
// const Sidebar = dynamic(() => import("@/components/sidebar/dashboard-sidebar"));


// async function getUser() {
//     try {
//         const res = await fetch('api/confirmOrCreate');
//         if (!res.ok) {
//             throw new Error('Error fetching user data');
//         }
//         const user = await res.json();
//         return user;
//     } catch (error: any) {
//         throw error;
//     }
// }
// const AsideDashboardPage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState("home");

//     const { data, isLoading, isError, error } = useQuery({
//         queryKey: ["user"],
//         queryFn: getUser,
//     })
//     console.log(data, "this is the data");
//     if (isLoading) {
//         return <LoadingComponent loadingText={"loading user"} />
//     }

//     if (isError) {
//         // Consider logging the error or displaying it to the user
//         return <ErrorDisplayComponent errorMessage={"there is an error somehwere"} />
//     }
//     if (!data) {
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
"use client";
import dynamic from 'next/dynamic';
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import ErrorDisplayComponent from '@/components/ErrorInComponent';
import { User } from '@prisma/client'; // Import User type from Prisma

const SignInComponent = dynamic(() => import("@/components/YouAreNotSignedIn"));
const LoadingComponent = dynamic(() => import("@/components/aboutToLoad"));
const MainArea = dynamic(() => import("@/components/dashboard-mainArea"));
const Sidebar = dynamic(() => import("@/components/sidebar/dashboard-sidebar"));

async function getUser(): Promise<User> {
    try {
        const res = await fetch('api/confirmOrCreate');
        if (!res.ok) {
            throw new Error('Error fetching user data');
        }
        const user: User = await res.json();
        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const AsideDashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("home");

    const { data, isLoading, isError, error } = useQuery<User, Error>({
        queryKey: ["user"],
        queryFn: getUser,
    });

    console.log(data, "this is the data");

    if (isLoading) {
        return <LoadingComponent loadingText={"loading user"} />
    }
    if (!data) {
        return <SignInComponent />
    }
    if (isError) {
        let errorMessage = 'An error occurred';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return <ErrorDisplayComponent errorMessage={errorMessage} />
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
