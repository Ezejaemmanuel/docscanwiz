"use client";
import { useState, useEffect } from 'react';
import { Modal } from './flowbite/cliented-flowbite';
import { IoMdSearch } from 'react-icons/io';
import Link from 'next/link';
interface DismissableModalProps {
    open: boolean;
}

const DismissableModal: React.FC<DismissableModalProps> = ({ open }) => {

    const [openModal, setOpenModal] = useState<string | undefined>(open ? 'dismissible' : undefined);

    useEffect(() => {
        setOpenModal(open ? 'dismissible' : undefined);
    }, [open]);

    return (
        <div className={`modal transition duration-300 ease-in-out ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
            <Modal show={openModal === 'dismissible'} onClose={() => setOpenModal(undefined)}>

                <Modal.Header className="text-xl font-bold text-indigo-900">Navigation</Modal.Header>

                <Modal.Body className="bg-indigo-50 p-4 rounded-b-lg">

                    <div className="flex items-center space-x-4">
                        <input
                            className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md focus:outline-none"
                            type="text"
                            placeholder="Search..."
                        />
                        <IoMdSearch className="text-gray-500 h-6 w-6" />
                    </div>

                    <div className="flex flex-col mt-4 space-y-2 text-gray-700">
                        <Link
                            href="/"
                            className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150"
                            onClick={() => setOpenModal(undefined)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150"
                            onClick={() => setOpenModal(undefined)}
                        >
                            About
                        </Link>
                        {/* other links */}
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    );
}

export default DismissableModal;