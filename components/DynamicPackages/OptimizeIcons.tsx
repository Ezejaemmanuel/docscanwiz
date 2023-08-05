import dynamic from 'next/dynamic';

const AiOutlineRight = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlineRight), { ssr: false });
const FiSun = dynamic(() => import('react-icons/fi').then((module) => module.FiSun), { ssr: false });
const FiMoon = dynamic(() => import('react-icons/fi').then((module) => module.FiMoon), { ssr: false });
const IoIosMenu = dynamic(() => import('react-icons/io').then((module) => module.IoIosMenu), { ssr: false });
const IoMdSearch = dynamic(() => import('react-icons/io').then((module) => module.IoMdSearch), { ssr: false });
const AiOutlineMessage = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlineMessage), { ssr: false });
const AiOutlineMail = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlineMail), { ssr: false });
const AiOutlinePhone = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlinePhone), { ssr: false });
const SiGoogledrive = dynamic(() => import('react-icons/si').then((module) => module.SiGoogledrive), { ssr: false });
const RiFileSearchLine = dynamic(() => import('react-icons/ri').then((module) => module.RiFileSearchLine), { ssr: false });


export {
    SiGoogledrive,
    RiFileSearchLine,
    AiOutlineRight,
    FiSun,
    FiMoon,
    IoIosMenu,
    IoMdSearch,
    AiOutlineMessage,
    AiOutlineMail,
    AiOutlinePhone,
};
