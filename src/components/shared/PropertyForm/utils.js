import * as types from './types';

export const initState = (data) => ({
    [types.ADDRESS]: {
        city: data ? data.address.city : '',
        complement: data ? data.address.complement : '',
        district: data ? data.address.state : '',
        number: data ? data.address.number : '',
        state: data ? data.address.state : '',
        street: data ? data.address.street : '',
        zip: data ? data.address.zip : '',
    },
    [types.ADVERTISE]: {
        rent: {
            isAnnounced: data ? data.rent.isAnnounced : false,
            value: data ? data.rent.value : 0,
        },
        sale: {
            isAnnounced: data ? data.sale.isAnnounced : false,
            value: data ? data.sale.value : 0,
        },
    },
    [types.FEATURES]: {
        purpose: data ? data.purpose : '',
        type: data ? data.type : '',
    },
    [types.OWNER]: {
        ownerId: data ? data.ownerId : '',
    },
    [types.LEGAL]: {
        registry: data ? data.registry : '',
    },
});
