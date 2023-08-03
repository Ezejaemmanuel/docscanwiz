import Link from 'next/link';
import { IoIosMenu, IoIosClose, IoMdSearch } from 'react-icons/io';
import DismissableModal from './NavLinkModal';
import ToggleModeButton from './ToogleMode';

function NavBar() {

    return (
        <nav className="bg-yellow-500 ">

            <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">

                <div className="relative flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="px-2 lg:w-0 lg:flex-1">
                        <Link href="/" className="flex items-center text-white">

                            <span className="text-xl font-bold ml-2">DocScanWiz</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden px-2 space-x-8 lg:flex lg:space-x-5">
                        <Link
                            href="/"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border-b-2 border-transparent hover:border-white"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border-b-2 border-transparent hover:border-white"
                        >
                            About
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border-b-2 border-transparent hover:border-white"
                        >
                            Services
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border-b-2 border-transparent hover:border-white"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Search Box */}
                    <div className="hidden lg:block">
                        <div className="flex items-center h-full px-5 space-x-2">
                            <input
                                className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-md focus:outline-none"
                                type="text"
                                placeholder="Search..."
                            />
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex justify-end -mr-2 -my-2 px-2 ">
                        <div className="lg:hidden">
                            <DismissableModal />
                        </div>

                        <ToggleModeButton />

                    </div>



                </div>
            </div>

        </nav>
    );
}

export default NavBar;
