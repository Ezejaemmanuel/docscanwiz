"use client";
import LoadingComponent from '@/components/aboutToLoad';
import dynamic from 'next/dynamic';
import React from 'react';
import { useSearchParams } from 'next/navigation';


// Dynamically import MyQuillComponent
const MyQuillComponent = dynamic(() => import('./editor'), {
    loading: () => <LoadingComponent loadingText={'loading text editor'} />,
    ssr: false, // This line is important. It's needed because Quill.js relies on the browser but server-side rendering (SSR) happens in a Node environment.
});
const DefaultEditor = dynamic(() => import('./defaultEditor'), {
    loading: () => <LoadingComponent loadingText={'loading default text editor'} />,
    ssr: false, // This line is important. It's needed because Quill.js relies on the browser but server-side rendering (SSR) happens in a Node environment.
});
const DynamicQuill: React.FC = () => {
    const searchParams = useSearchParams();
    const uuid = searchParams.get('uuid');
    if (!uuid) {
        return (
            <div className="flex justify-center items-center h-screen pt-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <DefaultEditor />
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center h-screen pt-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <MyQuillComponent uuid={uuid} />
        </div>
    );

}

export default DynamicQuill;
