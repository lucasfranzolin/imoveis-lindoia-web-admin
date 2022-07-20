import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const usePropertyTypes = () => {
    const [purpose, setPurpose] = useState(null);
    const [types, setTypes] = useState([]);
    const [{ data, ...rest }, fetch] = useFetch(
        `/api/properties/purposes/${purpose}/types`
    );

    useUpdateEffect(() => {
        if (!!purpose) {
            fetch('get');
            setPurpose(null);
        }
    }, [purpose]);

    useUpdateEffect(() => {
        if (!!data) setTypes(data);
    }, [data]);

    const reset = () => setTypes([]);

    return [
        {
            ...rest,
            data: types,
            reset,
        },
        setPurpose,
    ];
};
