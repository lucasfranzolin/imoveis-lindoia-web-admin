import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import PropTypes from 'prop-types';
import { createContext, useCallback, useState } from 'react';

import {
    sessionCookieId,
    tokenCookieId,
    tokenCookieMaxAge,
} from '../../shared/constants';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [session, setSession] = useState();
    const [error, setError] = useState();

    const login = useCallback(
        async ({ email, password }) => {
            setError(null);
            try {
                const { data } = await axios.post('/api/auth/login', {
                    email,
                    password,
                });
                nookies.set(undefined, tokenCookieId, data.token, {
                    maxAge: tokenCookieMaxAge,
                });
                nookies.set(undefined, sessionCookieId, data.sessionId);
                router.push('/');
            } catch (err) {
                setError(err.data.message);
            }
        },
        [router]
    );

    const logout = useCallback(async () => {
        setError(null);
        try {
            await axios.post('/api/auth/logout', {
                sessionId: session.uuid,
            });
            nookies.destroy(undefined, tokenCookieId);
            nookies.destroy(undefined, sessionCookieId);
            router.push('/login');
        } catch (err) {
            setError(err.data.message);
        }
    }, [router, session]);

    return (
        <AuthContext.Provider
            value={{
                error,
                login,
                logout,
                session,
                setSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthProvider };
