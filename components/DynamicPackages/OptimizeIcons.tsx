import dynamic from 'next/dynamic';

const AiOutlineRight = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlineRight));
const FiSun = dynamic(() => import('react-icons/fi').then((module) => module.FiSun));
const FiMoon = dynamic(() => import('react-icons/fi').then((module) => module.FiMoon));
const IoIosMenu = dynamic(() => import('react-icons/io').then((module) => module.IoIosMenu));
const IoMdSearch = dynamic(() => import('react-icons/io').then((module) => module.IoMdSearch));
const AiOutlineMessage = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlineMessage));
const AiOutlineMail = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlineMail));
const AiOutlinePhone = dynamic(() => import('react-icons/ai').then((module) => module.AiOutlinePhone));
const SiGoogledrive = dynamic(() => import('react-icons/si').then((module) => module.SiGoogledrive));
const RiFileSearchLine = dynamic(() => import('react-icons/ri').then((module) => module.RiFileSearchLine));


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
