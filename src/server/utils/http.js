import axios from 'axios';
import httpStatus from 'http-status';
import nookies from 'nookies';

import {
    sessionCookieId,
    tokenCookieId,
    tokenCookieMaxAge,
} from '../../shared/constants';

export function getHttp(context) {
    const http = axios.create({
        baseURL: process.env.CORE_API,
    });

    http.interceptors.request.use(
        (config) => {
            if (!config.headers.Authorization) {
                const cookies = nookies.get(context);
                const token = cookies[tokenCookieId];
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
                !err.config.sent
            ) {
                err.config.sent = true;
                const cookies = nookies.get(context);
                const sessionId = cookies[sessionCookieId];
                const url = `${process.env.CORE_API}/auth/refresh-token`;
                const { token } = await axios
                    .post(url, { sessionId })
                    .then((res) => res.data);
                nookies.set(context, tokenCookieId, token, {
                    maxAge: tokenCookieMaxAge,
                });
                nookies.set(context, sessionCookieId, sessionId);
                err.config.headers.Authorization = `Bearer ${token}`;
                return axios.request(err.config); // retry last request once with refreshed token
            }
            return Promise.reject(err);
        }
    );

    return http;
}
