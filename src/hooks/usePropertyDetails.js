import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const usePropertyDetails = () => {
    const [id, setId] = useState(null);
    const [response, fetch] = useFetch(`/api/properties/${id}`);

    useUpdateEffect(() => {
        if (!!id) {
            fetch('get');
            setId(null);
        }
    }, [id]);

    return [response, setId];
};
