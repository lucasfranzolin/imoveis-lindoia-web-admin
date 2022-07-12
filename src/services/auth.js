import axios from 'axios';

const host = process.env.CORE_API;

export const authService = {
    register: async ({ email, name, password }) => {
        const path = '/auth/register';
        const url = host + path;
        return await axios.post(url, { email, name, password });
    },
};
