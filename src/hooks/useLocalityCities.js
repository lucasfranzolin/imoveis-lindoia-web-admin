import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const useLocalityCities = () => {
    const [id, setId] = useState(null);
    const [cities, setCities] = useState([]);
    const [{ data, ...rest }, fetch] = useFetch(
        `/api/localities/states/${id}/cities`
    );

    useUpdateEffect(() => {
        if (!!id) {
            fetch('get');
            setId(null);
        }
    }, [id]);

    useUpdateEffect(() => {
        if (!!data) setCities(data);
    }, [data]);

    const reset = () => setCities([]);

    return [
        {
            ...rest,
            data: cities,
            reset,
        },
        setId,
    ];
};
