import axios from 'axios';
import { useCallback, useState } from 'react';

import { useIsMounted } from './useIsMounted';

const initialState = {
    done: false,
    error: null,
    loading: false,
    data: null,
};

export const useFetch = (url) => {
    const isMounted = useIsMounted();
    const [response, setResponse] = useState({ ...initialState });

    const _fetch = useCallback(
        async (method, data, config) => {
            setResponse({
                ...initialState,
                loading: true,
            });
            try {
                const res = await axios[method](url, data, config);
                if (isMounted())
                    setResponse((prevState) => ({
                        ...prevState,
                        data: res.data,
                    }));
            } catch (err) {
                if (isMounted())
                    setResponse((prevState) => ({
                        ...prevState,
                        error: err.response.data.message,
                    }));
            } finally {
                if (isMounted())
                    setResponse((prevState) => ({
                        ...prevState,
                        loading: false,
                        done: true,
                    }));
            }
        },
        [isMounted, url]
    );

    return [response, _fetch];
};
