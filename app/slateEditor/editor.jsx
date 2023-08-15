// // "use client";
// // import React, { useState, useMemo, useCallback } from 'react';
// // import { createEditor, Descendant, Element as SlateElement, Text } from 'slate';
// // import { Slate, Editable, withReact } from 'slate-react';

// // // Define CustomElement type for TypeScript
// // type CustomElement = { type: 'paragraph'; children: Text[] };

// // const initialValue: Descendant[] = [
// //     {
// //         type: 'paragraph',
// //         children: [{ text: 'Enter your text here' }],
// //     } as CustomElement,
// // ]

// // const RichTextEditor: React.FC = () => {
// //     const editor = useMemo(() => withReact(createEditor()), []);
// //     const [value, setValue] = useState<Descendant[]>(initialValue);

// //     const handleChange = useCallback((newValue: Descendant[]) => {
// //         setValue(newValue);
// //     }, []);

// //     return (
// //         <Slate editor={editor} initialValue={value} onChange={handleChange}>
// //             <Editable />
// //         </Slate>
// //     );
// // };

// // export default RichTextEditor;


// import React, { useState, useMemo, useCallback, ReactNode, MouseEvent } from 'react';
// import { createEditor, Transforms, Editor, Node } from 'slate';
// import { Slate, Editable, withReact } from 'slate-react';

// interface CustomElement {
//     type: 'paragraph' | 'code';
//     children: CustomText[];
// }

// interface CustomText {
//     text: string;
//     bold?: boolean;
//     code?: boolean;
// }

// // type ElementType = {
// //     element: CustomElement;
// //     attributes: { [key: string]: string };
// //     children: ReactNode;
// // }

// // type LeafType = {
// //     attributes: { [key: string]: string };
// //     children: ReactNode;
// //     leaf: CustomText;
// // }
// type ElementType = {
//     element: CustomElement;
//     attributes: {
//         'data-slate-node': string;
//         'data-slate-inline'?: boolean;
//         'data-slate-void'?: boolean;
//         dir?: string;
//         ref: any;
//         [key: string]: any;
//     };
//     children: ReactNode;
// }

// // type LeafType = {
// //     attributes: {
// //         'data-slate-leaf': boolean;
// //         [key: string]: any;
// //     };
// //     children: ReactNode;
// //     leaf: CustomText;
// // }
// type LeafType = {
//     attributes: {
//         'data-slate-leaf': true;
//         [key: string]: any;
//     };
//     children: ReactNode;
//     element: CustomElement; // Update the type to CustomElement
// }


// declare module 'slate' {
//     interface CustomTypes {
//         Element: CustomElement;
//         Text: CustomText;
//     }
// }

// const initialValue: CustomElement[] = [
//     {
//         type: 'paragraph',
//         children: [{ text: 'Enter your text here' }],
//     },
// ];

// const RichTextEditor = () => {
//     const editor = useMemo(() => withReact(createEditor()), []);
//     const [value, setValue] = useState<CustomElement[]>(initialValue);

//     const renderElement = useCallback((props: ElementType) => {
//         switch (props.element.type) {
//             case 'code':
//                 return <CodeElement {...props} />;
//             default:
//                 return <DefaultElement {...props} />;
//         }
//     }, []);

//     const renderLeaf = useCallback((props: LeafType) => {
//         return <Leaf {...props} />;
//     }, []);

//     return (
//         <Slate editor={editor} initialValue={value} onChange={value => setValue(value)}>
//             <Toolbar>
//                 <button
//                     onMouseDown={(event: MouseEvent) => {
//                         event.preventDefault();
//                         CustomEditor.toggleBoldMark(editor);
//                     }}
//                 >
//                     Bold
//                 </button>
//                 <button
//                     onMouseDown={(event: MouseEvent) => {
//                         event.preventDefault();
//                         CustomEditor.toggleCodeBlock(editor);
//                     }}
//                 >
//                     Code Block
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

//                         default:
//                             break;
//                     }
//                 }}
//             />
//         </Slate>
//     );
// };

// const CustomEditor = {
//     toggleBoldMark(editor: Editor) {
//         const isActive = CustomEditor.isMarkActive(editor, 'bold');
//         Editor.addMark(editor, 'bold', isActive ? null : true);
//     },

//     toggleCodeBlock(editor: Editor) {
//         const isActive = CustomEditor.isBlockActive(editor, 'code');
//         Transforms.setNodes(
//             editor,
//             { type: isActive ? 'paragraph' : 'code' },
//             { match: n => Editor.isBlock(editor, n) }
//         );
//     },

//     isBlockActive(editor: Editor, format: string) {
//         const [match] = Editor.nodes(editor, {
//             match: n => n.type === format,
//         });

//         return !!match;
//     },

//     isMarkActive(editor: Editor, format: string) {
//         const marks = Editor.marks(editor);
//         return marks ? marks[format] === true : false;
//     },
// };

// const CodeElement = (props: ElementType) => {
//     return (
//         <pre {...props.attributes}>
//             <code>{props.children}</code>
//         </pre>
//     );
// };

// const DefaultElement = (props: ElementType) => {
//     return <p {...props.attributes}>{props.children}</p>;
// };

// const Leaf = (props: LeafType) => {
//     let { attributes, children, leaf } = props;

//     if (leaf.bold) {
//         children = <strong>{children}</strong>;
//     }

//     if (leaf.code) {
//         children = <code>{children}</code>;
//     }

//     return <span {...attributes}>{children}</span>;
// };

// const Toolbar = ({ children }: { children: ReactNode }) => {
//     return (
//         <menu>
//             {children}
//         </menu>
//     );
// };

// export default RichTextEditor;
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { createEditor, Transforms, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'Enter your text here' }],
    },
];

const RichTextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(initialValue);

    const renderElement = useCallback((props) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Toolbar>
                <button
                    onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                    }}
                >
                    Bold
                </button>
                <button
                    onMouseDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                    }}
                >
                    Code Block
                </button>
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
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

                        default:
                            break;
                    }
                }}
            />
        </Slate>
    );
};

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
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
    let { attributes, children, leaf } = props;

    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    return <span {...attributes}>{children}</span>;
};

const Toolbar = ({ children }) => {
    return (
        <menu>
            {children}
        </menu>
    );
};

export default RichTextEditor;
