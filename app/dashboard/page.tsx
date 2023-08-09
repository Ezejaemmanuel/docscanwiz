import React, { FC } from 'react'
import AsideDashboardPage from './aside';

const Dashboard: FC = async () => {
    const response = await fetch('/api/confrimOrCreate');
    const data = await response.json();
    const { user } = data;

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