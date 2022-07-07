import nookies from 'nookies';

import { sessionCookieId } from '../../shared/constants';
import { getHttp } from './http';

export async function getSession(context) {
    const cookies = nookies.get(context);
    const sessionId = cookies[sessionCookieId];
    if (!sessionId) return Promise.reject();
    const { data } = await getHttp(context).get(`/auth/session/${sessionId}`);
    return { sessionId, ...data };
}

export async function checkSSRSession(context) {
    try {
        const session = await getSession(context);
        return {
            props: {
                curSession: session,
            },
        };
    } catch {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}
