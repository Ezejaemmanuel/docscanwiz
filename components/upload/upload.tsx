"use client ";
import React, { useState, useEffect, useCallback } from 'react';
import { createWorker, ImageLike } from 'tesseract.js';
import { useDropzone } from 'react-dropzone';
import { useAuth } from "@clerk/nextjs";
import SignInComponent from '../YouAreNotSignedIn';
import Image from 'next/image';

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
    }, [isSignedIn, initializeWorker]);

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

    const performOCR = useCallback(async () => {
        let text = '';
        for (const fileURL of filePreviews) {
            const image: ImageLike = { url: fileURL } as unknown as ImageLike;
            const { data } = await worker.recognize(image);
            text += data.text + '\n';
        }
        setOcrText(text);
    }, [filePreviews, worker]);

    if (!isSignedIn) {
        return <SignInComponent />;
    }

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
                                <Image src={fileURL} alt="Preview" width={40} height={40} objectFit="contain" />
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
                    </div>)}
            </form>
        </div>);
};


export default MyDropzone;