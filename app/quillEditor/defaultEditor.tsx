
"use client";
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const DefaultEditor: React.FC = () => {
    const [value, setValue] = useState<string>('');

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
        </div>

    );
};

export default DefaultEditor;
