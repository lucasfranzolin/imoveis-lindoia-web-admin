import axios from 'axios';

import { getParams } from '../utils/pagination';

const host = process.env.CORE_API;

export const customersService = {
    paginate: async (query) => {
        let path = '/customers';

        const params = getParams(query);
        if (params) path += '?' + new URLSearchParams(params);

        const url = host + path;
        console.log('url', url);
        return await axios.get(url);
    },
    save: async ({ email, phone, fullName }) => {
        const path = '/customers';
        const url = host + path;
        return await axios.post(url, {
            email,
            phone,
            fullName,
        });
    },
};
