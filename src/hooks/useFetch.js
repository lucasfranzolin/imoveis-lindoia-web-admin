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
            let newResponse = {
                ...initialState,
                loading: true,
            };
            setResponse(newResponse);
            try {
                const res = await axios[method](url, data, config);
                if (isMounted()) {
                    newResponse = {
                        ...newResponse,
                        data: res.data,
                    };
                }
            } catch (err) {
                if (isMounted()) {
                    newResponse = {
                        ...newResponse,
                        error: err.response.data.message,
                    };
                }
            } finally {
                if (isMounted()) {
                    newResponse = {
                        ...newResponse,
                        loading: false,
                        done: true,
                    };
                }
                setResponse(newResponse);
            }
        },
        [isMounted, url]
    );

    return [response, _fetch];
};
