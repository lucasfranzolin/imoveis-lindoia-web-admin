import axios from 'axios';

import { getParams } from '../utils/pagination';

const host = process.env.CORE_API;

export const customersService = {
    paginate: async (query) => {
        let path = '/customers';
        const params = getParams(query);
        if (params) path += '?' + new URLSearchParams(params);
        const url = host + path;
        return await axios.get(url);
    },
    save: async ({ email, phone, fullName }) => {
        const path = '/customers';
        const url = host + path;
        return await axios.post(
            url,
            {
                email,
                phone,
                fullName,
            },
            {
                headers: {
                    'x-change-agent': 'mock',
                },
            }
        );
    },
    get: async (id) => {
        const path = `/customers/${id}`;
        const url = host + path;
        return await axios.get(url);
    },
    update: async (id, { email, phone, fullName }) => {
        const path = `/customers/${id}`;
        const url = host + path;
        return await axios.put(
            url,
            {
                email,
                phone,
                fullName,
            },
            {
                headers: {
                    'x-change-agent': 'mock',
                },
            }
        );
    },
    _delete: async (id) => {
        const path = `/customers/${id}`;
        const url = host + path;
        return await axios.delete(url, {
            headers: {
                'x-change-agent': 'mock',
            },
        });
    },
};
