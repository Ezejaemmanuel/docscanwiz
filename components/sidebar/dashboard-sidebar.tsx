"use client";
import React from 'react';
import Mobile from './dashboard-mobile-sidebar';
import Desktop from './dashboard-desktop-sidebar';

interface SidebarProps {
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
    return (
        <div>
            <div className="block lg:hidden ">
                <Mobile setActiveTab={setActiveTab} />
            </div>
            <div className='hidden lg:block'>
                <Desktop setActiveTab={setActiveTab} />
            </div>
        </div>
    );
};

export default Sidebar;
// "use client";
// import React from 'react';
// import { useMediaQuery } from 'react-responsive';
// import DesktopSidebars from './dashboard-desktop-sidebar';
// import MobileSidebar from './dashboard-mobile-sidebar';

// interface SidebarProps {
//     setActiveTab: (tab: string) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
//     const isDesktop = useMediaQuery({ minWidth: 768 });

//     return (
//         <div>
//             {isDesktop ? (
//                 <DesktopSidebars setActiveTab={setActiveTab} />
//             ) : (
//                 <MobileSidebar setActiveTab={setActiveTab} />
//             )}
//         </div>
//     );
// };

// export default Sidebar;
