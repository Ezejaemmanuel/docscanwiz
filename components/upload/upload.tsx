
// import React, { useState, useEffect, useCallback } from 'react';
// import { createWorker, ImageLike } from 'tesseract.js';
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
//         const workerInstance = await createWorker({
//             logger: (m) => console.log(m),
//         });
//         await workerInstance.load();
//         await workerInstance.loadLanguage('eng');
//         await workerInstance.initialize('eng');
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

//     useEffect(() => {
//         return () => {
//             filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
//         };
//     }, [filePreviews]);

//     const postMutation = useMutation(async (text: string) => {
//         const response = await fetch('/api/postOcrText', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text })
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     });

//     const performOCR = useCallback(async (event: { preventDefault: () => void; }) => {
//         event.preventDefault();
//         let text = '';
//         for (const fileURL of filePreviews) {
//             const blob = await fetch(fileURL).then((response) => response.blob());
//             const file = new File([blob], 'image.png', { type: blob.type });
//             const { data } = await worker.recognize(file);
//             text += data.text + '\n';
//         }
//         setOcrText(text);
//         postMutation.mutate(text);
//     }, [filePreviews, postMutation, worker]);

//     if (!isSignedIn) {
//         return <SignInComponent />;
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={performOCR} className="max-w-md w-full p-8 bg-white rounded-md shadow-md space-y-4">
//                 <div {...getRootProps()} className="p-4 border-2 border-dashed rounded-lg cursor-pointer">
//                     <input {...getInputProps()} />
//                     <p className="text-center">
//                         {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
//                     </p>
//                     {filePreviews.map((file, index) => (
//                         <div key={index}>
//                             <img src={file} alt={`preview ${index}`} style={{ width: '100%', maxWidth: '300px' }} />
//                         </div>
//                     ))}
//                 </div>
//                 <button
//                     type="submit"
//                     className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     disabled={postMutation.isLoading}
//                 >
//                     {postMutation.isLoading ? 'Performing OCR...' : 'Perform OCR'}
//                 </button>
//                 {postMutation.isError && <ErrorDisplayComponent errorMessage={"THERE IS AN ERROR SOMEWHERE "} />}
//                 {postMutation.isSuccess && <div className="mt-2 text-green-600">Successfully posted OCR text</div>}
//                 {ocrText && (
//                     <div className="mt-8">
//                         <h2 className="text-lg font-bold">OCR Text:</h2>
//                         <pre className="mt-2 bg-gray-200 p-4 rounded">{ocrText}</pre>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };


// export default MyDropzone;
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { createWorker, ImageLike } from 'tesseract.js';
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
        const workerInstance = await createWorker({
            logger: (m) => console.log(m),
        });
        await workerInstance.load();
        await workerInstance.loadLanguage('eng');
        await workerInstance.initialize('eng');
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
    }, [isSignedIn, initializeWorker, worker]);

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

    useEffect(() => {
        return () => {
            filePreviews.forEach((fileURL) => URL.revokeObjectURL(fileURL));
        };
    }, [filePreviews]);

    const postMutation = useMutation(async (text: string) => {
        const response = await fetch('/api/postOcrText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });

    const performOCR = useCallback(async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let text = '';
        for (const fileURL of filePreviews) {
            const blob = await fetch(fileURL).then((response) => response.blob());
            const file = new File([blob], 'image.png', { type: blob.type });
            const { data } = await worker.recognize(file);
            text += data.text + '\n';
        }
        setOcrText(text);
    }, [filePreviews, worker]);

    const addTextToDatabase = useCallback(async () => {
        postMutation.mutate(ocrText);
    }, [ocrText, postMutation]);

    if (!isSignedIn) {
        return <SignInComponent />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={performOCR} className="max-w-md w-full p-8 bg-white rounded-md shadow-md space-y-4">
                <div {...getRootProps()} className="p-4 border-2 border-dashed rounded-lg cursor-pointer">
                    <input {...getInputProps()} className="cursor-pointer" />
                    <p className="text-center">
                        {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
                    </p>
                    {filePreviews.map((file, index) => (
                        <div key={index} className="p-4">
                            <img src={file} alt={`preview ${index}`} className="w-full max-w-[300px]" />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={postMutation.isLoading}
                >
                    {postMutation.isLoading ? 'Performing OCR...' : 'Perform OCR'}
                </button>
                {ocrText && (
                    <div className="mt-8">
                        <h2 className="text-lg font-bold">OCR Text:</h2>
                        <pre className="mt-2 bg-gray-200 p-4 rounded">{ocrText}</pre>
                    </div>
                )}
                {ocrText && (
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addTextToDatabase}
                        disabled={postMutation.isLoading}
                    >
                        {postMutation.isLoading ? 'Adding to Database...' : 'Add to Database'}
                    </button>
                )}
                {postMutation.isError && <ErrorDisplayComponent errorMessage={'some thing happened'} />}
                {postMutation.isSuccess && <div className="mt-2 text-green-600">Successfully posted OCR text</div>}
            </form>
        </div>
    );
};

export default MyDropzone;
