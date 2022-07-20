import { configHttp } from '../utils/http';
import { getParams } from '../utils/pagination';

const http = configHttp();
const host = process.env.CORE_API;

export const customersService = {
    paginate: async (query) => {
        let path = '/customers';
        const params = getParams(query);
        if (params) path += '?' + new URLSearchParams(params);
        const url = host + path;
        return await http.get(url);
    },
    save: async (body) => {
        const path = '/customers';
        const url = host + path;
        return await http.post(url, body, {
            headers: {
                'x-change-agent': 'mock',
            },
        });
    },
    get: async (id) => {
        const path = `/customers/${id}`;
        const url = host + path;
        return await http.get(url);
    },
    update: async (id, body) => {
        const path = `/customers/${id}`;
        const url = host + path;
        return await http.put(url, body, {
            headers: {
                'x-change-agent': 'mock',
            },
        });
    },
    _delete: async (id) => {
        const path = `/customers/${id}`;
        const url = host + path;
        return await http.delete(url, {
            headers: {
                'x-change-agent': 'mock',
            },
        });
    },
};
