import React, { FC } from 'react'
import AsideDashboardPage from './aside';
import { confirmOrCreate } from '../actions/connectAndConfirmClerkAndPrisma';

const Dashboard: FC = async () => {
    const user = await confirmOrCreate();
    console.log("User in Dashboard: ", user);  // Log user value in Dashboard
    if (user) {
        return (
            <>
                <AsideDashboardPage user={true} />
            </>
        )
    }
    return (
        <>
            <AsideDashboardPage user={false} />
        </>
    )
}

export default Dashboard;
