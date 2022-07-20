import { configHttp } from '../utils/http';

const http = configHttp();
const host = process.env.IBGE_API;

export const ibgeService = {
    getStates: async () => {
        const path = '/api/v1/localidades/estados?orderBy=nome';
        const url = host + path;
        return await http.get(url);
    },
    getCitiesByState: async (stateId) => {
        const path = `/api/v1/localidades/estados/${stateId}/municipios?orderBy=nome`;
        const url = host + path;
        return await http.get(url);
    },
};
