import { configHttp } from '../utils/http';

const http = configHttp();
const host = process.env.CORE_API;

export const authService = {
    register: async ({ email, name, password }) => {
        const path = '/auth/register';
        const url = host + path;
        return await http.post(url, { email, name, password });
    },
};
