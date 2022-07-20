import { useCallback, useState } from 'react';

import { configHttp } from '../utils/http';
import { useIsMounted } from './useIsMounted';

const http = configHttp('client');

const initialState = {
    data: null,
    error: null,
    loading: false,
    sucess: false,
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
                const res = await http[method](url, data, config);
                if (isMounted()) {
                    newResponse = {
                        ...newResponse,
                        data: res.data,
                        success: true,
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
                    };
                }
                setResponse(newResponse);
            }
        },
        [isMounted, url]
    );

    return [response, _fetch];
};
