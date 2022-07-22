import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const useImgDropzone = (initialFiles, cb) => {
    const [files, setFiles] = useState(initialFiles);

    const dropzone = useDropzone({
        noClick: true,
        noKeyboard: true,
        maxFiles: 10,
        accept: ['image/*'],
        onDropAccepted: (droppedFiles) => {
            setFiles(droppedFiles);
            cb(droppedFiles);
        },
    });

    const onClear = () => {
        setFiles([]);
        cb([]);
    };

    return { ...dropzone, files, onClear };
};
