import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const useCustomerDelete = () => {
    const [id, setId] = useState(null);
    const [{ loading, done, error }, fetch] = useFetch(`/api/customers/${id}`);

    useUpdateEffect(() => {
        if (!!id) {
            fetch('delete');
            setId(null);
        }
    }, [id]);

    return [
        {
            loading,
            success: done && !error,
            error,
        },
        setId,
    ];
};
