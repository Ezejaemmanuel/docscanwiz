
// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import Link from "next/link";
// import getCurrentUser from '@/app/actions/getCurrentUser';
// import LoadingComponent from "../aboutToLoad";
// import ErrorDisplayComponent from "../ErrorInComponent";
// import { useMutation } from "@tanstack/react-query";


// interface MyDropzoneProps { }
// interface ErrorProps {
//     message: string | undefined;
// }

// const ErrorComponent: React.FC<ErrorProps> = ({ message }) => (
//     <div>
//         <span> An error occurred: {message}</span>
//     </div>
// );

// const MyDropzone: React.FC<MyDropzoneProps> = () => {
//     const [filePreviews, setFilePreviews] = useState<string[]>([]);
//     const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
//     const [reachedMaxFiles, setReachedMaxFiles] = useState(false); // Track if the maximum file limit is reached

//     const handleFilePreview = useCallback((files: File[]) => {
//         const newFileURLs = files.map((file) => URL.createObjectURL(file));
//         setFilePreviews((prevFilePreviews) => [...prevFilePreviews, ...newFileURLs]);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
//         accept: {
//             "image/png": [".png"],
//             "image/jpeg": [".jpg", ".jpeg"],
//         },
//         maxFiles: 5, // Set the maximum files to 5
//         onDrop: (files: File[]) => {
//             if (acceptedFiles.length >= 5) {
//                 // Do not allow more than 5 files
//                 return;
//             }

//             const validFiles = files.filter((file) => file.size <= 4 * 1024 * 1024);
//             setAcceptedFiles((prevAcceptedFiles) => [...prevAcceptedFiles, ...validFiles]);
//             handleFilePreview(validFiles);

//             if (acceptedFiles.length + validFiles.length >= 5) {
//                 // Set reachedMaxFiles to true when the total files reach the maximum
//                 setReachedMaxFiles(true);
//             }
//         },
//     });

//     useEffect(() => {
//         return () => {
//             filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
//         };
//     }, [filePreviews]);

//     const sendFilesToDatabase = async (data: File[]) => {
//         const email = await getCurrentUser() as unknown as string;
//         const formData = new FormData();
//         if (typeof email == "string") {
//             for (const file of data) {
//                 if (file.size <= 4 * 1024 * 1024) {
//                     formData.append('files', file);
//                 } else {
//                     console.log('File size exceeds the maximum limit');
//                 }
//             }
//         } else {
//             throw new Error("Email is not a string");
//         }

//         const res = await fetch("api/addToStorage", {
//             method: 'POST',
//             body: formData
//         });
//         if (!res.ok) {
//             throw new Error('Failed to submit the file');
//         }
//         return res.json();
//     };

//     const mutation = useMutation(sendFilesToDatabase, {
//         onError: (error: any) => console.error("Failed to add file to database", error),
//     });

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
//             {mutation.isLoading ? (
//                 <LoadingComponent loadingText={"adding files to database"} />
//             ) : (
//                 <>
//                     {mutation.isError && <ErrorDisplayComponent errorMessage={mutation.error?.message} />}
//                     {mutation.isSuccess && (
//                         <div>
//                             Files added!
//                             <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
//                         </div>
//                     )}
//                     <div
//                         {...getRootProps()}
//                         className={`p-4 m-4 border-2 border-dashed rounded-lg cursor-pointer ${reachedMaxFiles ? 'opacity-50' : ''
//                             }`}
//                     >
//                         <input {...getInputProps()} />
//                         {reachedMaxFiles ? (
//                             <p className="text-red-500">Reached maximum image input</p>
//                         ) : (
//                             <p className="text-center">
//                                 {isDragActive ? "Drop the files here" : "Drag and drop files here"}
//                             </p>
//                         )}
//                         <div className="flex flex-wrap justify-center mt-4">
//                             {filePreviews.map((fileURL) => (
//                                 <Image
//                                     key={fileURL}
//                                     src={fileURL}
//                                     alt="Preview"
//                                     width={50}
//                                     height={50}
//                                     className="w-32 h-32 object-cover m-2 rounded-lg sm:w-48 sm:h-48"
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                     <div className="mt-4">
//                         {acceptedFiles.map((file) => (
//                             <p key={file.name} className="text-gray-700">
//                                 {file.name}
//                             </p>
//                         ))}
//                     </div>
//                     {filePreviews.length > 0 && (
//                         <div className="mt-4">
//                             <h2 className="text-lg font-bold">File URLs:</h2>
//                             {filePreviews.map((fileURL) => (
//                                 <Link
//                                     key={fileURL}
//                                     href={fileURL}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-500 hover:underline"
//                                 >
//                                     {fileURL}
//                                 </Link>
//                             ))}
//                         </div>
//                     )}
//                     <p className="mt-4 text-gray-500">
//                         {acceptedFiles.length} {acceptedFiles.length === 1 ? "file" : "files"} added
//                     </p>
//                     <button
//                         onClick={() => mutation.mutate(acceptedFiles)}
//                         className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                         Scan and extract text
//                     </button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MyDropzone;
"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import Link from "next/link";
//import getCurrentUser from '@/app/actions/getCurrentUser';
import LoadingComponent from "../aboutToLoad";
import ErrorDisplayComponent from "../ErrorInComponent";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
interface MyDropzoneProps { }
interface ErrorProps {
    message: string | undefined;
}

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => (
    <div>
        <span> An error occurred: {message}</span>
    </div>
);

const MyDropzone: React.FC<MyDropzoneProps> = () => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [reachedMaxFiles, setReachedMaxFiles] = useState(false);
    const isUser = useAuth().isSignedIn;
    const handleFilePreview = useCallback((files: File[]) => {
        const newFileURLs = files.map((file) => URL.createObjectURL(file));
        setFilePreviews((prevFilePreviews) => [...prevFilePreviews, ...newFileURLs]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        maxFiles: 5,
        onDrop: (files: File[]) => {
            if (acceptedFiles.length >= 5) {
                return;
            }
            const validFiles = files.filter((file) => file.size <= 4 * 1024 * 1024);
            setAcceptedFiles((prevAcceptedFiles) => [...prevAcceptedFiles, ...validFiles]);
            handleFilePreview(validFiles);
            if (acceptedFiles.length + validFiles.length >= 5) {
                setReachedMaxFiles(true);
            }
        },
    });

    useEffect(() => {
        return () => {
            filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
        };
    }, [filePreviews]);

    const sendFilesToDatabase = async (data: File[]) => {
        //const email = await getCurrentUser() as unknown as string;

        const formData = new FormData();

        if (data && isUser) {
            for (const file of data) {
                if (file.size <= 4 * 1024 * 1024) {
                    formData.append('files', file);
                } else {
                    console.log('File size exceeds the maximum limit');
                }
            }
        } else {
            throw new Error("File not found or User not Found");
        }

        const res = await fetch("api/addToStorage", {
            method: 'POST',
            body: formData
        });
        if (!res.ok) {
            throw new Error('Failed to submit the file');
        }
        return res.json();
    };

    const mutation = useMutation(sendFilesToDatabase, {
        onError: (error: any) => console.error("Failed to add file to database", error),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(acceptedFiles);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
            {mutation.isLoading ? (
                <LoadingComponent loadingText={"adding files to database"} />
            ) : (
                <>
                    {mutation.isError && <ErrorDisplayComponent errorMessage={mutation.error?.message} />}
                    {mutation.isSuccess && (
                        <div>
                            Files added!
                            <pre>{JSON.stringify(mutation.data, null, 2)}</pre>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div
                            {...getRootProps()}
                            className={`p-4 m-4 border-2 border-dashed rounded-lg cursor-pointer ${reachedMaxFiles ? 'opacity-50' : ''
                                }`}
                        >
                            <input {...getInputProps()} />
                            {reachedMaxFiles ? (
                                <p className="text-red-500">Reached maximum image input</p>
                            ) : (
                                <p className="text-center">
                                    {isDragActive ? "Drop the files here" : "Drag and drop files here"}
                                </p>
                            )}
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

                                <div className="mt-4">
                                    <h2 className="text-lg font-bold">File URLs:</h2>
                                    {filePreviews.map((fileURL) => (
                                        <a
                                            key={fileURL}
                                            href={fileURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {fileURL}
                                        </a>
                                    ))}
                                </div>
                                <p className="mt-4 text-gray-500">
                                    {acceptedFiles.length} {acceptedFiles.length === 1 ? "file" : "files"} added
                                </p>
                                <button
                                    type="submit"
                                    disabled={mutation.isLoading || reachedMaxFiles}
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </>
            )
            }
        </div>
    )



};

export default MyDropzone;
