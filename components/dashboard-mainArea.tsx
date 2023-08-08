// "use client";
// import React, { Suspense } from 'react';
// import { useUser } from '@clerk/nextjs';
// import dynamic from 'next/dynamic';
// import LoadingComponent from './aboutToLoad';

// const SignInComponent = dynamic(() => import('./YouAreNotSignedIn'));
// const MyDropzone = dynamic(() => import('./upload/upload'));

// const MainArea: React.FC<{ activeTab: string }> = ({ activeTab }) => {
//     const { isLoaded, isSignedIn, user } = useUser();

//     if (!isLoaded) {
//         return <LoadingComponent loadingText={" loading the user"} />;
//     }

//     if (!isSignedIn) {
//         return <SignInComponent />;
//     }

//     return (
//         <main className="flex flex-col justify-center items-center w-4/5 pt-40">
//             {activeTab === 'home' && (
//                 <div>
//                     <h1 className="text-3xl mb-4">Hi, {user?.fullName}, Welcome to the Dashboard</h1>
//                     <p>Introduction text here...</p>
//                 </div>
//             )}
//             {activeTab === 'upload' && (
//                 <Suspense fallback={<LoadingComponent loadingText={"loading file dropper"} />}>
//                     <MyDropzone />
//                 </Suspense>
//             )}
//             {activeTab === 'history' && (
//                 <div>
//                     <table className="w-full">
//                         {/* Table content here */}
//                     </table>
//                 </div>
//             )}
//             {activeTab === 'settings' && (
//                 <div>
//                     {/* Settings options and forms here */}
//                 </div>
//             )}
//         </main>
//     );
// };

// export default MainArea;
"use client";
import React, { Suspense, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import LoadingComponent from './aboutToLoad';

const SignInComponent = dynamic(() => import('./YouAreNotSignedIn'));
const MyDropzone = dynamic(() => import('./upload/upload'));

const MainArea: React.FC<{ activeTab: string }> = ({ activeTab }) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [currentTab, setCurrentTab] = useState(activeTab);

    if (!isLoaded) {
        return <LoadingComponent loadingText={"loading user info"} />;
    }

    if (!isSignedIn) {
        return <SignInComponent />;
    }

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab);
    };

    return (
        <main className="flex flex-col justify-center items-center w-4/5 pt-40">
            {currentTab === 'home' ? (
                <div> {/* Replacing the home introduction div with the provided code */}
                    <h1 className="text-3xl mb-4">Hi, {user?.fullName}, Welcome to the Dashboard</h1>
                    <p>Welcome to our website, where you can easily add images and extract text from them using Optical Character Recognition (OCR) and Artificial Intelligence (AI) technologies.</p>
                    <p>Our website provides a seamless and efficient way to process images and convert them into editable text. Whether you have scanned documents, handwritten notes, or images with embedded text, our advanced OCR algorithms can accurately recognize and extract the text, making it searchable and editable.</p>
                    <p>With our intuitive user interface, you can effortlessly upload images and initiate the OCR process. Our AI-powered algorithms analyze the image, identify text regions, and convert them into machine-readable text. The extracted text can then be downloaded or used for further analysis and processing.</p>
                    <p>Our OCR technology is trained on vast amounts of data, enabling it to handle various languages, fonts, and document layouts. It can handle complex scenarios such as skewed or rotated text, low-quality images, and even handwritten text. Our goal is to provide you with the most accurate and reliable text extraction results.</p>
                    <p>Additionally, our website offers advanced features such as text recognition from images in different file formats, batch processing for multiple images, and the ability to preserve the original formatting and structure of the extracted text.</p>
                    <p>Whether you need to digitize printed documents, extract information from images for data analysis, or simply convert images into editable text, our website is your go-to solution. Experience the power of OCR and AI technology and unlock the potential of your images.</p>
                    <p>To get started, simply click the "Upload" button below to upload your images and let our advanced OCR technology do the rest!</p>
                    <h2>Why Choose Our Website?</h2>
                    <ul>
                        <li>Effortlessly convert images into editable text</li>
                        <li>Accurate and reliable OCR technology</li>
                        <li>Support for various languages, fonts, and document layouts</li>
                        <li>Advanced features for batch processing and preserving formatting</li>
                        <li>Intuitive user interface for a seamless experience</li>
                    </ul>
                    <p>Don't miss out on the convenience and efficiency of extracting text from images. Start using our website today and unlock the full potential of your images!</p>
                </div>

            ) : (
                <>
                    {currentTab === 'upload' && (
                        <Suspense fallback={<LoadingComponent loadingText={"loading the image uploader"} />}>
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

            <div className="mt-8">
                <button
                    className={`px-4 py-2 rounded ${currentTab === 'upload' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                    onClick={() => handleTabClick('upload')}
                >
                    Upload
                </button>
                <button
                    className={`px-4 py-2 rounded ${currentTab === 'settings' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                    onClick={() => handleTabClick('settings')}
                >
                    Settings
                </button>
                <button
                    className={`px-4 py-2 rounded ${currentTab === 'history' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}
                    onClick={() => handleTabClick('history')}
                >
                    History
                </button>
            </div>
        </main>
    );
};

export default MainArea;
