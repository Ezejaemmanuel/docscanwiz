"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { IoIosMenu, IoMdSearch } from 'react-icons/io';
import dynamic from 'next/dynamic';

const Popover = dynamic(() => import('@/components/ui/popover').then(mod => mod.Popover));

const PopoverTrigger = dynamic(() => import('@/components/ui/popover').then(mod => mod.PopoverTrigger));

const PopoverContent = dynamic(() => import('@/components/ui/popover').then(mod => mod.PopoverContent));


const DismissableModal: React.FC = () => {


    return (
        <Popover >
            <PopoverTrigger>
                <Button><IoIosMenu /></Button>
            </PopoverTrigger>
            <PopoverContent className="bg-indigo-50 p-4 rounded-b-lg w-80">

                <h4 className="text-xl font-bold text-indigo-900">Navigation</h4>

                <div className="flex items-center space-x-4">
                    <Input placeholder="Search..." className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md focus:outline-none" />
                    <IoMdSearch className="text-gray-500 h-6 w-6" />
                </div>

                <div className="flex flex-col mt-4 space-y-2 text-gray-700">
                    <Link href="/" className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150" >Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150" >About
                    </Link>
                    {/* New Links */}
                    <Link href="/blog" className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150" >Blog
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150" >Contact
                    </Link>
                    <Link href="/press" className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150" >Press
                    </Link>
                    <Link href="/information" className="text-sm font-medium hover:text-indigo-500 transition ease-in-out duration-150" >Information
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default DismissableModal;
