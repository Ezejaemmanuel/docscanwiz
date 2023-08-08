import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const size = acceptedFiles.map((files) => {
            if (files.size < 5000) {
                return true;
            } else {
                return false;
            }
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop }, {
        accept: {
            'image/png': ['.png'],
        }
    }, { maxFiles: 1 },)

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}
