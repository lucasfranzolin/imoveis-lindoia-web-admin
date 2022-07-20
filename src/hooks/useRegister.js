import { useFetch } from './useFetch';

export const useRegister = () => {
    const [response, fetch] = useFetch('/api/auth/register');

    const register = (params) => fetch('post', params);

    return [response, register];
};
