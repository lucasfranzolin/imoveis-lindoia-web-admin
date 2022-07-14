import { useCallback } from 'react';

import { useFetch } from './useFetch';

export const useCustomers = () => {
    const [{ loading, error, data }, fetch] = useFetch('/api/customers');

    const search = useCallback(
        (params) => {
            fetch('get', { params });
        },
        [fetch]
    );

    return [
        {
            data: {
                rows: data?.rows || [],
                totalItems: data?.totalItems || 0,
                totalPages: data?.totalPages || 1,
            },
            error,
            loading,
        },
        search,
    ];
};
