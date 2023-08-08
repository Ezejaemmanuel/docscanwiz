"use client";
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone: React.FC = () => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
        maxFiles: 10,
        onDrop: (acceptedFiles: File[]) => {
            // Perform actions with the accepted files
            acceptedFiles.forEach((file) => {
                if (file.size <= 4 * 1024 * 1024) {
                    // Do something with each file, such as uploading or processing
                    console.log('Accepted file:', file);
                } else {
                    console.log('File size exceeds the maximum limit');
                }
            });
        },
    });

    const handleFilePreview = (files: FileList | null) => {
        if (files) {
            const fileURLs = Array.from(files).map((file) => URL.createObjectURL(file));
            setFilePreviews(fileURLs);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div {...getRootProps()} className="p-4 m-4 border-2 border-dashed rounded-lg cursor-pointer">
                <input {...getInputProps({ onChange: (e) => handleFilePreview(e.target.files) })} />
                <p className="text-center">
                    {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
                </p>
                <div className="flex flex-wrap justify-center mt-4">
                    {filePreviews.map((fileURL) => (
                        <img
                            key={fileURL}
                            src={fileURL}
                            alt="Preview"
                            className="w-32 h-32 object-cover m-2 rounded-lg sm:w-48 sm:h-48"
                        />
                    ))}
                </div>
            </div>
            <div className="mt-4">
                {acceptedFiles.map((file) => (
                    <p key={file.name}>{file.name}</p>
                ))}
            </div>
        </div>
    );
};

export default MyDropzone;
