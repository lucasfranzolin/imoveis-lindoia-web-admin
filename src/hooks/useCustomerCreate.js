import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const useCustomerCreate = () => {
    const [body, setBody] = useState(null);
    const [response, fetch] = useFetch('/api/customers');

    useUpdateEffect(() => {
        if (!!body) {
            fetch('post', body);
            setBody(null);
        }
    }, [body]);

    return [response, setBody];
};
