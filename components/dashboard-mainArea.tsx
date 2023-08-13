"use client"
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import LoadingComponent from './aboutToLoad';
import Image from 'next/image';
import { Suspense, useState } from 'react';

const SignInComponent = dynamic(() => import('./YouAreNotSignedIn'));
const MyDropzone = dynamic(() => import('./upload/upload'));
const AnimatedText = dynamic(() => import('./AnimatedText'));

const MainArea: React.FC<{ activeTab: string }> = ({ activeTab }) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [currentTab, setCurrentTab] = useState(activeTab);
    if (!isLoaded) {
        return <LoadingComponent loadingText={'loading user info'} />;
    }

    if (!isSignedIn) {
        return <SignInComponent />;
    }

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab);
    };

    return (
        <main className="flex flex-col justify-center items-center w-full md:w-4/5 pt-40 dark:bg-black">
            {currentTab === 'home' ? (
                <div>
                    <h1 className="text-3xl mb-4">Hi, {user?.fullName}</h1>
                    <div className="bg-gray-500 rounded-md p-4 mb-4 transform hover:scale-105">
                        <Suspense fallback={<div>loading...</div>}>
                            <AnimatedText
                                inputText={
                                    "Welcome to our website, where you can easily add images and extract text from them using Optical Character Recognition (OCR) and Artificial Intelligence (AI) technologies. Our website provides a seamless and efficient way to process images and convert them into editable text using our advanced OCR algorithms. The extracted text can then be downloaded or used for further analysis and processing. Click the 'Upload' button below to get started!"
                                }
                                randomizeColor={true}
                                colorStart={'gray'}
                                colorEnd={'green'}
                            />
                        </Suspense>
                    </div>
                </div>
            ) : (
                <>
                    {currentTab === 'upload' && (
                        <Suspense fallback={<LoadingComponent loadingText={'loading the image uploader'} />}>
                            <MyDropzone />
                        </Suspense>
                    )}
                    {currentTab === 'history' && (
                        <div>
                            <table className="w-full">
                                {/* Table content here */}
                            </table>
                        </div>
                    )}
                    {currentTab === 'settings' && (
                        <div>
                            {/* Settings options and forms here */}
                        </div>
                    )}
                </>
            )}

            <div className="mt-8 space-x-4 flex flex-wrap justify-center">
                <button
                    className={`px-4 py-2 rounded ${currentTab === 'upload' ? 'bg-gray-500' : 'bg-gray-300'
                        } text-white w-full sm:w-auto`}
                    onClick={() => handleTabClick('upload')}
                >
                    Upload
                </button>
                <button
                    className={`px-4 py-2 rounded ${currentTab === 'settings' ? 'bg-gray-500' : 'bg-gray-300'
                        } text-white w-full sm:w-auto mt-2 sm:mt-0`}
                    onClick={() => handleTabClick('settings')}
                >
                    Settings
                </button>
                <button
                    className={`px-4 py-2 rounded ${currentTab === 'history' ? 'bg-gray-500' : 'bg-gray-300'
                        } text-white w-full sm:w-auto mt-2 sm:mt-0`}
                    onClick={() => handleTabClick('history')}
                >
                    History
                </button>
            </div>
        </main>
    );
};

export default MainArea;
