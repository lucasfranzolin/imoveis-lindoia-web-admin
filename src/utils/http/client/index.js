import axios from 'axios';

import {
    getRequestInterceptor,
    getResponseErrorInterceptor,
} from './interceptors';

export function getClientInstance() {
    const instance = axios.create({});

    instance.interceptors.request.use(getRequestInterceptor);

    instance.interceptors.response.use(
        (response) => response,
        getResponseErrorInterceptor
    );

    return instance;
}
