import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const usePropertyPurposes = () => {
    const [purposes, setPurposes] = useState([]);
    const [{ data, ...rest }, fetch] = useFetch('/api/properties/purposes');

    useUpdateEffect(() => {
        if (!!data) setPurposes(data);
    }, [data]);

    const get = () => fetch('get');

    const reset = () => setPurposes([]);

    return [
        {
            ...rest,
            data: purposes,
            reset,
        },
        get,
    ];
};
