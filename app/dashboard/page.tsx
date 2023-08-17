// dashbooard/page.tsx
import React, { FC } from 'react'
import getQueryClient from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
const AsideDashboardPage = dynamic(() => import('./aside'))

// async function getUser() {
//     const res = await fetch("api/confirmOrCreate");
//     const user = await res.json();
//     console.log("this is the res", res);
//     console.log("this is the user", user);
//     return user
// }
async function getUser(): Promise<any> {
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
const Dashboard: FC = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(["user"], getUser);
    const dehydratedState = dehydrate(queryClient);
    return (
        <Hydrate state={dehydratedState}>
            <AsideDashboardPage />
        </Hydrate>
    );
}

export default Dashboard;
