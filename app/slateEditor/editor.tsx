"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Descendant, Element as SlateElement, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

// Define CustomElement type for TypeScript
type CustomElement = { type: 'paragraph'; children: Text[] };

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'Enter your text here' }],
    } as CustomElement,
]

const RichTextEditor: React.FC = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState<Descendant[]>(initialValue);

    const handleChange = useCallback((newValue: Descendant[]) => {
        setValue(newValue);
    }, []);

    return (
        <Slate editor={editor} initialValue={value} onChange={handleChange}>
            <Editable />
        </Slate>
    );
};

export default RichTextEditor;
