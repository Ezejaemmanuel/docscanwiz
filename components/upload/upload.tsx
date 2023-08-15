
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
//     }, [isSignedIn]);

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
//         if (!worker) {
//             console.error("Worker is not ready");
//             return;
//         }
//         let text = '';
//         for (const fileURL of filePreviews) {
//             const blob = await fetch(fileURL).then((response) => response.blob());
//             console.log("this is the blob", blob)
//             const file = new File([blob], 'image.png', { type: blob.type });
//             console.log("this is the file", file)
//             const { data } = await worker.recognize(file);
//             console.log("this is the data", data);
//             console.log("this is the text", text);
//             text += data.text + '\n';
//         }
//         setOcrText(text);
//     }, [filePreviews]);

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
//                 {postOCRText.isError && <ErrorDisplayComponent errorMessage={'Something went wrong'} />}
//             </form>
//         </div>);
// };
"use client";
import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from "@clerk/nextjs";
// import SignInComponent from '../YouAreNotSignedIn';
import Image from 'next/image';
// import { useMutation } from '@tanstack/react-query';
// import ErrorDisplayComponent from '../ErrorInComponent';
import { createWorker } from 'tesseract.js';

const MyDropzone: React.FC = () => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [ocrText, setOcrText] = useState("");
    const [progressLabel, setProgressLabel] = useState("idle");
    const [progress, setProgress] = useState(0);
    const workerRef = useRef<any>(null);
    // const isSignedIn = useAuth().isSignedIn;
    const worker = workerRef.current;

    const loadFile = useCallback((files: File[]) => {
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUri = reader.result as string;
                setFilePreviews((prevAcceptedFiles) => [...prevAcceptedFiles, imageDataUri]);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        onDrop: (files) => {
            loadFile(files);
        }
    });

    useEffect(() => {
        workerRef.current = createWorker({
            logger: (m: any) => {
                console.log('OCR Logger:', m);
                if (m.status === 'recognizing text') {
                    setProgress(m.progress);
                    setProgressLabel(m.status);
                }
            }
        });

        return () => {
            if (worker) {
                worker.terminate();
            }
        };
    }, [worker]);

    const handleExtract = useCallback(async () => {
        console.log('Starting OCR extraction');
        setProgress(0);
        setProgressLabel('starting');
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        let text = "";
        for (const fileURL of filePreviews) {
            const { data } = await worker.recognize(fileURL);
            text += data.text + '\n';
        }
        setOcrText(text);
        console.log('OCR extraction complete');
    }, [filePreviews, worker]);

    console.log('filePreviews:', filePreviews);
    console.log('ocrText:', ocrText);
    console.log('progressLabel:', progressLabel);
    console.log('progress:', progress);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-black">
            {/* Display the dropzone */}
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>

            {/* Display the file previews */}
            {filePreviews.map((file, index) => (
                <div key={index}>
                    <Image src={file} alt={`File ${index + 1}`} />
                </div>
            ))}

            {/* Display the OCR text */}
            <div>
                {ocrText && <p>{ocrText}</p>}
            </div>

            {/* Extract button */}
            <button
                type="button"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleExtract}
                disabled={filePreviews.length === 0}
            >
                Extract
            </button>

            {/* Display the progress and status of the OCR operation */}
            <div>
                <p>{progressLabel.toUpperCase()}</p>
                <progress value={progress * 100} max="100" />
            </div>
        </div>
    );
};

export default MyDropzone;
