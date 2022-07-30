import { v4 as uuid } from 'uuid';

import * as types from './types';

export const initState = (data) => ({
    [types.ADDRESS]: {
        city: data ? data.props.address.city : '',
        complement: data ? data.props.address.complement : '',
        district: data ? data.props.address.district : '',
        number: data ? data.props.address.number : '',
        state: data ? data.props.address.state : '',
        street: data ? data.props.address.street : '',
        zip: data ? data.props.address.zip : '',
    },
    [types.ADVERTISE]: {
        rent: {
            isAnnounced: data ? data.props.rent.isAnnounced : false,
            value: data ? data.props.rent.value : 0,
        },
        sale: {
            isAnnounced: data ? data.props.sale.isAnnounced : false,
            value: data ? data.props.sale.value : 0,
        },
    },
    [types.FEATURES]: {
        purpose: data ? data.props.purpose : '',
        type: data ? data.props.type : '',
    },
    [types.OWNER]: {
        ownerId: data ? data.props.ownerId : '',
    },
    [types.FILES]: data ? data.urls.map(withGallery) : [],
    [types.LEGAL]: {
        registry: data ? data.props.registry : '',
    },
});

export const withGallery = (item) => {
    if (item.file)
        return {
            ...item,
            url: URL.createObjectURL(item.file),
        };

    const isFile = item instanceof File;
    return {
        file: isFile ? item : null,
        url: isFile ? URL.createObjectURL(item) : item,
        uuid: uuid(),
    };
};
