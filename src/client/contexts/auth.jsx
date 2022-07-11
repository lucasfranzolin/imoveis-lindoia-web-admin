import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import PropTypes from 'prop-types';
import { createContext, useCallback, useState } from 'react';

import { sessionCookieId, tokenCookieId } from '../../shared/constants';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [session, setSession] = useState();
    const [error, setError] = useState();

    const register = async ({ email, name, password }) => {
        try {
            const { data } = await axios.post('/api/auth/register', {
                email,
                name,
                password,
            });
            router.push('/login');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const login = async ({ email, password }) => {
        setError(null);
        try {
            const { data } = await axios.post('/api/auth/login', {
                email,
                password,
            });
            nookies.set(undefined, tokenCookieId, data.token);
            nookies.set(undefined, sessionCookieId, data.sessionId);
            router.push('/');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const logout = async () => {
        setError(null);
        try {
            const sessionId = nookies.get()[sessionCookieId];
            await axios.post('/api/auth/logout', { sessionId });
            nookies.destroy(undefined, tokenCookieId);
            nookies.destroy(undefined, sessionCookieId);
            router.push('/login');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                error,
                login,
                logout,
                register,
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
