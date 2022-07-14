import { useCallback } from 'react';

import { useFetch } from './useFetch';

export const useCustomerCreate = () => {
    const [response, fetch] = useFetch('/api/customers');

    const submit = useCallback(
        (values, actions) => {
            fetch('post', values);
            actions.setSubmitting(false);
        },
        [fetch]
    );

    return [response, submit];
};
