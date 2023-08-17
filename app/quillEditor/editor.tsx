// quillEditor/editor.tsx
"use client";
import { useMutation, useQuery } from '@tanstack/react-query';
import error from 'next/error';
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface MyQuillComponentProps {
    uuid: string;
}
async function getContent(uuid: string) {
    console.log("this is the uuid", uuid);
    try {
        const res = await fetch(`api/getContent?uuid=${uuid}`);
        console.log("this is the res 1", res);

        if (!res.ok) {
            console.log("there was an error");
            // Get the error message from the server's response
            const serverErrorMessage = await res.text();
            throw new Error(serverErrorMessage || "an error occured");
        }
        const content = await res.json();
        console.log("this is the content 2", content);
        return content;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

const MyQuillComponent: React.FC<MyQuillComponentProps> = ({ uuid }) => {
    console.log("this is the uuid 1", uuid);
    const { data } = useQuery({
        queryKey: ["initial data"],
        queryFn: () => getContent(uuid),
        suspense: true,
        staleTime: 5 * 1000,
    });
    console.log("this is the initial data", data.quillData)
    const [value, setValue] = useState<string>(data.quillData || ' ');
    console.log("this is the actual value", value);
    const quillRef = useRef<ReactQuill>(null);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
            ['emoji'],
            ['fullscreen'],
        ],
    };


    const mutation = useMutation((ocrResult: string) =>
        fetch('/api/recieveTextAndAddToDatabase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uuid: uuid, ocrResult }),
        }).then(async (res) => {
            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Something went wrong');
            }
            return res.json();
        })
    );
    const handleSendToDatabase = () => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const delta = quill.getContents();
            const deltaString = JSON.stringify(delta);
            mutation.mutate(deltaString);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg text-gray-900 dark:text-gray-100">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                style={{ height: 'auto', minHeight: '200px' }}
                className="resize-y"
            />
            <button
                onClick={handleSendToDatabase}
                disabled={mutation.isLoading}
                className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded ${mutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {mutation.isLoading ? 'Saving...' : 'Save to Database'}
            </button>
            {mutation.isError && (
                <p className="mt-2 text-red-500">
                    Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
                </p>
            )}
            {mutation.isSuccess && (
                <p className="mt-2 text-green-500">
                    Saved to database
                </p>
            )}
            {mutation.data && (
                <p className="mt-2 text-blue-500">
                    <p>UUID: {mutation.data.uuid}</p>
                    <p>Created At: {new Date(mutation.data.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(mutation.data.updatedAt).toLocaleString()}</p>
                    <p>User ID: {mutation.data.userId}</p>
                </p>

            )}
        </div>
    );

};
export default MyQuillComponent;
