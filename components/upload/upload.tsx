
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
// // };
"use client";
import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';

const Home = () => {
    const [imageData, setImageData] = useState<null | string>(null);
    console.log("imagedata 1", imageData);
    const loadFile = (file: File) => {
        const reader = new FileReader();
        console.log("this the reader 2", reader);
        reader.onloadend = () => {
            console.log("this is reader 3", reader);
            const imageDataUri = reader.result;
            console.log("this is the imageDataUri 4", imageDataUri);
            setImageData(imageDataUri as string);
            console.log("imagedata 5", imageData);

        };
        reader.readAsDataURL(file);
        console.log("this the reader 6", reader);

    };

    const [progress, setProgress] = useState(0);
    console.log("this is the initial progreess 7", progress);
    const [progressLabel, setProgressLabel] = useState('idle');
    console.log("this is the initial progreeLabel 8", progressLabel);
    const [ocrResult, setOcrResult] = useState('');
    console.log("this is the initial ocrResult 9", ocrResult);

    const workerRef = useRef<Tesseract.Worker | null>(null);
    console.log("this is the initial workerRef 10", workerRef);
    useEffect(() => {
        const loadWorker = async () => {
            console.log("this is the loadWorker 11", loadWorker);
            const worker = createWorker({
                logger: message => {
                    if ('progress' in message) {
                        console.log("this is the initial message 12", message);
                        setProgress(message.progress);
                        console.log("this is the progreess that was set 13a", progress);
                        setProgressLabel(message.progress === 1 ? 'Done' : message.status);
                        console.log("this is the set progressLbael 13b", progressLabel);
                    }
                    console.log("this is the created worker 14", worker);

                },
            });
            workerRef.current = await worker;
            console.log("this is the current workerRef 15", workerRef);
        };
        loadWorker();
        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        }
    }, []);

    const handleExtract = async () => {
        setProgress(0);
        console.log("this is the progreess that was set 16", progress);
        setProgressLabel('starting');
        console.log("this is the set progressLbael 17", progressLabel);

        const worker = workerRef.current!;
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const response = await worker.recognize(imageData!);
        setOcrResult(response.data.text);
        console.log(response.data);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (files) => loadFile(files[0]),
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        multiple: false,
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-xl">Drop the image here...</p>
                ) : (
                    <p className="text-xl">Drag  drop an image here, or click to select a file</p>
                )}
            </div>

            {imageData && <img src={imageData} alt="Uploaded" className="w-full mt-4" />}

            <button
                type="button"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleExtract}
                disabled={!imageData || !workerRef.current}
            >
                Extract
            </button>

            <p className="mt-4">{progressLabel.toUpperCase()}</p>
            <progress value={progress * 100} max="100" className="w-full h-2 mt-2" />

            {ocrResult && (
                <div className="mt-4">
                    <p className="text-xl">RESULT</p>
                    <pre className="bg-black text-white p-4">{ocrResult}</pre>
                </div>
            )}
        </div>
    );
}

export default Home;
