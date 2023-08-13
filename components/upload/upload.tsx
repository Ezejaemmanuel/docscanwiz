// "use client";
// import getCurrentUser from '@/app/actions/getCurrentUser';
// import SupabaseAcceptFile from '@/app/actions/supabaseAcceptFile';
// import { error } from 'console';
// import React, { useState, useCallback, useEffect } from 'react';
// import { useDropzone } from 'react-dropzone';
// import Image from 'next/image';
// interface MyDropzoneProps { }

// const MyDropzone: React.FC<MyDropzoneProps> = async () => {
//     const email = await getCurrentUser();

//     const [filePreviews, setFilePreviews] = useState<string[]>([]);
//     const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

//     const handleFilePreview = useCallback((files: File[]) => {
//         const newFileURLs = files.map((file) => URL.createObjectURL(file));
//         setFilePreviews((prevFilePreviews) => [...prevFilePreviews, ...newFileURLs]);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: {
//             'image/png': ['.png'],
//             'image/jpeg': ['.jpg', '.jpeg'],
//         },
//         maxFiles: 10,
//         onDrop: (files: File[]) => {
//             const validFiles = files.filter((file) => file.size <= 4 * 1024 * 1024);
//             setAcceptedFiles((prevAcceptedFiles) => [...prevAcceptedFiles, ...validFiles]);
//             handleFilePreview(validFiles);
//         },
//     });

//     // const handleAddToDatabase = async () => {
//     //     // Perform actions to add all the files to the database
//     //     acceptedFiles.forEach(async (file) => {
//     //         if (file.size <= 4 * 1024 * 1024) {
//     //             // Do something with each file, such as uploading or processing
//     //             if (typeof email == "string") {
//     //                 await SupabaseAcceptFile(file, email);

//     //             } else {
//     //                 throw error;
//     //             }
//     //             console.log('Accepted file:', file);
//     //             // Add the file to the database
//     //             // ...
//     //         } else {
//     //             console.log('File size exceeds the maximum limit');
//     //         }
//     //     });
//     // };
//     const handleAddToDatabase = () => {
//         try {
//             // Perform actions to add all the files to the database
//             for (const file of acceptedFiles) {
//                 if (file.size <= 4 * 1024 * 1024) {
//                     // Do something with each file, such as uploading or processing
//                     if (typeof email == "string") {
//                         await SupabaseAcceptFile(file, email);
//                     } else {
//                         throw new Error("Email is not a string");
//                     }
//                     console.log('Accepted file:', file);
//                     // Add the file to the database
//                     // ...
//                 } else {
//                     console.log('File size exceeds the maximum limit');
//                 }
//             }
//         } catch (error) {
//             console.error("Error adding files to the database:", error);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
//         };
//     }, [filePreviews]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//             <div {...getRootProps()} className="p-4 m-4 border-2 border-dashed rounded-lg cursor-pointer">
//                 <input {...getInputProps()} />
//                 <p className="text-center">
//                     {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
//                 </p>
//                 <div className="flex flex-wrap justify-center mt-4">
//                     {filePreviews.map((fileURL) => (
//                         <Image
//                             key={fileURL}
//                             src={fileURL}
//                             alt="Preview"
//                             width={50}
//                             height={50}
//                             className="w-32 h-32 object-cover m-2 rounded-lg sm:w-48 sm:h-48"
//                         />
//                     ))}
//                 </div>
//             </div>
//             <div className="mt-4">
//                 {acceptedFiles.map((file) => (
//                     <p key={file.name} className="text-gray-700">
//                         {file.name}
//                     </p>
//                 ))}
//             </div>
//             {filePreviews.length > 0 && (
//                 <div className="mt-4">
//                     <h2 className="text-lg font-bold">File URLs:</h2>
//                     {filePreviews.map((fileURL) => (
//                         <a
//                             key={fileURL}
//                             href={fileURL}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 hover:underline"
//                         >
//                             {fileURL}
//                         </a>
//                     ))}
//                 </div>
//             )}
//             <p className="mt-4 text-gray-500">
//                 {acceptedFiles.length} {acceptedFiles.length === 1 ? 'file' : 'files'} added
//             </p>
//             <button
//                 onClick={handleAddToDatabase}
//                 className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Scan and extract text
//             </button>
//         </div>
//     );
// };

// export default MyDropzone;

// MyDropzone.tsx
"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import handleAddToDatabase from '@/app/actions/handledatabase';
import Link from 'next/link';

interface MyDropzoneProps { }

const MyDropzone: React.FC<MyDropzoneProps> = () => {

    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

    const handleFilePreview = useCallback((files: File[]) => {
        const newFileURLs = files.map((file) => URL.createObjectURL(file));
        setFilePreviews((prevFilePreviews) => [...prevFilePreviews, ...newFileURLs]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
        maxFiles: 10,
        onDrop: (files: File[]) => {
            const validFiles = files.filter((file) => file.size <= 4 * 1024 * 1024);
            setAcceptedFiles((prevAcceptedFiles) => [...prevAcceptedFiles, ...validFiles]);
            handleFilePreview(validFiles);
        },
    });

    useEffect(() => {
        return () => {
            filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
        };
    }, [filePreviews]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
            <div {...getRootProps()} className="p-4 m-4 border-2 border-dashed rounded-lg cursor-pointer">
                <input {...getInputProps()} />
                <p className="text-center">
                    {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
                </p>
                <div className="flex flex-wrap justify-center mt-4">
                    {filePreviews.map((fileURL) => (
                        <Image
                            key={fileURL}
                            src={fileURL}
                            alt="Preview"
                            width={50}
                            height={50}
                            className="w-32 h-32 object-cover m-2 rounded-lg sm:w-48 sm:h-48"
                        />
                    ))}
                </div>
            </div>
            <div className="mt-4">
                {acceptedFiles.map((file) => (
                    <p key={file.name} className="text-gray-700">
                        {file.name}
                    </p>
                ))}
            </div>
            {filePreviews.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">File URLs:</h2>
                    {filePreviews.map((fileURL) => (
                        <Link
                            key={fileURL}
                            href={fileURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {fileURL}
                        </Link>
                    ))}
                </div>
            )}
            <p className="mt-4 text-gray-500">
                {acceptedFiles.length} {acceptedFiles.length === 1 ? 'file' : 'files'} added
            </p>
            <button
                onClick={() => handleAddToDatabase(acceptedFiles)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Scan and extract text
            </button>
        </div>
    );
};

export default MyDropzone;
