import { configHttp } from '../utils/http';

const http = configHttp();
const host = process.env.CORE_API;

export const propertiesService = {
    getPurposes: async () => {
        const path = '/properties/purposes';
        const url = host + path;
        return await http.get(url);
    },
    getTypesByPurpose: async (purpose) => {
        const path = `/properties/purposes/${purpose}/types`;
        const url = host + path;
        return await http.get(url);
    },
    save: async (body) => {
        const path = '/properties';
        const url = host + path;
        return await http.post(url, body, {
            headers: {
                'x-change-agent': 'mock',
            },
        });
    },
    upload: async ({ id, formData }) => {
        const path = `/properties/${id}/media`;
        const url = host + path;
        const headers = {
            ...formData.getHeaders(),
            'x-change-agent': 'mock',
        };
        return await http.post(url, formData, { headers });
    },
};
