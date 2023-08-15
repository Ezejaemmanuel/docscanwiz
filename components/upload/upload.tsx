
// "use client";
// import React, { useState, useEffect, useCallback } from 'react';
// import { createWorker } from 'tesseract.js';
// import { useDropzone } from 'react-dropzone';
// import { useAuth } from "@clerk/nextjs";
// import SignInComponent from '../YouAreNotSignedIn';
// import Image from 'next/image';
// import { useMutation } from '@tanstack/react-query';
// import ErrorDisplayComponent from '../ErrorInComponent';

// const MyDropzone: React.FC = () => {
//     const [filePreviews, setFilePreviews] = useState<string[]>([]);
//     const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
//     const [ocrText, setOcrText] = useState<string>('');
//     const [worker, setWorker] = useState<any>(null);
//     const isSignedIn = useAuth().isSignedIn;

//     const initializeWorker = useCallback(async () => {
//         const workerInstance = createWorker({
//             logger: (m) => console.log(m),
//         });
//         await (await workerInstance).load();
//         await (await workerInstance).loadLanguage('eng');
//         await (await workerInstance).initialize('eng');
//         setWorker(workerInstance);
//     }, []);

//     useEffect(() => {
//         if (isSignedIn) {
//             initializeWorker();
//         }

//         return () => {
//             if (worker) {
//                 worker.terminate();
//             }
//         };
//     }, [isSignedIn, initializeWorker, worker]);

//     const handleFilePreview = useCallback((files: File[]) => {
//         const fileURLs = files.map((file) => URL.createObjectURL(file));
//         setFilePreviews((prevAcceptedFiles) => [...prevAcceptedFiles, ...fileURLs]);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: {
//             "image/png": [".png"],
//             "image/jpeg": [".jpg", ".jpeg"],
//         },
//         onDrop: (files) => {
//             setAcceptedFiles(files);
//             handleFilePreview(files);
//         },
//     });

//     const performOCR = useCallback(async () => {
//         let text = '';
//         for (const fileURL of filePreviews) {
//             const blob = await fetch(fileURL).then((response) => response.blob());
//             const file = new File([blob], 'image.png', { type: blob.type });
//             const { data } = await worker.recognize(file);
//             text += data.text + '\n';
//         }
//         setOcrText(text);
//     }, [filePreviews, worker]);

//     const postOCRText = useMutation(async (text: string) => {
//         const response = await fetch('/api/postOcrText', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ text }),
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     });

//     const addTextToDatabase = useCallback(async () => {
//         await postOCRText.mutateAsync(ocrText);
//     }, [ocrText, postOCRText]);

//     if (!isSignedIn) {
//         return <SignInComponent />;
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black">
//             <form className="max-w-md w-full p-8 dark:bg-black rounded-md shadow-md space-y-4">
//                 <div {...getRootProps()} className="p-4 border-2 border-dashed rounded-lg cursor-pointer">
//                     <input {...getInputProps()} className="cursor-pointer" />
//                     <p className="text-center">
//                         {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
//                     </p>
//                     {filePreviews.map((file, index) => (
//                         <div key={index} className="p-4">
//                             <Image src={file} alt={`preview ${index}`} width={200} height={200} className="w-full max-w-[300px]" />
//                         </div>
//                     ))}
//                 </div>
//                 <button
//                     type="button"
//                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     onClick={performOCR}
//                     disabled={filePreviews.length === 0}
//                 >
//                     Preview
//                 </button>
//                 {ocrText && (
//                     <div className="mt-8">
//                         <h2 className="text-lg font-bold">OCR Text:</h2>
//                         <pre className="mt-2 bg-gray-200 p-4 rounded">{ocrText}</pre>
//                     </div>
//                 )}
//                 {ocrText && (
//                     <button
//                         type="button"
//                         className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         onClick={addTextToDatabase}
//                         disabled={postOCRText.isLoading}
//                     >
//                         {postOCRText.isLoading ? 'Adding to Database...' : 'Add to Database'}
//                     </button>
//                 )}
//                 {postOCRText.isError && <ErrorDisplayComponent errorMessage={'Something somthing oppdfosjgajp went wrong'} />}
//             </form>
//         </div>);
// };

// export default MyDropzone;
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createWorker } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import { useAuth } from "@clerk/nextjs";
import SignInComponent from '../YouAreNotSignedIn';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import ErrorDisplayComponent from '../ErrorInComponent';

const MyDropzone: React.FC = () => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [ocrText, setOcrText] = useState<string>('');
    const [worker, setWorker] = useState<any>(null);
    const isSignedIn = useAuth().isSignedIn;

    const initializeWorker = useCallback(async () => {
        const workerInstance = createWorker({
            logger: (m) => console.log(m),
        });
        await (await workerInstance).loadLanguage('eng');
        await (await workerInstance).initialize('eng');
        setWorker(workerInstance);
    }, []);

    useEffect(() => {
        if (isSignedIn) {
            initializeWorker();
        }

        return () => {
            if (worker) {
                worker.terminate();
            }
        };
    }, [isSignedIn]);

    const handleFilePreview = useCallback((files: File[]) => {
        const fileURLs = files.map((file) => URL.createObjectURL(file));
        setFilePreviews((prevAcceptedFiles) => [...prevAcceptedFiles, ...fileURLs]);
    }, []);

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

    const performOCR = useCallback(async () => {
        let text = '';
        for (const fileURL of filePreviews) {
            const blob = await fetch(fileURL).then((response) => response.blob());
            console.log("this is the blob", blob)
            const file = new File([blob], 'image.png', { type: blob.type });
            console.log("this is the file", file)
            const { data } = await worker.recognize(file);
            console.log("this is the data", data);
            console.log("this is the text", text);
            text += data.text + '\n';
        }
        setOcrText(text);
    }, [filePreviews]);

    const postOCRText = useMutation(async (text: string) => {
        const response = await fetch('/api/postOcrText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });

    const addTextToDatabase = useCallback(async () => {
        await postOCRText.mutateAsync(ocrText);
    }, [ocrText, postOCRText]);

    if (!isSignedIn) {
        return <SignInComponent />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black">
            <form className="max-w-md w-full p-8 dark:bg-black rounded-md shadow-md space-y-4">
                <div {...getRootProps()} className="p-4 border-2 border-dashed rounded-lg cursor-pointer">
                    <input {...getInputProps()} className="cursor-pointer" />
                    <p className="text-center">
                        {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
                    </p>
                    {filePreviews.map((file, index) => (
                        <div key={index} className="p-4">
                            <Image src={file} alt={`preview ${index}`} width={200} height={200} className="w-full max-w-[300px]" />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={performOCR}
                    disabled={filePreviews.length === 0}
                >
                    Preview
                </button>
                {ocrText && (
                    <div className="mt-8">
                        <h2 className="text-lg font-bold">OCR Text:</h2>
                        <pre className="mt-2 bg-gray-200 p-4 rounded">{ocrText}</pre>
                    </div>
                )}
                {ocrText && (
                    <button
                        type="button"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addTextToDatabase}
                        disabled={postOCRText.isLoading}
                    >
                        {postOCRText.isLoading ? 'Adding to Database...' : 'Add to Database'}
                    </button>
                )}
                {postOCRText.isError && <ErrorDisplayComponent errorMessage={'Something went wrong'} />}
            </form>
        </div>);
};

export default MyDropzone;
