import { useUpdateEffect } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetch } from './useFetch';

export const usePropertyCreate = () => {
    const [body, setBody] = useState(null);
    const [response, fetch] = useFetch('/api/properties');

    useUpdateEffect(() => {
        if (!!body) {
            fetch('post', body);
            setBody(null);
        }
    }, [body]);

    return [response, setBody];
};
