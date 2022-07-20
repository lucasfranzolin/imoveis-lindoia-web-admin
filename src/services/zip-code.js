import { configHttp } from '../utils/http';

const http = configHttp();
const host = process.env.ZIP_CODE_API;

export const zipCodeService = {
    find: async (cep) => {
        const path = `/ws/${cep}/json/`;
        const url = host + path;
        return await http.get(url);
    },
};
