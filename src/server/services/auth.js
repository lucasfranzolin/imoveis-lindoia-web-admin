import nookies from 'nookies';

import { sessionCookieId, tokenCookieId } from '../../shared/constants';
import { getHttp } from '../utils/http';

export const authService = (context) => {
    const http = getHttp(context);
    return {
        login: ({ email, password }) => {
            return http.post('/auth/login', {
                data: {
                    email,
                    password,
                },
            });
        },
        logout: ({ sessionId }) => {
            return http.post('/auth/logout', {
                data: {
                    sessionId,
                },
            });
        },
        verify: async () => {
            const sessionId = nookies.get(context)[sessionCookieId];
            if (!sessionId) {
                nookies.destroy(context, sessionCookieId);
                nookies.destroy(context, tokenCookieId);
                return Promise.reject();
            }
            return await http.post('/auth/verify', {
                data: {
                    sessionId,
                },
            });
        },
    };
};
