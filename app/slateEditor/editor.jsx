
// "use client";
// import React, { useState, useMemo, useCallback } from 'react';
// import { createEditor, Transforms, Editor, Element as SlateElement } from 'slate';
// import { Slate, Editable, withReact } from 'slate-react';

// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [{ text: 'Enter your text here' }],
//     },
// ];

// const RichTextEditor = () => {
//     const editor = useMemo(() => withReact(createEditor()), []);
//     const [value, setValue] = useState(initialValue);

//     const renderElement = useCallback((props) => {
//         switch (props.element.type) {
//             case 'code':
//                 return <CodeElement {...props} />;
//             case 'link':
//                 return <LinkElement {...props} />;
//             case 'quote':
//                 return <QuoteElement {...props} />;
//             case 'bulleted-list':
//                 return <ul {...props.attributes}>{props.children}</ul>;
//             case 'numbered-list':
//                 return <ol {...props.attributes}>{props.children}</ol>;
//             case 'list-item':
//                 return <li {...props.attributes}>{props.children}</li>;
//             default:
//                 return <DefaultElement {...props} />;
//         }
//     }, []);

//     const renderLeaf = useCallback((props) => {
//         return <Leaf {...props} />;
//     }, []);

//     return (
//         <Slate editor={editor} initialValue={value} onChange={value => setValue(value)}>
//             <Toolbar>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleBoldMark(editor);
//                     }}
//                 >
//                     Bold
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleCodeBlock(editor);
//                     }}
//                 >
//                     Code Block
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleUnderlineMark(editor);
//                     }}
//                 >
//                     Underline
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleStrikethroughMark(editor);
//                     }}
//                 >
//                     Strikethrough
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleBlockquote(editor);
//                     }}
//                 >
//                     Blockquote
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleBulletList(editor);
//                     }}
//                 >
//                     Bullet List
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         CustomEditor.toggleNumberList(editor);
//                     }}
//                 >
//                     Number List
//                 </button>
//                 <button
//                     onMouseDown={(event) => {
//                         event.preventDefault();
//                         const url = window.prompt('Enter the URL of the link:');
//                         if (!url) return;
//                         CustomEditor.insertLink(editor, url);
//                     }}
//                 >
//                     Insert Link
//                 </button>
//             </Toolbar>
//             <Editable
//                 renderElement={renderElement}
//                 renderLeaf={renderLeaf}
//                 onKeyDown={event => {
//                     if (!event.ctrlKey) return;

//                     switch (event.key) {
//                         case '`': {
//                             event.preventDefault();
//                             CustomEditor.toggleCodeBlock(editor);
//                             break;
//                         }

//                         case 'b': {
//                             event.preventDefault();
//                             CustomEditor.toggleBoldMark(editor);
//                             break;
//                         }

//                         case 'u': {
//                             event.preventDefault();
//                             CustomEditor.toggleUnderlineMark(editor);
//                             break;
//                         }

//                         case 's': {
//                             event.preventDefault();
//                             CustomEditor.toggleStrikethroughMark(editor);
//                             break;
//                         }

//                         default:
//                             break;
//                     }
//                 }}
//             />
//         </Slate>
//     );
// };

// const CustomEditor = {
//     toggleBoldMark(editor) {
//         const isActive = CustomEditor.isMarkActive(editor, 'bold');
//         Editor.addMark(editor, 'bold', isActive ? null : true);
//     },

//     toggleCodeBlock(editor) {
//         const isActive = CustomEditor.isBlockActive(editor, 'code');
//         Transforms.setNodes(
//             editor,
//             { type: isActive ? 'paragraph' : 'code' },
//             { match: n => Editor.isBlock(editor, n) }
//         );
//     },

//     toggleUnderlineMark(editor) {
//         // Continue from toggleUnderlineMark
//         const isActive = CustomEditor.isMarkActive(editor, 'underline');
//         Editor.addMark(editor, 'underline', isActive ? null : true);
//     },

//     toggleStrikethroughMark(editor) {
//         const isActive = CustomEditor.isMarkActive(editor, 'strikethrough');
//         Editor.addMark(editor, 'strikethrough', isActive ? null : true);
//     },

//     toggleBlockquote(editor) {
//         const isActive = CustomEditor.isBlockActive(editor, 'quote');
//         Transforms.setNodes(
//             editor,
//             { type: isActive ? 'paragraph' : 'quote' },
//             { match: n => Editor.isBlock(editor, n) }
//         );
//     },

//     toggleBulletList(editor) {
//         const isActive = CustomEditor.isBlockActive(editor, 'bulleted-list');
//         Transforms.setNodes(
//             editor,
//             { type: isActive ? 'paragraph' : 'bulleted-list' },
//             { match: n => Editor.isBlock(editor, n) }
//         );
//     },

//     toggleNumberList(editor) {
//         const isActive = CustomEditor.isBlockActive(editor, 'numbered-list');
//         Transforms.setNodes(
//             editor,
//             { type: isActive ? 'paragraph' : 'numbered-list' },
//             { match: n => Editor.isBlock(editor, n) }
//         );
//     },

//     insertLink(editor, url) {
//         if (editor.selection) {
//             Editor.insertText(editor, url);
//             Editor.addMark(editor, 'link', true);
//         }
//     },

//     isBlockActive(editor, format) {
//         const [match] = Editor.nodes(editor, {
//             match: n => n.type === format,
//         });

//         return !!match;
//     },

//     isMarkActive(editor, format) {
//         const marks = Editor.marks(editor);
//         return marks ? marks[format] === true : false;
//     },
// };

// const CodeElement = (props) => {
//     return (
//         <pre {...props.attributes}>
//             <code>{props.children}</code>
//         </pre>
//     );
// };

// const DefaultElement = (props) => {
//     return <p {...props.attributes}>{props.children}</p>;
// };

// const LinkElement = ({ attributes, children, element }) => {
//     return (
//         <a {...attributes} href={element.url}>
//             {children}
//         </a>
//     );
// };

// const QuoteElement = (props) => {
//     return (
//         <blockquote {...props.attributes}>
//             {props.children}
//         </blockquote>
//     );
// };

// const Leaf = (props) => {
//     let { attributes, children, leaf } = props;

//     if (leaf.bold) {
//         children = <strong>{children}</strong>;
//     }

//     if (leaf.code) {
//         children = <code>{children}</code>;
//     }

//     if (leaf.underline) {
//         children = <u>{children}</u>;
//     }

//     if (leaf.strikethrough) {
//         children = <del>{children}</del>;
//     }

//     if (leaf.link) {
//         children = <a href={children}>{children}</a>;
//     }

//     return <span {...attributes}>{children}</span>;
// };

// const Toolbar = ({ children }) => {
//     return (
//         <menu>
//             {children}
//         </menu>
//     );
// };

// export default RichTextEditor;

"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Transforms, Editor, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';



const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'Enter your text here' }],
    },
];

const CustomEditor = {
    toggleBoldMark(editor) {
        const isActive = CustomEditor.isMarkActive(editor, 'bold');
        Editor.addMark(editor, 'bold', isActive ? null : true);
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isBlockActive(editor, 'code');
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'code' },
            { match: n => Editor.isBlock(editor, n) }
        );
    },

    toggleUnderlineMark(editor) {
        const isActive = CustomEditor.isMarkActive(editor, 'underline');
        Editor.addMark(editor, 'underline', isActive ? null : true);
    },

    toggleStrikethroughMark(editor) {
        const isActive = CustomEditor.isMarkActive(editor, 'strikethrough');
        Editor.addMark(editor, 'strikethrough', isActive ? null : true);
    },

    toggleBlockquote(editor) {
        const isActive = CustomEditor.isBlockActive(editor, 'quote');
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'quote' },
            { match: n => Editor.isBlock(editor, n) }
        );
    },

    toggleBulletList(editor) {
        const isActive = CustomEditor.isBlockActive(editor, 'bulleted-list');
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'bulleted-list' },
            { match: n => Editor.isBlock(editor, n) }
        );
    },

    toggleNumberList(editor) {
        const isActive = CustomEditor.isBlockActive(editor, 'numbered-list');
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'numbered-list' },
            { match: n => Editor.isBlock(editor, n) }
        );
    },

    insertLink(editor, url) {
        if (editor.selection) {
            Editor.insertText(editor, url);
            Editor.addMark(editor, 'link', true);
        }
    },

    isBlockActive(editor, format) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === format,
        });

        return !!match;
    },

    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },
};

const CodeElement = (props) => {
    return (
        <pre {...props.attributes} className="bg-gray-200 rounded p-1">
            <code>{props.children}</code>
        </pre>
    );
};

const DefaultElement = (props) => {
    return <p {...props.attributes} className="paragraph">{props.children}</p>;
};

const Leaf = (props) => {
    return (
        <span
            {...props.attributes}
            className={`leaf ${props.leaf.bold ? 'bold' : ''} ${props.leaf.underline ? 'underline' : ''
                } ${props.leaf.strikethrough ? 'line-through' : ''}`}
        >
            {props.children}
        </span>
    );
};

const Toolbar = (props) => {
    return <div className="toolbar">{props.children}</div>;
};

const RichTextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(initialValue);

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            case 'link':
                return <LinkElement {...props} />;
            case 'quote':
                return <QuoteElement {...props} />;
            case 'bulleted-list':
                return <ul {...props.attributes}>{props.children}</ul>;
            case 'numbered-list':
                return <ol {...props.attributes}>{props.children}</ol>;
            case 'list-item':
                return <li {...props.attributes}>{props.children}</li>;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (<Slate editor={editor} initialValue={value} onChange={(value) => setValue(value)}>
        <Toolbar className="dark:bg-gray-800 py-4 flex justify-center space-x-4 bg-gray-200 rounded-lg shadow-md">
            <button className="dark:bg-blue-500 dark:text-white bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
            }}>
                Bold
            </button>
            <button className="dark:bg-purple-500 dark:text-white bg-purple-400 text-white px-4 py-2 rounded-md hover:bg-purple-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
            }}>
                Code Block
            </button>
            <button className="dark:bg-green-500 dark:text-white bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
            }}>
                Underline
            </button>
            <button className="dark:bg-red-500 dark:text-white bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleStrikethroughMark(editor);
            }}>
                Strikethrough
            </button>
            <button className="dark:bg-yellow-500 dark:text-white bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleBlockquote(editor);
            }}>
                Blockquote
            </button>
            <button className="dark:bg-indigo-500 dark:text-white bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleBulletList(editor);
            }}>
                Bullet List
            </button>
            <button className="dark:bg-green-500 dark:text-white bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500" onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleNumberList(editor);
            }}>
                Number List
            </button>
            <button className="dark:bg-red-500 dark:text-white bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500" onMouseDown={(event) => {
                event.preventDefault();
                const url = window.prompt('Enter the URL of the link:');
                if (!url) return; CustomEditor.insertLink(editor, url);
            }}> Insert Link </button>
        </Toolbar>


        <Editable
            className='w-full min-h-[64px]'
            editor={editor}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
                if (!event.ctrlKey) return;
                switch (event.key) {
                    case '`': {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                        break;
                    }
                    case 'b': {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                        break;
                    }
                    case 'u': {
                        event.preventDefault();
                        CustomEditor.toggleUnderlineMark(editor);
                        break;
                    }
                    case 's': {
                        event.preventDefault();
                        CustomEditor.toggleStrikethroughMark(editor);
                        break;
                    }
                }
            }}
        />
    </Slate>
    )
};
export default RichTextEditor;