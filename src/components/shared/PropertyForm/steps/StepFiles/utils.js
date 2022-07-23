import { v4 as uuid } from 'uuid';

export const withGallery = (item) =>
    Object.assign(item, {
        url: item instanceof File ? URL.createObjectURL(item) : item.url,
        id: uuid(),
    });

export const initState = (data) => data.map(withGallery);
