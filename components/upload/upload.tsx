
// "use client";
// import { useEffect, useRef, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import { useDropzone } from 'react-dropzone';

// const Home = () => {
//     const [imageData, setImageData] = useState<null | string>(null);
//     const loadFile = (file: File) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const imageDataUri = reader.result;
//             setImageData(imageDataUri as string);
//         };
//         reader.readAsDataURL(file);
//     };

//     const [progress, setProgress] = useState(0);
//     const [progressLabel, setProgressLabel] = useState('idle');
//     const [ocrResult, setOcrResult] = useState('');

//     const workerRef = useRef<Tesseract.Worker | null>(null);
//     useEffect(() => {
//         const loadWorker = async () => {
//             const worker = createWorker({
//                 logger: message => {
//                     if ('progress' in message) {
//                         setProgress(message.progress);
//                         setProgressLabel(message.progress === 1 ? 'Done' : message.status);
//                     }
//                 },
//             });
//             workerRef.current = await worker;
//         };
//         loadWorker();
//         return () => {
//             workerRef.current?.terminate();
//             workerRef.current = null;
//         }
//     }, []);

//     const handleExtract = async () => {
//         setProgress(0);
//         setProgressLabel('starting');

//         const worker = workerRef.current!;
//         await worker.load();
//         await worker.loadLanguage('eng');
//         await worker.initialize('eng');

//         const response = await worker.recognize(imageData!);
//         setOcrResult(response.data.text);
//     };

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop: (files) => loadFile(files[0]),
//         accept: {
//             "image/png": [".png"],
//             "image/jpeg": [".jpg", ".jpeg"],
//         },
//         multiple: false,
//     });

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//             <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed dark:bg-black">
//                 <input {...getInputProps()} />
//                 {isDragActive ? (
//                     <p className="text-xl">Drop the image here...</p>
//                 ) : (
//                     <p className="text-xl">Drag and drop an image here, or click to select a file</p>
//                 )}
//             </div>

//             {imageData && <img src={imageData} alt="Uploaded" className="w-full mt-4" />}

//             <button
//                 type="button"
//                 className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleExtract}
//                 disabled={!imageData || !workerRef.current}
//             >
//                 Extract
//             </button>

//             <p className="mt-4">{progressLabel.toUpperCase()}</p>
//             <progress value={progress * 100} max="100" className="w-full h-2 mt-2" />

//             {ocrResult && (
//                 <div className="mt-4 border-2 border-gray-300 dark:border-gray-700 p-2">
//                     <p className="text-xl">RESULT</p>
//                     <pre className="bg-black text-white p-4">{ocrResult}</pre>
//                 </div>
//             )}
//         </div>
//     );
// }

// // export default Home;
// "use client";
// import { useEffect, useRef, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import { useDropzone } from 'react-dropzone';
// import { useMutation } from '@tanstack/react-query';

// const Home = () => {
//     const [imageData, setImageData] = useState<null | string>(null);
//     const loadFile = (file: File) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             const imageDataUri = reader.result;
//             setImageData(imageDataUri as string);
//         };
//         reader.readAsDataURL(file);
//     };

//     const [progress, setProgress] = useState(0);
//     const [progressLabel, setProgressLabel] = useState('idle');
//     const [ocrResult, setOcrResult] = useState('');

//     const workerRef = useRef<Tesseract.Worker | null>(null);
//     useEffect(() => {
//         const loadWorker = async () => {
//             const worker = createWorker({
//                 logger: message => {
//                     if ('progress' in message) {
//                         setProgress(message.progress);
//                         setProgressLabel(message.progress === 1 ? 'Done' : message.status);
//                     }
//                 },
//             });
//             workerRef.current = await worker;
//         };
//         loadWorker();
//         return () => {
//             workerRef.current?.terminate();
//             workerRef.current = null;
//         }
//     }, []);

//     const handleExtract = async () => {
//         setProgress(0);
//         setProgressLabel('starting');

//         const worker = workerRef.current!;
//         await worker.load();
//         await worker.loadLanguage('eng');
//         await worker.initialize('eng');

//         const response = await worker.recognize(imageData!);
//         setOcrResult(response.data.text);
//     };

//     const mutation = useMutation((ocrResult: string) =>
//         fetch('/api/ocr', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ ocrResult }),
//         }).then(res => {
//             if (!res.ok) {
//                 return res.json().then((json) => {
//                     throw new Error(json.message || 'Something went wrong');
//                 });
//             }
//             return res.json();
//         })
//     );

//     const handleSendToDatabase = () => {
//         mutation.mutate(ocrResult);
//     };

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop: (files) => loadFile(files[0]),
//         accept: {
//             "image/png": [".png"],
//             "image/jpeg": [".jpg", ".jpeg"],
//         },
//         multiple: false,
//     });

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//             <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed dark:bg-black">
//                 <input {...getInputProps()} />
//                 {isDragActive ? (
//                     <p className="text-xl">Drop the image here...</p>
//                 ) : (
//                     <p className="text-xl">Drag 'n' drop an image here, or click to select a file</p>
//                 )}
//             </div>

//             {imageData && <img src={imageData} alt="Uploaded" className="w-full mt-4" />}

//             <button
//                 type="button"
//                 className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={handleExtract}
//                 disabled={!imageData || !workerRef.current}
//             >
//                 Extract
//             </button>

//             <p className="mt-4">{progressLabel.toUpperCase()}</p>
//             <progress value={progress * 100} max="100" className="w-full h-2 mt-2" />

//             {ocrResult && (
//                 <div className="mt-4 border-2 border-gray-300 dark:border-gray-700 p-2">
//                     <p className="text-xl">RESULT</p>
//                     <pre className="bg-black text-white p-4">{ocrResult}</pre>
//                     <button
//                         type="button"
//                         className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                         onClick={handleSendToDatabase}
//                         disabled={mutation.isLoading}
//                     >
//                         {mutation.isLoading ? "Sending..." : "Send to Database"}
//                     </button>
//                     {mutation.isError && <div>An error occurred: {mutation.error.message}</div>}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Home;
"use client";
import { useEffect, useRef, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@tanstack/react-query';
import Image from "next/image";

const Home = () => {
    const [imageData, setImageData] = useState<null | string>(null);
    const loadFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            setImageData(imageDataUri as string);
        };
        reader.readAsDataURL(file);
    };

    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState('idle');
    const [ocrResult, setOcrResult] = useState('');

    const workerRef = useRef<Tesseract.Worker | null>(null);
    useEffect(() => {
        const loadWorker = async () => {
            const worker = createWorker({
                logger: message => {
                    if ('progress' in message) {
                        setProgress(message.progress);
                        setProgressLabel(message.progress === 1 ? 'Done' : message.status);
                    }
                },
            });
            workerRef.current = await worker;
        };
        loadWorker();
        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        }
    }, []);

    const handleExtract = async () => {
        setProgress(0);
        setProgressLabel('starting');

        const worker = workerRef.current!;
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const response = await worker.recognize(imageData!);
        setOcrResult(response.data.text);
    };

    const mutation = useMutation((ocrResult: string) =>
        fetch('/api/recieveTextAndAddToDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: uuidv4(), ocrResult }),
        }).then(async res => {
            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.message || 'Something went wrong');
            }
            return res.json();
        })
    );

    const handleSendToDatabase = () => {
        mutation.mutate(ocrResult);
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed dark:bg-black">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-xl">Drop the image here...</p>
                ) : (
                    <p className="text-xl">Drag and drop an image here, or click to select a file</p>
                )}
            </div>

            {imageData && <Image src={imageData} alt="Uploaded" width={400} height={400} className="w-full mt-4" />}

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
                <div className="mt-4 border-2 border-gray-300 dark:border-gray-700 p-2">
                    <p className="text-xl">RESULT</p>
                    <pre className="bg-black text-white p-4">{ocrResult}</pre>
                    <button
                        type="button"
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSendToDatabase}
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Sending..." : "Send to Database"}
                    </button>
                    {mutation.isError && <div>An error occurred: {mutation.isError && <div>An error occurred: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}</div>}
                    </div>}
                    {mutation.isSuccess && <div>Mutation was successful</div>}
                </div>
            )}
        </div>
    );
}

export default Home;
