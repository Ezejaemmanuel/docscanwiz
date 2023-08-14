
// "use client";
// import React, { useState, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import LoadingComponent from "../aboutToLoad";
// import ErrorDisplayComponent from "../ErrorInComponent";
// import { useMutation } from "@tanstack/react-query";
// import { useAuth } from "@clerk/nextjs";
// import Link from "next/link";

// interface MyDropzoneProps { }

// const MyDropzone: React.FC<MyDropzoneProps> = () => {
//     const [filePreviews, setFilePreviews] = useState<string[]>([]);
//     const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
//     const [reachedMaxFiles, setReachedMaxFiles] = useState(false);
//     const isUser = useAuth().isSignedIn;

//     const handleFilePreview = (files: File[]) => {
//         const fileURLs = files.map((file) => URL.createObjectURL(file));
//         setFilePreviews((prevAcceptedFiles) => [...prevAcceptedFiles, ...fileURLs]);
//     };

//     const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
//         accept: {
//             "image/png": [".png"],
//             "image/jpeg": [".jpg", ".jpeg"],
//         },
//         maxSize: 4 * 1024 * 1024,
//         maxFiles: 5,
//         onDrop: (files: File[]) => {
//             const validFiles = files.filter((file) => file.size <= 4 * 1024 * 1024);
//             setAcceptedFiles((prevAcceptedFiles) => [...prevAcceptedFiles, ...validFiles]);
//             handleFilePreview(validFiles);
//             if (acceptedFiles.length + validFiles.length >= 5) {
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
//         const formData = new FormData();

//         if (data && isUser) {
//             for (const file of data) {
//                 formData.append("files", file);
//             }
//         } else {
//             throw new Error("File not found or User not Found");
//         }

//         const res = await fetch("api/addToStorage", {
//             method: "POST",
//             body: formData,
//         });

//         if (!res.ok) {
//             const errorData = await res.json();
//             throw new Error(`Server responded with: ${errorData.error}`);
//         }

//         return res.json();
//     };

//     const mutation = useMutation(sendFilesToDatabase, {
//         onError: (error: any) => console.error("Failed to add file to database", error),
//     });

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         mutation.mutate(acceptedFiles);
//     };

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
//                     <form onSubmit={handleSubmit}>
//                         <div
//                             {...getRootProps()}
//                             className={`p-4 m-4 border-2 border-dashed rounded-lg cursor-pointer ${reachedMaxFiles ? "opacity-50" : ""
//                                 }`}
//                         >
//                             <input {...getInputProps()} />
//                             {reachedMaxFiles ? (
//                                 <p className="text-red-500">Reached maximum image input</p>
//                             ) : (
//                                 <p className="text-center">{isDragActive ? "Drop the files here" : "Drag and drop files here"}</p>
//                             )}
//                         </div>
//                         <div className="mt-4">
//                             {acceptedFiles.map((file) => (
//                                 <p key={file.name} className="text-gray-700">
//                                     {file.name}
//                                 </p>
//                             ))}
//                         </div>
//                         {filePreviews.length > 0 && (
//                             <div className="mt-4">
//                                 <h2 className="text-lg font-bold">File URLs:</h2>
//                                 {filePreviews.map((fileURL) => (
//                                     <div key={fileURL} className="mt-2">
//                                         <Image src={fileURL} alt="Preview" width={200} height={200} />
//                                         <Link href={fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                                             {fileURL}
//                                         </Link>
//                                     </div>
//                                 ))}
//                                 <p className="mt-4 text-gray-500">
//                                     {acceptedFiles.length} {acceptedFiles.length === 1 ? "file" : "files"} added
//                                 </p>
//                                 <button
//                                     type="submit"
//                                     disabled={mutation.isLoading || reachedMaxFiles}
//                                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                                 >
//                                     Submit
//                                 </button>
//                             </div>
//                         )}
//                     </form>
//                 </>
//             )}
//         </div>
//     );
// };

// export default MyDropzone;
import React, { useState, useEffect } from 'react';
import { createWorker, ImageLike } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import { useAuth } from "@clerk/nextjs";
import SignInComponent from '../YouAreNotSignedIn';

const MyDropzone: React.FC = () => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [ocrText, setOcrText] = useState<string>('');
    const [worker, setWorker] = useState<any>(null);
    const isSignedIn = useAuth().isSignedIn;
    if (!isSignedIn) {
        return <SignInComponent />
    }
    useEffect(() => {
        const initializeWorker = async () => {
            const workerInstance = await createWorker({
                logger: (m) => console.log(m),
            });
            await workerInstance.load();
            await workerInstance.loadLanguage('eng');
            await workerInstance.initialize('eng');
            setWorker(workerInstance);
        };

        initializeWorker();

        return () => {
            if (worker) {
                worker.terminate();
            }
        };
    }, []);

    const handleFilePreview = (files: File[]) => {
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setFilePreviews((prevAcceptedFiles) => [...prevAcceptedFiles, ...fileURLs]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        onDrop: (files) => {
            setAcceptedFiles(files);
            handleFilePreview(files);
        },
    });

    useEffect(() => {
        return () => {
            filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
        };
    }, [filePreviews]);

    const performOCR = async () => {
        let text = '';
        for (const fileURL of filePreviews) {
            const image: ImageLike = { url: fileURL } as unknown as ImageLike;
            const { data } = await worker.recognize(image);
            text += data.text + '\n';
        }
        setOcrText(text);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={performOCR} className="max-w-md w-full p-8 bg-white rounded-md shadow-md space-y-4">
                <div {...getRootProps()} className="p-4 border-2 border-dashed rounded-lg cursor-pointer">
                    <input {...getInputProps()} />
                    <p className="text-center">
                        {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
                    </p>
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
                        <h2 className="text-lg font-bold">File Previews:</h2>
                        {filePreviews.map((fileURL) => (
                            <div key={fileURL} className="mt-2">
                                <img src={fileURL} alt="Preview" className="w-40 h-40 object-contain" />
                                <a
                                    href={fileURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {fileURL}
                                </a>
                            </div>
                        ))}
                    </div>
                )}
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Perform OCR
                </button>
                {ocrText && (
                    <div className="mt-8">
                        <h2 className="text-lg font-bold">OCR Text:</h2>
                        <pre className="mt-2 bg-gray-200 p-4 rounded">{ocrText}</pre>
                    </div>
                )}
            </form>
        </div>
    );
};

export default MyDropzone;
