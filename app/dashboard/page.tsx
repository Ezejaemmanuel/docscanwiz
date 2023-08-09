import React, { FC } from 'react'
import AsideDashboardPage from './aside';
import { confirmOrCreate } from '../actions/connectAndConfirmClerkAndPrisma';

const Dashboard: FC = async () => {
    const user = await confirmOrCreate();
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

// //posible alternaitive
// import React, { FC } from 'react';
// import AsideDashboardPage from './aside';
// import { confirmOrCreate } from '../actions/connectAndConfirmClerkAndPrisma';

// const Dashboard: FC = () => {
//     const handleUser = async () => {
//         try {
//             const user = await confirmOrCreate();
//             const userExists = !!user;
//             return userExists;
//         } catch (error) {
//             console.error(error);
//             return false;
//         }
//     }

//     return (
//         <AsideDashboardPage user={handleUser()} />
//     );
// }

// export default Dashboard;