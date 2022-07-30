import { useCallback } from 'react';

import { useFetch } from './useFetch';

export const useProperties = () => {
    const [{ data, ...rest }, fetch] = useFetch('/api/properties');

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
            ...rest,
        },
        search,
    ];
};
