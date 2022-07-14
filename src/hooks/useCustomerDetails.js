import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const useCustomerDetails = () => {
    const [id, setId] = useState(null);
    const [response, fetch] = useFetch(`/api/customers/${id}`);

    useUpdateEffect(() => {
        if (!!id) {
            fetch('get');
            setId(null);
        }
    }, [id]);

    return [response, setId];
};
