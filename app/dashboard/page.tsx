import React, { FC } from 'react'
import AsideDashboardPage from './aside';
import getQueryClient from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';


async function getUser() {
    const res = await fetch("api/confirmOrCreate");
    const user = await res.json();
    console.log("this is the res", res);
    console.log("this is the user", user);
    return user
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
