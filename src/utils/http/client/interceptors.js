import axios from 'axios';
import httpStatus from 'http-status';

import { STORAGE_ITEM_ACCESS_TOKEN } from '..';

export function getRequestInterceptor(config) {
    const accessToken = localStorage.getItem(STORAGE_ITEM_ACCESS_TOKEN);
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
}

export async function getResponseErrorInterceptor(err) {
    if (
        err.response.data.code === httpStatus.UNAUTHORIZED &&
        !err.config.sent // Check if it's the first attempt.
    ) {
        // Retry once, next attempt `err.config.sent` will exist with value `true`.
        // So the promise will be rejected with code 401.
        err.config.sent = true;

        const expiredAccessToken = localStorage.getItem(
            STORAGE_ITEM_ACCESS_TOKEN
        );
        const { refreshToken } = await axios
            .get('/auth/refresh-token', {
                headers: {
                    authorization: `Bearer ${expiredAccessToken}`,
                },
            })
            .then((res) => res.data);

        localStorage.setItem(STORAGE_ITEM_ACCESS_TOKEN, refreshToken);
        err.config.headers.authorization = `Bearer ${refreshToken}`;

        return axios.request(err.config);
    }
    return Promise.reject(err);
}
