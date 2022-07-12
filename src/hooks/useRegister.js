import { useFetch } from './useFetch';

export const useRegister = () => {
    const [{ done, loading, error }, fetch] = useFetch('/api/auth/register');

    const register = (params) => fetch('post', params);

    return [
        {
            loading,
            success: done && !error,
            error,
        },
        register,
    ];
};
