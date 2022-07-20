import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const useCustomerUpdate = () => {
    const [id, setId] = useState(null);
    const [body, setBody] = useState(null);
    const [response, fetch] = useFetch(`/api/customers/${id}`);

    useUpdateEffect(() => {
        if (!!id && !!body) {
            fetch('put', body);
            setId(null);
            setBody(null);
        }
    }, [id, body]);

    const update = (_id, _body) => {
        setId(_id);
        setBody(_body);
    };

    return [response, update];
};
