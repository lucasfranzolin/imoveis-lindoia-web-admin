import axios from 'axios';
import httpStatus from 'http-status';
import nookies from 'nookies';

import { sessionCookieId, tokenCookieId } from '../../shared/constants';

export function getHttp(context) {
    const baseURL = process.env.CORE_API;

    const http = axios.create({
        baseURL,
    });

    http.interceptors.request.use(
        (config) => {
            if (!config.headers.Authorization) {
                const token = nookies.get(context)[tokenCookieId];
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    http.interceptors.response.use(
        (response) => response,
        async (err) => {
            if (
                err.response.data.code === httpStatus.UNAUTHORIZED &&
                !err.config.sent // Check if it's the first attempt.
            ) {
                // Retry once, next attempt `err.config.sent` will exist with value `true`.
                // So the promise will be rejected with code 401.
                err.config.sent = true;

                const sessionId = nookies.get(context)[sessionCookieId];
                const url = `${baseURL}/auth/refresh-token`;
                const { token } = await axios
                    .post(url, { sessionId })
                    .then((res) => res.data);
                nookies.set(context, tokenCookieId, token);
                nookies.set(context, sessionCookieId, sessionId);
                err.config.headers.Authorization = `Bearer ${token}`;
                return axios.request(err.config);
            }
            return Promise.reject(err);
        }
    );

    return http;
}
