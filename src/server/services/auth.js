import { getHttp } from '../utils/http';

export const authService = (context) => {
    const http = getHttp(context);
    return {
        login: ({ email, password }) => {
            return http.post('/auth/login', { email, password });
        },
        refreshToken: ({ sessionId }) => {
            return http.post('/auth/refresh-token', { sessionId });
        },
        logout: ({ sessionId }) => {
            return http.post('/auth/logout', { sessionId });
        },
    };
};
