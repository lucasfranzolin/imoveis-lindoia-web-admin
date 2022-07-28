import { v4 as uuid } from 'uuid';

export const withGallery = (item) => {
    if (item.file)
        return {
            ...item,
            url: URL.createObjectURL(item.file),
        };

    const isFile = item instanceof File;
    return {
        // metadata
        description: isFile ? '' : item.description,
        // rest
        prevIndex: isFile ? -1 : item.index,
        file: isFile ? item : null,
        url: isFile ? URL.createObjectURL(item) : item.downloadUrl,
        uuid: isFile ? uuid() : item.fullPath,
    };
};

export const initState = (data) => data.map(withGallery);
