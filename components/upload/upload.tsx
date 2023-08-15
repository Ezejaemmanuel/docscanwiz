
// "use client";
// import { useEffect, useRef, useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import { useDropzone } from 'react-dropzone';

// const Home = () => {
//     const [imageData, setImageData] = useState<null | string>(null);
//     console.log("imagedata 1", imageData);
//     const loadFile = (file: File) => {
//         const reader = new FileReader();
//         console.log("this the reader 2", reader);
//         reader.onloadend = () => {
//             console.log("this is reader 3", reader);
//             const imageDataUri = reader.result;
//             console.log("this is the imageDataUri 4", imageDataUri);
//             setImageData(imageDataUri as string);
//             console.log("imagedata 5", imageData);

//         };
//         reader.readAsDataURL(file);
//         console.log("this the reader 6", reader);

//     };

//     const [progress, setProgress] = useState(0);
//     console.log("this is the initial progreess 7", progress);
//     const [progressLabel, setProgressLabel] = useState('idle');
//     console.log("this is the initial progreeLabel 8", progressLabel);
//     const [ocrResult, setOcrResult] = useState('');
//     console.log("this is the initial ocrResult 9", ocrResult);

//     const workerRef = useRef<Tesseract.Worker | null>(null);
//     console.log("this is the initial workerRef 10", workerRef);
//     useEffect(() => {
//         const loadWorker = async () => {
//             console.log("this is the loadWorker 11", loadWorker);
//             const worker = createWorker({
//                 logger: message => {
//                     if ('progress' in message) {
//                         console.log("this is the initial message 12", message);
//                         setProgress(message.progress);
//                         console.log("this is the progreess that was set 13a", progress);
//                         setProgressLabel(message.progress === 1 ? 'Done' : message.status);
//                         console.log("this is the set progressLbael 13b", progressLabel);
//                     }
//                     console.log("this is the created worker 14", worker);

//                 },
//             });
//             workerRef.current = await worker;
//             console.log("this is the current workerRef 15", workerRef);
//         };
//         loadWorker();
//         return () => {
//             workerRef.current?.terminate();
//             workerRef.current = null;
//         }
//     }, []);

//     const handleExtract = async () => {
//         setProgress(0);
//         console.log("this is the progreess that was set 16", progress);
//         setProgressLabel('starting');
//         console.log("this is the set progressLbael 17", progressLabel);

//         const worker = workerRef.current!;
//         await worker.load();
//         await worker.loadLanguage('eng');
//         await worker.initialize('eng');

//         const response = await worker.recognize(imageData!);
//         setOcrResult(response.data.text);
//         console.log("THIS IS THE DATA TEXT", response.data);
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
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed">
//                 <input {...getInputProps()} />
//                 {isDragActive ? (
//                     <p className="text-xl">Drop the image here...</p>
//                 ) : (
//                     <p className="text-xl">Drag  drop an image here, or click to select a file</p>
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
//                 <div className="mt-4">
//                     <p className="text-xl">RESULT</p>
//                     <pre className="bg-black text-white p-4">{ocrResult}</pre>
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
                    <p className="text-xl">Drag 'n' drop an image here, or click to select a file</p>
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
                <div className="mt-4 border-2 border-gray-300 dark:border-gray-700 p-2">
                    <p className="text-xl">RESULT</p>
                    <pre className="bg-black text-white p-4">{ocrResult}</pre>
                </div>
            )}
        </div>
    );
}

export default Home;
