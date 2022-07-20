import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const useLocalityStates = () => {
    const [states, setStates] = useState([]);
    const [{ data, ...rest }, fetch] = useFetch('/api/localities/states');

    useUpdateEffect(() => {
        if (!!data) setStates(data);
    }, [data]);

    const get = () => fetch('get');

    const reset = () => setStates([]);

    return [
        {
            ...rest,
            data: states,
            reset,
        },
        get,
    ];
};
