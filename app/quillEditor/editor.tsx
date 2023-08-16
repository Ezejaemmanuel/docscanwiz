
// "use client";
// import { useMutation } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// interface MyQuillComponentProps {
//     uuid: string;
// }

// const MyQuillComponent: React.FC<MyQuillComponentProps> = ({ uuid }) => {
//     const [value, setValue] = useState<string>('');

//     const modules = {
//         toolbar: [
//             ['bold', 'italic', 'underline', 'strike'],
//             ['blockquote', 'code-block'],
//             [{ header: 1 }, { header: 2 }],
//             [{ list: 'ordered' }, { list: 'bullet' }],
//             [{ script: 'sub' }, { script: 'super' }],
//             [{ indent: '-1' }, { indent: '+1' }],
//             [{ direction: 'rtl' }],
//             [{ size: ['small', false, 'large', 'huge'] }],
//             [{ header: [1, 2, 3, 4, 5, 6, false] }],
//             [{ color: [] }, { background: [] }],
//             [{ font: [] }],
//             [{ align: [] }],
//             ['clean'],
//             ['link', 'image', 'video'],
//             ['emoji'],
//             ['fullscreen'],
//         ],
//     };

//     const mutation = useMutation((ocrResult: string) =>
//         fetch('/api/recieveTextAndAddToDatabase', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: uuid, ocrResult }),
//         }).then(async (res) => {
//             if (!res.ok) {
//                 const json = await res.json();
//                 throw new Error(json.error || 'Something went wrong');
//             }
//             return res.json();
//         })
//     );

//     const handleSendToDatabase = () => {
//         mutation.mutate(value);
//     };

//     return (
//         <div className="bg-gray-200 p-4 rounded-md shadow-lg">
//             <ReactQuill
//                 theme="snow"
//                 value={value}
//                 onChange={setValue}
//                 modules={modules}
//                 style={{ height: 'auto', minHeight: '200px' }}
//                 className="resize-y"
//             />
//             <button
//                 onClick={handleSendToDatabase}
//                 disabled={mutation.isLoading}
//                 className={`bg-blue-500 text-white px-4 py-2 rounded ${mutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                     }`}
//             >
//                 {mutation.isLoading ? 'Saving...' : 'Save to Database'}
//             </button>
//             {mutation.isError && (
//                 <p className="text-red-500 mt-2">
//                     Error: {mutation.isError && <div>An error occurred: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}</div>}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default MyQuillComponent;
"use client";
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface MyQuillComponentProps {
    uuid: string;
}

const MyQuillComponent: React.FC<MyQuillComponentProps> = ({ uuid }) => {
    const [value, setValue] = useState<any>([]);

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
            body: JSON.stringify({ id: uuid, ocrResult }),
        }).then(async (res) => {
            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Something went wrong');
            }
            return res.json();
        })
    );

    const handleSendToDatabase = () => {
        const deltaString = JSON.stringify(value);
        mutation.mutate(deltaString);
    };

    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-lg">
            <ReactQuill
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
                className={`bg-blue-500 text-white px-4 py-2 rounded ${mutation.isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {mutation.isLoading ? 'Saving...' : 'Save to Database'}
            </button>
            {mutation.isError && (
                <p className="text-red-500 mt-2">
                    Error: {mutation.isError && <div>An error occurred: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}</div>}
                </p>)} </div>);
};
export default MyQuillComponent;